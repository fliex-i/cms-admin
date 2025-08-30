'use strict';
const Controller = require('../../core/base_controller');
/**
* @controller 商家类型管理
*/
class MaterialsTypesController extends Controller {
  /**
   * @summary 获取类型列表
   * @description 获取所有类型，支持分页和名称筛选
   * @router get /api/cms/material_types
   * @response 200 baseRes 成功
   */
  async list() {
    const { ctx } = this;
    const data = ctx.query;
    const page = Number(data.page) || 1;
    const limit = Number(data.perPage) || 15;
    const map = {
      offset: (page - 1) * limit,
      limit,
      where: {},
    };
    if (data.name) {
      map.where.name = { [ctx.app.Sequelize.Op.like]: `%${data.name}%` };
    }
    if (data.order) {
      map.order = [ data.order.split(',') ];
    }
    const list = await ctx.model.CmsMaterialsTypes.findAndCountAll(map);
    this.success({ ...list, page, perPage: limit });
  }
  /**
   * @summary 新建类型
   * @router post /api/cms/material_types/create
   */
  async create() {
    const { ctx } = this;
    const data = await ctx.model.CmsMaterialsTypes.create(ctx.request.body);
    this.success(data);
  }
  /**
   * @summary 更新类型
   * @router post /api/cms/material_types/update
   */
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const update = await ctx.model.CmsMaterialsTypes.update(data, { where: { id: data.id } });
    this.success(update);
  }
  /**
   * @summary 删除类型
   * @router post /api/cms/material_types/destroy
   */
  async destroy() {
    const { ctx } = this;
    const id = ctx.request.body.id || ctx.query.id;
    const result = await ctx.model.CmsMaterialsTypes.destroy({ where: { id } });
    this.success(result);
  }
  /**
   * @summary 批量删除类型
   * @router post /api/cms/material_types/bulkDel
   */
  async bulkDel() {
    const { ctx } = this;
    const ids = ctx.request.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
      return this.fail('参数错误');
    }
    const result = await ctx.model.CmsMaterialsTypes.destroy({ where: { id: ids } });
    this.success(result);
  }
}
module.exports = MaterialsTypesController;
