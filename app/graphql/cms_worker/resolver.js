
'use strict';
module.exports = {
  
  Query: {
    async CmsWorker_findAll(_root, params, ctx) {
      return await ctx.connector.cms_worker.findAll(params);
    },
    async CmsWorker_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_worker.findByPk(params);
    },
    async CmsWorker_findOne(_root, params, ctx) {
      return await ctx.connector.cms_worker.findOne(params);
    },
    async CmsWorker_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_worker.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsWorker_create(_root, params, ctx) {
      return await ctx.connector.cms_worker.create(params);
    },
    async CmsWorker_destroy(_root, params, ctx) {
      return await ctx.connector.cms_worker.destroy(params);
    },
    async CmsWorker_update(_root, params, ctx) {
      return await ctx.connector.cms_worker.update(params);
    },
  },
};
