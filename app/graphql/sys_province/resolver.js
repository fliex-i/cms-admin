
'use strict';
module.exports = {
  SysProvince: {
  async sys_city(root, params, ctx) {
    const map = {};
    map.where = { province_id: root.province_id };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.sys_city.findAll(map);
  },
},
    
  Query: {
    async SysProvince_findAll(_root, params, ctx) {
      return await ctx.connector.sys_province.findAll(params);
    },
    async SysProvince_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_province.findByPk(params);
    },
    async SysProvince_findOne(_root, params, ctx) {
      return await ctx.connector.sys_province.findOne(params);
    },
    async SysProvince_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_province.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysProvince_create(_root, params, ctx) {
      return await ctx.connector.sys_province.create(params);
    },
    async SysProvince_destroy(_root, params, ctx) {
      return await ctx.connector.sys_province.destroy(params);
    },
    async SysProvince_update(_root, params, ctx) {
      return await ctx.connector.sys_province.update(params);
    },
  },
};
