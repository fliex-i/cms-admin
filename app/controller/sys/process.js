'use strict';
const Controller = require('egg').Controller;
class ProcessController extends Controller {
  async list() {
    const { ctx } = this;
    const { page = 1, pageSize = 10, ...where } = ctx.query;
    const result = await ctx.model.SysProcess.findAndCountAll({
      where,
      offset: (page - 1) * pageSize,
      limit: Number(pageSize),
      order: [[ 'id', 'DESC' ]],
    });
    ctx.body = { code: 0, data: result.rows, count: result.count };
  }
  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.model.SysProcess.create(data);
    ctx.body = { code: 0, data: res };
  }
  async update() {
    const { ctx } = this;
    const { id, ...data } = ctx.request.body;
    await ctx.model.SysProcess.update(data, { where: { id } });
    ctx.body = { code: 0 };
  }
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.query;
    await ctx.model.SysProcess.destroy({ where: { id } });
    ctx.body = { code: 0 };
  }
  async bulkDel() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    await ctx.model.SysProcess.destroy({ where: { id: ids } });
    ctx.body = { code: 0 };
  }
  async saveOrder() {
    const { ctx } = this;
    // 可根据实际需求实现排序逻辑
    ctx.body = { code: 0 };
  }
}
module.exports = ProcessController;
