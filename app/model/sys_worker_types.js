
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysWorkerTypes = app.model.define('sys_worker_types', {
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '类型名称' },
  },{
  indexes:[{"unique":true,"fields":["id","name"]}],
  paranoid: false,
});
  
  //SysWorkerTypes.sync({ alter: true });
  return SysWorkerTypes;
};
