'use strict';
const Controller = require('../../core/base_controller');
/**
* @controller 工程管理
*/
class ConstructionController extends Controller {
  /**
   * @summary 获取工程列表
   * @description 获取所有工程
   * @router get /api/mc/construction
   * @response 200 baseRes 成功
   */
  async list() {
    const { ctx } = this;
    const data = ctx.query;
    const page = data.page || 1;
    const limit = data.perPage || 15;
    const map = { where: {}, offset: (Number(page) - 1) * limit, limit: Number(limit) };
    const list = await ctx.model.McConstruction.findAndCountAll(map);
    this.success(list);
  }
  /**
   * @summary 新建工程
   * @description 新建工程
   * @router post /api/mc/construction
   * @request body mc_construction_add body 新建工程
   * @response 200 baseRes 成功
   */
  async create() {
    const { ctx } = this;
    const data = await ctx.model.McConstruction.create(ctx.request.body);
    this.success(data);
  }
  /**
   * @summary 更新工程
   * @description 更新指定ID的工程
   * @router post /api/mc/construction/{id}
   * @request body mc_construction_edit body 更新工程
   * @response 200 baseRes 成功
   */
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const update = await ctx.model.McConstruction.update(data, { where: { id: data.id } });
    this.success(update);
  }
  /**
   * @summary 删除工程
   * @description 删除指定ID的工程
   * @router get /api/mc/construction/{id}
   * @request query integer id ID
   * @response 200 baseRes 成功
   */
  async destroy() {
    const { ctx } = this;
    const result = await ctx.model.McConstruction.destroy({ where: { id: ctx.query.id } });
    this.success(result);
  }
}
module.exports = ConstructionController;
