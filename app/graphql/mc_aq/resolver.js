
'use strict';
module.exports = {
  
  Query: {
    async McAq_findAll(_root, params, ctx) {
      return await ctx.connector.mc_aq.findAll(params);
    },
    async McAq_findByPk(_root, params, ctx) {
      return await ctx.connector.mc_aq.findByPk(params);
    },
    async McAq_findOne(_root, params, ctx) {
      return await ctx.connector.mc_aq.findOne(params);
    },
    async McAq_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.mc_aq.findAndCountAll(params);
    },
  },
  Mutation: {
    async McAq_create(_root, params, ctx) {
      return await ctx.connector.mc_aq.create(params);
    },
    async McAq_destroy(_root, params, ctx) {
      return await ctx.connector.mc_aq.destroy(params);
    },
    async McAq_update(_root, params, ctx) {
      return await ctx.connector.mc_aq.update(params);
    },
  },
};
