'use strict';
const Controller = require('../../core/base_controller');
class ProjectsController extends Controller {
  async list() {
    const { ctx } = this;
    const { page = 1, perPage = 100, ...where } = ctx.query;
    const limit = Number(perPage || 100);
    delete where.page;
    delete where.pageSize;
    delete where.perPage;
    delete where.orderBy;
    delete where.orderDir;
    const result = await ctx.model.SysProjects.findAndCountAll({
      where,
      offset: (page - 1) * limit,
      limit,
      order: [[ 'id', 'ASC' ]],
    });
    this.success(result);
  }
  async create() {
    const { ctx } = this;
    const data = await ctx.model.SysProjects.create(ctx.request.body);
    this.success(data);
  }
  async update() {
    const { ctx } = this;
    const { id, ...data } = ctx.request.body;
    await ctx.model.SysProjects.update(data, { where: { id } });
    this.success();
  }
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    await ctx.model.SysProjects.destroy({ where: { id } });
    this.success();
  }
  async bulkDel() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    await ctx.model.SysProjects.destroy({ where: { id: ids } });
    this.success();
  }
  async saveOrder() {
    const { ctx } = this;
    const list = ctx.request.body.list;
    if (!Array.isArray(list) || list.length === 0) {
      return this.fail('参数错误');
    }
    const promises = list.map(item => {
      return ctx.model.SysProjects.update({ order: item.order }, { where: { id: item.id } });
    });
    await Promise.all(promises);
    this.success('排序已保存');
  }
}
module.exports = ProjectsController;
