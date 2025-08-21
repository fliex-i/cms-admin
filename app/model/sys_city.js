
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysCity = app.model.define('sys_city', {
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '城市名' },
    city_id: { type: DataTypes.STRING, comment: '城市id' },
    province_id: { type: DataTypes.STRING, comment: '关联省份id' },
  },{
  
  paranoid: false,
});
  SysCity.associate = function() {
       app.model.SysProvince.hasMany(app.model.SysCity, {
            foreignKey: 'province_id',
            sourceKey: 'province_id',
            constraints: true,
          });
          
      };
  //SysCity.sync({ alter: true });
  return SysCity;
};
