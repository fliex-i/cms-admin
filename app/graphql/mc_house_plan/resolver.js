
'use strict';
module.exports = {
  
  Query: {
    async McHousePlan_findAll(_root, params, ctx) {
      return await ctx.connector.mc_house_plan.findAll(params);
    },
    async McHousePlan_findByPk(_root, params, ctx) {
      return await ctx.connector.mc_house_plan.findByPk(params);
    },
    async McHousePlan_findOne(_root, params, ctx) {
      return await ctx.connector.mc_house_plan.findOne(params);
    },
    async McHousePlan_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.mc_house_plan.findAndCountAll(params);
    },
  },
  Mutation: {
    async McHousePlan_create(_root, params, ctx) {
      return await ctx.connector.mc_house_plan.create(params);
    },
    async McHousePlan_destroy(_root, params, ctx) {
      return await ctx.connector.mc_house_plan.destroy(params);
    },
    async McHousePlan_update(_root, params, ctx) {
      return await ctx.connector.mc_house_plan.update(params);
    },
  },
};
