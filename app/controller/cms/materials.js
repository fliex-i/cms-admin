'use strict';
const Controller = require('../../core/base_controller');
class MaterialsController extends Controller {
  // 获取材料商列表
  async list() {
    const { ctx } = this;
    const data = ctx.query;
    const page = data.page || 1;
    const limit = data.perPage || 15;
    const where = {};
    if (data.name) where.name = { [ctx.app.Sequelize.Op.like]: `%${data.name}%` };
    if (data.contact) where.contact = { [ctx.app.Sequelize.Op.like]: `%${data.contact}%` };
    if (data.phone) where.phone = { [ctx.app.Sequelize.Op.like]: `%${data.phone}%` };
    if (data.type) where.type = data.type;
    if (data.weixin) where.weixin = { [ctx.app.Sequelize.Op.like]: `%${data.weixin}%` };
    const list = await ctx.model.CmsMaterials.findAndCountAll({
      where,
      offset: (Number(page) - 1) * limit,
      limit: Number(limit),
      order: [[ 'id', 'ASC' ]],
    });
    // 批量处理 photos 字段为数组
    if (Array.isArray(list.rows)) {
      list.rows.forEach(item => {
        if (item.photos && typeof item.photos === 'string') {
          try {
            item.photos = JSON.parse(item.photos);
          } catch (e) {
            item.photos = item.photos.split(',').map(i => i.trim().replace(/\"|"$/g, ''));
          }
        }
      });
    }
    this.success(list);
  }
  // 新建材料商
  async create() {
    const { ctx } = this;
    const data = await ctx.model.CmsMaterials.create({
      ...ctx.request.body,
      type: ctx.request.body.typeId,
    });
    this.success(data);
  }
  // 更新材料商
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const update = await ctx.model.CmsMaterials.update({
      ...data,
      type: data.typeId,
    }, { where: { id: data.id } });
    this.success(update);
  }
  // 删除材料商
  async destroy() {
    const { ctx } = this;
    const result = await ctx.model.CmsMaterials.destroy({ where: { id: ctx.query.id } });
    this.success(result);
  }
  // 批量删除
  async bulkDel() {
    const { ctx } = this;
    const ids = ctx.request.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
      return this.fail('参数错误');
    }
    const result = await ctx.model.CmsMaterials.destroy({ where: { id: ids } });
    this.success(result);
  }
  // 获取材料类型列表
  async types() {
    const { ctx } = this;
    const list = await ctx.model.CmsMaterialsTypes.findAll({
      attributes: [[ 'id', 'value' ], [ 'name', 'label' ]],
      raw: true,
    });
    this.success({ options: list });
  }
  // 保存排序
  async saveOrder() {
    const { ctx } = this;
    const list = ctx.request.body.list;
    if (!Array.isArray(list) || list.length === 0) {
      return this.fail('参数错误');
    }
    const promises = list.map(item => {
      return ctx.model.CmsMaterials.update({ order: item.order }, { where: { id: item.id } });
    });
    await Promise.all(promises);
    this.success('排序已保存');
  }
}
module.exports = MaterialsController;
