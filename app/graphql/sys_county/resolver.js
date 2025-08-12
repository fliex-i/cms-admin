
'use strict';
module.exports = {
  
  Query: {
    async SysCounty_findAll(_root, params, ctx) {
      return await ctx.connector.sys_county.findAll(params);
    },
    async SysCounty_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_county.findByPk(params);
    },
    async SysCounty_findOne(_root, params, ctx) {
      return await ctx.connector.sys_county.findOne(params);
    },
    async SysCounty_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_county.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysCounty_create(_root, params, ctx) {
      return await ctx.connector.sys_county.create(params);
    },
    async SysCounty_destroy(_root, params, ctx) {
      return await ctx.connector.sys_county.destroy(params);
    },
    async SysCounty_update(_root, params, ctx) {
      return await ctx.connector.sys_county.update(params);
    },
  },
};
