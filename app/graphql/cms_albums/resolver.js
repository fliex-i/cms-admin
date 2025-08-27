
'use strict';
module.exports = {
  
  Query: {
    async CmsAlbums_findAll(_root, params, ctx) {
      return await ctx.connector.cms_albums.findAll(params);
    },
    async CmsAlbums_findByPk(_root, params, ctx) {
      return await ctx.connector.cms_albums.findByPk(params);
    },
    async CmsAlbums_findOne(_root, params, ctx) {
      return await ctx.connector.cms_albums.findOne(params);
    },
    async CmsAlbums_findAndCountAll(_root, params, ctx) {
      return await ctx.connector.cms_albums.findAndCountAll(params);
    },
  },
  Mutation: {
    async CmsAlbums_create(_root, params, ctx) {
      return await ctx.connector.cms_albums.create(params);
    },
    async CmsAlbums_destroy(_root, params, ctx) {
      return await ctx.connector.cms_albums.destroy(params);
    },
    async CmsAlbums_update(_root, params, ctx) {
      return await ctx.connector.cms_albums.update(params);
    },
  },
};
