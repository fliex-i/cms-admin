
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const McHousePlan = app.model.define('mc_house_plan', {
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '更新时间' },
    uid: { type: DataTypes.INTEGER, comment: '用户id' },
    spaceName: { type: DataTypes.STRING, comment: '房间空间' },
    pictures: { type: DataTypes.STRING, comment: '空间图片' },
  },{
  indexes:[{"unique":false,"fields":["id"]}],
  paranoid: false,
});
  McHousePlan.associate = function() {
       app.model.McMember.hasMany(app.model.McHousePlan, {
            foreignKey: 'uid',
            sourceKey: 'id',
            constraints: true,
          });
          
      };
  //McHousePlan.sync({ alter: true });
  return McHousePlan;
};
