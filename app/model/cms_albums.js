
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const CmsAlbums = app.model.define('cms_albums', {
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '图集名称' },
    photos: { type: DataTypes.JSON, comment: '图集图片' },
    desc: { type: DataTypes.STRING, comment: '图集描述' },
  },{
  
  paranoid: false,
});
  
  //CmsAlbums.sync({ alter: true });
  return CmsAlbums;
};
