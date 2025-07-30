
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const McConstruction = app.model.define('mc_construction', {
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    uid: { type: DataTypes.INTEGER, comment: '用户id' },
    items: { type: DataTypes.JSON, comment: '用户施工计划json数据' },
  }, {

    paranoid: false,
  });
  McConstruction.associate = function() {
    app.model.McMember.hasOne(app.model.McConstruction, {
      foreignKey: 'uid',
      sourceKey: 'id',
      constraints: true,
    });

  };
  // McConstruction.sync({ alter: true });
  return McConstruction;
};
