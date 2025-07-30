
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const McHousePlan = app.model.define('mc_house_plan', {
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    uid: { type: DataTypes.INTEGER, comment: '用户id' },
    space: { type: DataTypes.STRING, comment: '房间空间' },
    layouts: { type: DataTypes.STRING, comment: '房间空间布局子项,分割' },
    layout_pictures: { type: DataTypes.STRING, comment: '布局图集:图片地址,分割' },
  }, {

    paranoid: false,
  });
  McHousePlan.associate = function() {
    app.model.McMember.hasOne(app.model.McHousePlan, {
      foreignKey: 'uid',
      sourceKey: 'id',
      constraints: true,
    });

  };
  // McHousePlan.sync({ alter: true });
  return McHousePlan;
};
