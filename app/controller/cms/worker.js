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
    const map = { where: {}, offset: (Number(page) - 1) * limit, limit: Number(limit) };
    const list = await ctx.model.CmsWorker.findAndCountAll(map);
    this.success(list);
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
}
module.exports = WorkerController;
