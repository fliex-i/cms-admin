'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const SysProvince = app.model.define('sys_province', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(50), allowNull: false, comment: '省份名称' },
    province_id: { type: INTEGER, allowNull: false, comment: '所属省份ID' },
  }, {
    tableName: 'sys_province',
    timestamps: false,
  });
  return SysProvince;
};
