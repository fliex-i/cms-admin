
'use strict';
module.exports = {
  
  Query: {
    async McBudget_findAll(_root, params, ctx) {
      return await ctx.connector.mc_budget.findAll(params);
    },
    async McBudget_findByPk(_root, params, ctx) {
      return await ctx.connector.mc_budget.findByPk(params);
    },
    async McBudget_findOne(_root, params, ctx) {
      return await ctx.connector.mc_budget.findOne(params);
    },
    async McBudget_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.mc_budget.findAndCountAll(params);
    },
  },
  Mutation: {
    async McBudget_create(_root, params, ctx) {
      return await ctx.connector.mc_budget.create(params);
    },
    async McBudget_destroy(_root, params, ctx) {
      return await ctx.connector.mc_budget.destroy(params);
    },
    async McBudget_update(_root, params, ctx) {
      return await ctx.connector.mc_budget.update(params);
    },
  },
};
