
'use strict';
module.exports = {
  McHousePlan: {
  async mc_house_paln_pics(root, params, ctx) {
    const map = {};
    map.where = { spaceId: root.id };
    if (Object.hasOwnProperty.call(params, 'limit')) {
      map.limit = params.limit;
    }
    if (Object.hasOwnProperty.call(params, 'offset')) {
      map.offset = params.offset;
    }
    if (Object.hasOwnProperty.call(params, 'order')) {
      map.order = params.order;
    }
    return await ctx.connector.mc_house_paln_pics.findAll(map);
  },
},
    
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
