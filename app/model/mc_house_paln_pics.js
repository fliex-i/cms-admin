
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const McHousePalnPics = app.model.define('mc_house_paln_pics', {
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '更新时间' },
    picture: { type: DataTypes.STRING, comment: '图片地址' },
    uid: { type: DataTypes.INTEGER, comment: '关联用户id' },
    spaceId: { type: DataTypes.INTEGER, comment: '空间id' },
  },{
  
  paranoid: false,
});
  McHousePalnPics.associate = function() {
       app.model.McHousePlan.hasMany(app.model.McHousePalnPics, {
            foreignKey: 'spaceId',
            sourceKey: 'id',
            constraints: false,
          });
          
      };
  //McHousePalnPics.sync({ alter: true });
  return McHousePalnPics;
};
