'use strict';
const Controller = require('../../core/base_controller');
/**
* @controller 户型方案
*/
class HousePlanController extends Controller {
  /**
   * @summary 获取户型方案列表
   * @description 获取所有户型方案
   * @router get /api/mc/house_plan
   * @response 200 baseRes 成功
   */
  async list() {
    const { ctx } = this;
    const data = ctx.query;
    const page = data.page || 1;
    const limit = data.perPage || 15;
    const map = { where: {}, offset: (Number(page) - 1) * limit, limit: Number(limit) };
    const list = await ctx.model.McHousePlan.findAndCountAll(map);
    this.success(list);
  }
  /**
   * @summary 新建户型方案
   * @description 新建户型方案
   * @router post /api/mc/house_plan
   * @request body mc_house_plan_add body 新建户型方案
   * @response 200 baseRes 成功
   */
  async create() {
    const { ctx } = this;
    const data = await ctx.model.McHousePlan.create(ctx.request.body);
    this.success(data);
  }
  /**
   * @summary 更新户型方案
   * @description 更新指定ID的户型方案
   * @router post /api/mc/house_plan/{id}
   * @request body mc_house_plan_edit body 更新户型方案
   * @response 200 baseRes 成功
   */
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const update = await ctx.model.McHousePlan.update(data, { where: { id: data.id } });
    this.success(update);
  }
  /**
   * @summary 删除户型方案
   * @description 删除指定ID的户型方案
   * @router get /api/mc/house_plan/{id}
   * @request query integer id ID
   * @response 200 baseRes 成功
   */
  async destroy() {
    const { ctx } = this;
    const result = await ctx.model.McHousePlan.destroy({ where: { id: ctx.query.id } });
    this.success(result);
  }
}
module.exports = HousePlanController;
