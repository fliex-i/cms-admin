
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
        attributes: [ 'id', 'username', 'mobile', 'avatar', 'state' ],
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

  async sysList() {
    const { ctx } = this;
    const { page = 1, pageSize = 10 } = ctx.query;
    const pageNum = Number(page);
    const limit = Number(pageSize);
    const offset = (pageNum - 1) * limit;

    const sequelize = ctx.model.McService.sequelize;
    const { Op } = ctx.model.Sequelize;

    // 按 uid 分组，统计数量并取每组的最新记录 id（使用 id 的 MAX 作为最近标识）
    const groups = await ctx.model.McService.findAll({
      attributes: [
        'uid',
        [ sequelize.fn('COUNT', sequelize.col('id')), 'count' ],
        [ sequelize.fn('MAX', sequelize.col('id')), 'lastId' ],
      ],
      where: { uid: { [Op.ne]: null } },
      group: [ 'uid' ],
      order: [[ sequelize.fn('MAX', sequelize.col('id')), 'DESC' ]],
      offset,
      limit,
      raw: true,
    });

    // 总的分组数量（distinct uid）
    const total = await ctx.model.McService.count({
      distinct: true,
      col: 'uid',
      where: { uid: { [Op.ne]: null } },
    });

    // 获取相关 member 信息
    const uids = Array.from(new Set(groups.map(g => g.uid).filter(Boolean)));
    let memberMap = {};
    if (uids.length) {
      const members = await ctx.model.McMember.findAll({
        where: { id: uids },
        attributes: [ 'id', 'username', 'mobile', 'avatar', 'state' ],
        raw: true,
      });
      memberMap = members.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
    }

    // 获取每组的最新记录详情
    const lastIds = Array.from(new Set(groups.map(g => g.uid).filter(Boolean)));
    let lastMap = {};
    if (lastIds.length) {
      const lasts = await ctx.model.McService.findAll({
        where: { uid: lastIds },
        raw: true,
      });
      lastMap = lasts.reduce((acc, cur) => {
        const key = cur.uid;
        if (!acc[key]) acc[key] = [];
        acc[key].push(cur);
        return acc;
      }, {});
    }

    const list = groups.map(g => ({
      uid: g.uid,
      count: Number(g.count),
      lastId: g.lastId,
      messages: lastMap[g.uid] || null,
      last: lastMap[g.uid] ? lastMap[g.uid][lastMap[g.uid].length - 1] : null,
      member: memberMap[g.uid] || null,
    }));

    this.success({
      list,
      total,
      page: pageNum,
      pageSize: limit,
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
