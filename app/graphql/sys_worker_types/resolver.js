
'use strict';
module.exports = {
  
  Query: {
    async SysWorkerTypes_findAll(_root, params, ctx) {
      return await ctx.connector.sys_worker_types.findAll(params);
    },
    async SysWorkerTypes_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_worker_types.findByPk(params);
    },
    async SysWorkerTypes_findOne(_root, params, ctx) {
      return await ctx.connector.sys_worker_types.findOne(params);
    },
    async SysWorkerTypes_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_worker_types.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysWorkerTypes_create(_root, params, ctx) {
      return await ctx.connector.sys_worker_types.create(params);
    },
    async SysWorkerTypes_destroy(_root, params, ctx) {
      return await ctx.connector.sys_worker_types.destroy(params);
    },
    async SysWorkerTypes_update(_root, params, ctx) {
      return await ctx.connector.sys_worker_types.update(params);
    },
  },
};
