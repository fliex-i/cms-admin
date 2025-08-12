
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const SysCounty = app.model.define('sys_county', {
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '区县名' },
    county_id: { type: DataTypes.STRING(12), comment: '区县id' },
    city_id: { type: DataTypes.STRING(12), comment: '城市id' },
  },{
  
  paranoid: false,
});
  SysCounty.associate = function() {
       app.model.SysCity.hasMany(app.model.SysCounty, {
            foreignKey: 'city_id',
            sourceKey: 'city_id',
            constraints: true,
          });
          
      };
  //SysCounty.sync({ alter: true });
  return SysCounty;
};
