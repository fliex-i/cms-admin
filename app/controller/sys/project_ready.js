'use strict';
const Controller = require('../../core/base_controller');
class ProjectReadyController extends Controller {
  async list() {
    const { ctx } = this;
    const { page = 1, perPage = 10 } = ctx.query;
    const where = { ...ctx.query };
    Object.keys(where).forEach(key => {
      if (
        where[key] === undefined ||
        where[key] === null ||
        where[key] === '' ||
        [ 'page', 'perPage', 'pageSize' ].includes(key) ||
        (Array.isArray(where[key]) && where[key].length === 0)
      ) {
        delete where[key];
      }
    });
    const result = await ctx.model.SysProjectReady.findAndCountAll({
      where,
      offset: (page - 1) * perPage,
      limit: Number(perPage),
      order: [[ 'id', 'DESC' ]],
    });
    this.success(result);
  }
  async create() {
    const { ctx } = this;
    const data = ctx.request.body;
    const res = await ctx.model.SysProjectReady.create(data);
    ctx.body = { code: 0, data: res };
  }
  async update() {
    const { ctx } = this;
    const { id, ...data } = ctx.request.body;
    await ctx.model.SysProjectReady.update(data, { where: { id } });
    ctx.body = { code: 0 };
  }
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.query;
    await ctx.model.SysProjectReady.destroy({ where: { id } });
    ctx.body = { code: 0 };
  }
  async bulkDel() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    await ctx.model.SysProjectReady.destroy({ where: { id: ids } });
    ctx.body = { code: 0 };
  }
  async saveOrder() {
    const { ctx } = this;
    // 可根据实际需求实现排序逻辑
    ctx.body = { code: 0 };
  }
}
module.exports = ProjectReadyController;
