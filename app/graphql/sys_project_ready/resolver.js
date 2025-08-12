
'use strict';
module.exports = {
  
  Query: {
    async SysProjectReady_findAll(_root, params, ctx) {
      return await ctx.connector.sys_project_ready.findAll(params);
    },
    async SysProjectReady_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_project_ready.findByPk(params);
    },
    async SysProjectReady_findOne(_root, params, ctx) {
      return await ctx.connector.sys_project_ready.findOne(params);
    },
    async SysProjectReady_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_project_ready.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysProjectReady_create(_root, params, ctx) {
      return await ctx.connector.sys_project_ready.create(params);
    },
    async SysProjectReady_destroy(_root, params, ctx) {
      return await ctx.connector.sys_project_ready.destroy(params);
    },
    async SysProjectReady_update(_root, params, ctx) {
      return await ctx.connector.sys_project_ready.update(params);
    },
  },
};
