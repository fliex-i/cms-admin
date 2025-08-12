
'use strict';
module.exports = {
  SysCity: {
  async sys_county(root, params, ctx) {
    const map = {};
    map.where = { city_id: root.city_id };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.sys_county.findAll(map);
  },
},
    
  Query: {
    async SysCity_findAll(_root, params, ctx) {
      return await ctx.connector.sys_city.findAll(params);
    },
    async SysCity_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_city.findByPk(params);
    },
    async SysCity_findOne(_root, params, ctx) {
      return await ctx.connector.sys_city.findOne(params);
    },
    async SysCity_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_city.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysCity_create(_root, params, ctx) {
      return await ctx.connector.sys_city.create(params);
    },
    async SysCity_destroy(_root, params, ctx) {
      return await ctx.connector.sys_city.destroy(params);
    },
    async SysCity_update(_root, params, ctx) {
      return await ctx.connector.sys_city.update(params);
    },
  },
};
