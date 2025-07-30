'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const SysCity = app.model.define('sys_city', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(50), allowNull: false, comment: '城市名称' },
    city_id: { type: INTEGER, allowNull: false, unique: true, comment: '城市ID' },
    province_id: { type: INTEGER, allowNull: false, comment: '所属省份ID' },
  }, {
    tableName: 'sys_city',
    timestamps: false,
  });
  SysCity.associate = function() {
    app.model.SysCity.belongsTo(app.model.SysProvince, { foreignKey: 'province_id', targetKey: 'id' });
  };
  return SysCity;
};
