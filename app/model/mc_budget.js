
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const McBudget = app.model.define('mc_budget', {
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    uid: { type: DataTypes.INTEGER, comment: '用户id' },
    items: { type: DataTypes.JSON, comment: '用户装修预算数据json' },
  },{
  indexes:[{"unique":false,"fields":["id"]}],
  paranoid: false,
});
  McBudget.associate = function() {
       app.model.McMember.hasOne(app.model.McBudget, {
            foreignKey: 'uid',
            sourceKey: 'id',
            constraints: true,
          });
          
      };
  //McBudget.sync({ alter: true });
  return McBudget;
};
