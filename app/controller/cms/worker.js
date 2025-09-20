'use strict';
const Controller = require('../../core/base_controller');
/**
* @controller 工人管理
*/
class WorkerController extends Controller {
  /**
   * @summary 获取工人列表
   * @description 获取所有工人
   * @router get /api/cms/worker
   * @response 200 baseRes 成功
   */
  async list() {
    const { ctx } = this;
    const data = ctx.query;
    const page = data.page || 1;
    const limit = data.perPage || 15;
    const workType = data.workType && data.workType !== 'all' ? data.workType : '';
    const region = data.region;
    const where = {};
    if (data.name) where.name = { [ctx.app.Sequelize.Op.like]: `%${data.name}%` };
    if (workType) where.workType = workType;
    if (region) where.region = region;
    const list = await ctx.model.CmsWorker.findAndCountAll({
      where,
      offset: (Number(page) - 1) * limit,
      limit: Number(limit),
      order: [[ 'id', 'ASC' ]],
    });
    // 批量处理 case 字段为数组，兼容字符串/JSON
    if (Array.isArray(list.rows)) {
      list.rows.forEach(item => {
        if (item.case && typeof item.case === 'string') {
          try {
            item.case = JSON.parse(item.case);
          } catch (e) {
            item.case = item.case.split(',').map(i => i.trim().replace(/\"|"$/g, ''));
          }
        }
      });
    }
    const typeMap = { where: workType ? { id: Number(workType) } : {} };
    const types = await ctx.model.SysWorkerTypes.findAll(typeMap);
    this.success({ ...list, types });
  }
  /**
   * @summary 新建工人
   * @description 新建工人
   * @router post /api/cms/worker
   * @request body cms_worker_add body 新建工人
   * @response 200 baseRes 成功
   */
  async create() {
    const { ctx } = this;
    const data = await ctx.model.CmsWorker.create(ctx.request.body);
    this.success(data);
  }
  /**
   * @summary 更新工人
   * @description 更新指定ID的工人
   * @router post /api/cms/worker/{id}
   * @request body cms_worker_edit body 更新工人
   * @response 200 baseRes 成功
   */
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const update = await ctx.model.CmsWorker.update(data, { where: { id: data.id } });
    this.success(update);
  }
  /**
   * @summary 删除工人
   * @description 删除指定ID的工人
   * @router get /api/cms/worker/{id}
   * @request query integer id ID
   * @response 200 baseRes 成功
   */
  async destroy() {
    const { ctx } = this;
    const result = await ctx.model.CmsWorker.destroy({ where: { id: ctx.query.id } });
    this.success(result);
  }
  /**
   * @summary 批量删除工人
   * @description 批量删除工人
   * @router post /api/cms/worker/bulkDel
   * @request body array ids 工人ID数组
   * @response 200 baseRes 成功
   */
  async bulkDel() {
    const { ctx } = this;
    const ids = ctx.request.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
      return this.fail('参数错误');
    }
    const result = await ctx.model.CmsWorker.destroy({ where: { id: ids } });
    this.success(result);
  }
  /**
   * @summary 获取工种类型列表
   * @description 查询所有工种信息
   * @router get /api/cms/worker/types
   * @response 200 baseRes 成功
   */
  async types() {
    const { ctx } = this;
    const map = {};
    // map.order = [[ 'id', 'ASC' ]];
    map.where = {};
    map.attributes = [[ 'name', 'label' ], [ 'id', 'value' ]];
    const list = await ctx.model.SysWorkerTypes.findAll(map);
    // const tree = ctx.helper.arr_to_tree(list, 0);
    this.success({ options: list });

  }
  /**
   * @summary 保存工人排序
   * @description 批量保存工人排序
   * @router post /api/cms/worker/saveOrder
   * @request body array list 工人排序数组 [{id, order}]
   * @response 200 baseRes 成功
   */
  async saveOrder() {
    const { ctx } = this;
    const list = ctx.request.body.list;
    if (!Array.isArray(list) || list.length === 0) {
      return this.fail('参数错误');
    }
    // 批量更新排序字段（假设字段为 order）
    const promises = list.map(item => {
      return ctx.model.CmsWorker.update({ order: item.order }, { where: { id: item.id } });
    });
    await Promise.all(promises);
    this.success('排序已保存');
  }
}
module.exports = WorkerController;
