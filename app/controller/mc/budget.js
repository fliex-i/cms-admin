'use strict';
const Controller = require('../../core/base_controller');
const { Op } = require('sequelize');

/**
* @controller 用户装修预算
*/
class BudgetController extends Controller {
  /**
   * @summary 获取预算列表
   * @description 获取所有用户装修预算
   * @router get /api/mc/budget
   * @response 200 baseRes 成功
   */
  async list() {
    const { ctx } = this;
    const data = ctx.query;
    const page = data.page || 1;
    const limit = data.perPage || 15;
    const map = {};
    map.where = {};
    if (data.name) {
      map.where.name = { [Op.like]: `%${data.name}%` };
    }
    map.offset = (Number(page) - 1) * limit;
    map.limit = Number(limit);

    const list = await ctx.model.McBudget.findAndCountAll(map);
    this.success(list);

  }

  /**
   * @summary 新建预算
   * @description 新建用户装修预算
   * @router post /api/mc/budget
   * @request body mc_budget_add body 新建装修预算
   * @response 200 baseRes 成功
   */
  async create() {
    const { ctx } = this;
    const data = await ctx.model.McBudget.create(ctx.request.body);
    this.success(data);

  }
  /**
   * @summary 更新预算
   * @description 更新指定ID的用户装修预算
   * @router post /api/mc/budget/{id}
   * @request body mc_budget_edit body 更新装修预算
   * @response 200 baseRes success
   */
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const update = await ctx.model.McBudget.update(data, { where: { id: data.id } });
    this.success(update);
  }

  /**
   * @summary 删除预算
   * @description 删除指定ID的用户装修预算
   * @router get /api/mc/budget/{id}
   * @request query integer id ID
   * @response 200 baseRes desc
   */
  async destroy() {
    const { ctx } = this;
    const result = await ctx.model.McBudget.destroy(ctx.params.id);
    this.success(result);
  }
}

module.exports = BudgetController;
