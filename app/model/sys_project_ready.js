
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysProjectReady = app.model.define('sys_project_ready', {
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    key: { type: DataTypes.STRING, comment: '关联项目key' },
    mainMaterial: { type: DataTypes.STRING, comment: '主材' },
    auxiliaryMaterial: { type: DataTypes.STRING, comment: '辅材' },
    deliveryCycle: { type: DataTypes.STRING, comment: '到货周期' },
    workerContact: { type: DataTypes.STRING, comment: '工人联系' },
    other: { type: DataTypes.STRING, comment: 'others' },
  },{
  
  paranoid: false,
});
  SysProjectReady.associate = function() {
       app.model.SysProjects.hasOne(app.model.SysProjectReady, {
            foreignKey: 'key',
            sourceKey: 'key',
            constraints: true,
          });
          
      };
  //SysProjectReady.sync({ alter: true });
  return SysProjectReady;
};
