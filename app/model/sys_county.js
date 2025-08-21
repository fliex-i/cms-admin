
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysCounty = app.model.define('sys_county', {
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '区县名' },
    city_id: { type: DataTypes.BIGINT, comment: '城市id' },
    county_id: { type: DataTypes.BIGINT, comment: '区县id' },
  },{
  
  paranoid: false,
});
  
  //SysCounty.sync({ alter: true });
  return SysCounty;
};
