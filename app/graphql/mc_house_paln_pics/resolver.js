
'use strict';
module.exports = {
  
  Query: {
    async McHousePalnPics_findAll(_root, params, ctx) {
      return await ctx.connector.mc_house_paln_pics.findAll(params);
    },
    async McHousePalnPics_findByPk(_root, params, ctx) {
      return await ctx.connector.mc_house_paln_pics.findByPk(params);
    },
    async McHousePalnPics_findOne(_root, params, ctx) {
      return await ctx.connector.mc_house_paln_pics.findOne(params);
    },
    async McHousePalnPics_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.mc_house_paln_pics.findAndCountAll(params);
    },
  },
  Mutation: {
    async McHousePalnPics_create(_root, params, ctx) {
      return await ctx.connector.mc_house_paln_pics.create(params);
    },
    async McHousePalnPics_destroy(_root, params, ctx) {
      return await ctx.connector.mc_house_paln_pics.destroy(params);
    },
    async McHousePalnPics_update(_root, params, ctx) {
      return await ctx.connector.mc_house_paln_pics.update(params);
    },
  },
};
