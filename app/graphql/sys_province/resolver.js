
'use strict';
module.exports = {
  
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
