'use strict';
const Controller = require('../../core/base_controller');

class McServiceController extends Controller {
  // 查询列表
  async list() {
    const { ctx } = this;
    const { page = 1, pageSize = 10 } = ctx.query;
    const where = {};
    if (ctx.query.uid) where.uid = ctx.query.uid;
    // 修正模型调用，需大写：McService
    const result = await ctx.model.McService.findAndCountAll({
      where,
      order: [[ 'id', 'DESC' ]],
      offset: (page - 1) * pageSize,
      limit: Number(pageSize),
    });
    // 查询所有相关uid的member信息
    const uids = Array.from(new Set(result.rows.map(item => item.uid).filter(Boolean)));
    let memberMap = {};
    if (uids.length) {
      const members = await ctx.model.McMember.findAll({
        where: { id: uids },
        attributes: [ 'id', 'username', 'name' ],
        raw: true,
      });
      memberMap = members.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
    }
    // 给每条数据加上name字段
    const list = result.rows.map(item => {
      const member = memberMap[item.uid];
      return {
        ...item.toJSON(),
        member,
      };
    });
    this.success({
      list,
      total: result.count,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  }

  // 新增
  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    const item = await ctx.model.McService.create(body);
    this.success(item);
  }

  // 更新
  async update() {
    const { ctx } = this;
    const { id, ...rest } = ctx.request.body;
    const item = await ctx.model.McService.findByPk(id);
    if (!item) return this.fail('记录不存在');
    await item.update(rest);
    this.success(item);
  }

  // 删除
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const item = await ctx.model.McService.findByPk(id);
    if (!item) return this.fail('记录不存在');
    await item.destroy();
    this.success('删除成功');
  }
}

module.exports = McServiceController;
