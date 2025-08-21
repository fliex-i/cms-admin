
'use strict';
module.exports = {
  
  Query: {
    async CmsMaterials_findAll(_root, params, ctx) {
      return await ctx.connector.cms_materials.findAll(params);
    },
    async CmsMaterials_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_materials.findByPk(params);
    },
    async CmsMaterials_findOne(_root, params, ctx) {
      return await ctx.connector.cms_materials.findOne(params);
    },
    async CmsMaterials_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_materials.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsMaterials_create(_root, params, ctx) {
      return await ctx.connector.cms_materials.create(params);
    },
    async CmsMaterials_destroy(_root, params, ctx) {
      return await ctx.connector.cms_materials.destroy(params);
    },
    async CmsMaterials_update(_root, params, ctx) {
      return await ctx.connector.cms_materials.update(params);
    },
  },
};
