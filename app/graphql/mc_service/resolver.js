
'use strict';
module.exports = {
  
  Query: {
    async McService_findAll(_root, params, ctx) {
      return await ctx.connector.mc_service.findAll(params);
    },
    async McService_findByPk(_root, params, ctx) {
      return await ctx.connector.mc_service.findByPk(params);
    },
    async McService_findOne(_root, params, ctx) {
      return await ctx.connector.mc_service.findOne(params);
    },
    async McService_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.mc_service.findAndCountAll(params);
    },
  },
  Mutation: {
    async McService_create(_root, params, ctx) {
      return await ctx.connector.mc_service.create(params);
    },
    async McService_destroy(_root, params, ctx) {
      return await ctx.connector.mc_service.destroy(params);
    },
    async McService_update(_root, params, ctx) {
      return await ctx.connector.mc_service.update(params);
    },
  },
};
