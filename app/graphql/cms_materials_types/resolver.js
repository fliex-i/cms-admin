
'use strict';
module.exports = {
  CmsMaterialsTypes: {
  async cms_materials(root, params, ctx) {
    const map = {};
    map.where = { type: root.id };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.cms_materials.findAll(map);
  },
},
    
  Query: {
    async CmsMaterialsTypes_findAll(_root, params, ctx) {
      return await ctx.connector.cms_materials_types.findAll(params);
    },
    async CmsMaterialsTypes_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_materials_types.findByPk(params);
    },
    async CmsMaterialsTypes_findOne(_root, params, ctx) {
      return await ctx.connector.cms_materials_types.findOne(params);
    },
    async CmsMaterialsTypes_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_materials_types.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsMaterialsTypes_create(_root, params, ctx) {
      return await ctx.connector.cms_materials_types.create(params);
    },
    async CmsMaterialsTypes_destroy(_root, params, ctx) {
      return await ctx.connector.cms_materials_types.destroy(params);
    },
    async CmsMaterialsTypes_update(_root, params, ctx) {
      return await ctx.connector.cms_materials_types.update(params);
    },
  },
};
