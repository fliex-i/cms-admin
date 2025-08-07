
'use strict';
module.exports = {
  
  Query: {
    async SysProcess_findAll(_root, params, ctx) {
      return await ctx.connector.sys_process.findAll(params);
    },
    async SysProcess_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_process.findByPk(params);
    },
    async SysProcess_findOne(_root, params, ctx) {
      return await ctx.connector.sys_process.findOne(params);
    },
    async SysProcess_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_process.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysProcess_create(_root, params, ctx) {
      return await ctx.connector.sys_process.create(params);
    },
    async SysProcess_destroy(_root, params, ctx) {
      return await ctx.connector.sys_process.destroy(params);
    },
    async SysProcess_update(_root, params, ctx) {
      return await ctx.connector.sys_process.update(params);
    },
  },
};
