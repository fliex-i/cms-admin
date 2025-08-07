
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysProjects = app.model.define('sys_projects', {
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '项目名称' },
    key: { type: DataTypes.STRING, primaryKey: true, comment: '项目key-关联工艺流程标准，施工准备信息唯一key' },
  }, {

    paranoid: true,
  });

  // SysProjects.sync({ alter: true });
  return SysProjects;
};
