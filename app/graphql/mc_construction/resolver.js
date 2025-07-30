
'use strict';
module.exports = {
  
  Query: {
    async McConstruction_findAll(_root, params, ctx) {
      return await ctx.connector.mc_construction.findAll(params);
    },
    async McConstruction_findByPk(_root, params, ctx) {
      return await ctx.connector.mc_construction.findByPk(params);
    },
    async McConstruction_findOne(_root, params, ctx) {
      return await ctx.connector.mc_construction.findOne(params);
    },
    async McConstruction_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.mc_construction.findAndCountAll(params);
    },
  },
  Mutation: {
    async McConstruction_create(_root, params, ctx) {
      return await ctx.connector.mc_construction.create(params);
    },
    async McConstruction_destroy(_root, params, ctx) {
      return await ctx.connector.mc_construction.destroy(params);
    },
    async McConstruction_update(_root, params, ctx) {
      return await ctx.connector.mc_construction.update(params);
    },
  },
};
