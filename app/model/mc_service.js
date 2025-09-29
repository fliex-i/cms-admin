
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const McService = app.model.define('mc_service', {
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    uid: { type: DataTypes.INTEGER, comment: '用户id' },
    message: { type: DataTypes.TEXT, comment: '咨询消息' },
    response: { type: DataTypes.TEXT, comment: '管理员恢复消息' },
  }, {

    paranoid: false,
  });

  // McService.sync({ alter: true });
  return McService;
};
