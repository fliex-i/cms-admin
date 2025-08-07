
'use strict';
module.exports = {
  SysProjects: {
  async sys_process(root, params, ctx) {
    const map = {};
    map.where = { key: root.key };
    return await ctx.connector.sys_process.findOne(map);
  },

  async sys_project_ready(root, params, ctx) {
    const map = {};
    map.where = { key: root.key };
    return await ctx.connector.sys_project_ready.findOne(map);
  },
},
    
  Query: {
    async SysProjects_findAll(_root, params, ctx) {
      return await ctx.connector.sys_projects.findAll(params);
    },
    async SysProjects_findByPk(_root, params, ctx) {
      return await ctx.connector.sys_projects.findByPk(params);
    },
    async SysProjects_findOne(_root, params, ctx) {
      return await ctx.connector.sys_projects.findOne(params);
    },
    async SysProjects_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.sys_projects.findAndCountAll(params);
    },
  },
  Mutation: {
    async SysProjects_create(_root, params, ctx) {
      return await ctx.connector.sys_projects.create(params);
    },
    async SysProjects_destroy(_root, params, ctx) {
      return await ctx.connector.sys_projects.destroy(params);
    },
    async SysProjects_update(_root, params, ctx) {
      return await ctx.connector.sys_projects.update(params);
    },
  },
};
