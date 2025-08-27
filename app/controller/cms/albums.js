'use strict';
const Controller = require('../../core/base_controller');
/**
* @controller 图集管理
*/
class AlbumsController extends Controller {
  /**
   * @summary 获取图集列表
   * @description 获取所有图集，支持分页
   * @router get /api/cms/albums
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
    // 支持名称筛选
    if (data.name) {
      map.where.name = { [ctx.app.Sequelize.Op.like]: `%${data.name}%` };
    }
    // 排序
    if (data.order) {
      map.order = [ data.order.split(',') ];
    }
    const list = await ctx.model.CmsAlbums.findAndCountAll(map);
    this.success({ ...list, page, perPage: limit });
  }
  /**
   * @summary 新建图集
   * @description 新建图集
   * @router post /api/cms/albums
   * @request body cms_albums_add body 新建图集
   * @response 200 baseRes 成功
   */
  async create() {
    const { ctx } = this;
    const data = await ctx.model.CmsAlbums.create(ctx.request.body);
    this.success(data);
  }
  /**
   * @summary 更新图集
   * @description 更新指定ID的图集
   * @router post /api/cms/albums/{id}
   * @request body cms_albums_edit body 更新图集
   * @response 200 baseRes 成功
   */
  async update() {
    const { ctx } = this;
    const data = ctx.request.body;
    const update = await ctx.model.CmsAlbums.update(data, { where: { id: data.id } });
    this.success(update);
  }
  /**
   * @summary 删除图集
   * @description 删除指定ID的图集
   * @router get /api/cms/albums/{id}
   * @request query integer id ID
   * @response 200 baseRes 成功
   */
  async destroy() {
    const { ctx } = this;
    const result = await ctx.model.CmsAlbums.destroy({ where: { id: ctx.query.id } });
    this.success(result);
  }
  /**
   * @summary 批量删除图集
   * @description 批量删除图集
   * @router post /api/cms/albums/bulkDel
   * @request body array ids 图集ID数组
   * @response 200 baseRes 成功
   */
  async bulkDel() {
    const { ctx } = this;
    const ids = ctx.request.body.ids;
    if (!Array.isArray(ids) || ids.length === 0) {
      return this.fail('参数错误');
    }
    const result = await ctx.model.CmsAlbums.destroy({ where: { id: ids } });
    this.success(result);
  }
}
module.exports = AlbumsController;
