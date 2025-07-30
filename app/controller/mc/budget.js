'use strict';
const Controller = require('../../core/base_controller');
/**
* @controller McBudget 用户装修预算
*/
class McBudgetController extends Controller {

  async index() {
    const { ctx } = this;
    ctx.meta_title = '用户的预算';
    await ctx.render('mc/budget');
  }
  /**
   * @summary 获取预算列表
   * @description 获取预算列表
   * @router get /mc/budget
   * @response 200 baseRes 成功
   */
  async all() {
    const { ctx, service } = this;
    ctx.body = await service.mc.budget.list(ctx.query);
  }

  /**
   * @summary 新建预算
   * @description 新建预算
   * @router post /mc/budget
   * @request body createMcBudgetRequest *body
   * @response 200 baseRes 成功
   */
  async create() {
    const { ctx, service } = this;
    ctx.body = await service.mc.budget.create(ctx.request.body);
  }

  /**
   * @summary 获取单个预算
   * @description 获取单个预算
   * @router get /mc/budget/{id}
   * @request path integer id 预算ID
   * @response 200 baseRes 成功
   */
  async show() {
    const { ctx, service } = this;
    ctx.body = await service.mc.budget.findById(ctx.params.id);
  }

  /**
   * @summary 更新预算
   * @description 更新预算
   * @router put /mc/budget/{id}
   * @request path integer id 预算ID
   * @request body updateMcBudgetRequest *body
   * @response 200 baseRes 成功
   */
  async update() {
    const { ctx, service } = this;
    ctx.body = await service.mc.budget.update(ctx.params.id, ctx.request.body);
  }

  /**
   * @summary 删除预算
   * @description 删除预算
   * @router delete /mc/budget/{id}
   * @request path integer id 预算ID
   * @response 200 baseRes 成功
   */
  async destroy() {
    const { ctx, service } = this;
    ctx.body = await service.mc.budget.delete(ctx.params.id);
  }
}

module.exports = McBudgetController;

/**
 * @swagger
 * /api/mc_budget:
 *   get:
 *     summary: 获取预算列表
 *     tags:
 *       - mc_budget
 *     responses:
 *       200:
 *         description: 成功
 *   post:
 *     summary: 新建预算
 *     tags:
 *       - mc_budget
 *     parameters:
 *       - in: body
 *         name: body
 *         description: 预算内容
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             uid:
 *               type: integer
 *             items:
 *               type: object
 *     responses:
 *       200:
 *         description: 成功
 * /api/mc_budget/{id}:
 *   get:
 *     summary: 获取单个预算
 *     tags:
 *       - mc_budget
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功
 *   put:
 *     summary: 更新预算
 *     tags:
 *       - mc_budget
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *       - in: body
 *         name: body
 *         description: 预算内容
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             items:
 *               type: object
 *     responses:
 *       200:
 *         description: 成功
 *   delete:
 *     summary: 删除预算
 *     tags:
 *       - mc_budget
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功
 */
