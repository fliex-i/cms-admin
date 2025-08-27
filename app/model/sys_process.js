
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysProcess = app.model.define('sys_process', {
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    process: { type: DataTypes.TEXT, comment: '流程介绍' },
    standard: { type: DataTypes.TEXT, comment: '工艺标准介绍' },
    type: { type: DataTypes.STRING, comment: '施工类型' },
    notes: { type: DataTypes.TEXT, comment: '注意事项' },
    key: { type: DataTypes.STRING, comment: '关联项目' },
    video: { type: DataTypes.STRING, comment: '视频说明' },
  },{
  indexes:[{"unique":false,"fields":["key","id"]}],
  paranoid: false,
});
  SysProcess.associate = function() {
       app.model.SysProjects.hasOne(app.model.SysProcess, {
            foreignKey: 'key',
            sourceKey: 'key',
            constraints: true,
          });
          
      };
  //SysProcess.sync({ alter: true });
  return SysProcess;
};
