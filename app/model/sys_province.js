
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysProvince = app.model.define('sys_province', {
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '省份名称' },
    province_id: { type: DataTypes.BIGINT, comment: '省份id' },
  },{
  
  paranoid: false,
});
  
  //SysProvince.sync({ alter: true });
  return SysProvince;
};
