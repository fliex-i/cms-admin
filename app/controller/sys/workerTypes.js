'use strict';
const Controller = require('../../core/base_controller');
/**
* @controller 工种类型管理
*/
class WorkerTypesController extends Controller {
  /**
   * @summary 获取工种类型列表
   * @router get /admin/sys/worker_types/index
   */
  async list() {
    const { ctx } = this;
    const { page = 1, perPage = 10, ...where } = ctx.query;
    const limit = Number(perPage || 10);

    delete where.page;
    delete where.pageSize;
    delete where.perPage;
    delete where.orderBy;
    delete where.orderDir;

    const result = await ctx.model.SysWorkerTypes.findAndCountAll({
      where,
      offset: (page - 1) * limit,
      limit,
      // order: [ 'id', 'ASC' ],
    });
    this.success({ ...result });
  }
  /**
   * @summary 新增工种类型
   * @router post /admin/sys/worker_types/create
   */
  async create() {
    const { ctx } = this;
    const data = await ctx.model.SysWorkerTypes.create(ctx.request.body);
    this.success(data);
  }
  /**
   * @summary 更新工种类型
   * @router post /admin/sys/worker_types/update
   */
  async update() {
    const { ctx } = this;
    const { id, ...data } = ctx.request.body;
    await ctx.model.SysWorkerTypes.update(data, { where: { id } });
    this.success();
  }
  /**
   * @summary 删除工种类型
   * @router post /admin/sys/worker_types/destroy
   */
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    await ctx.model.SysWorkerTypes.destroy({ where: { id } });
    this.success();
  }
  /**
   * @summary 批量删除工种类型
   * @router post /admin/sys/worker_types/bulkDel
   */
  async bulkDel() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    await ctx.model.SysWorkerTypes.destroy({ where: { id: ids } });
    this.success();
  }
  /**
   * @summary 保存工种类型排序
   * @router post /admin/sys/worker_types/saveOrder
   */
  async saveOrder() {
    const { ctx } = this;
    const list = ctx.request.body.list;
    if (!Array.isArray(list) || list.length === 0) {
      return this.fail('参数错误');
    }
    const promises = list.map(item => {
      return ctx.model.SysWorkerTypes.update({ order: item.order }, { where: { id: item.id } });
    });
    await Promise.all(promises);
    this.success('排序已保存');
  }
}
module.exports = WorkerTypesController;
