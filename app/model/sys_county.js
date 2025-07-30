'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const SysCounty = app.model.define('sys_county', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: STRING(50), allowNull: false, comment: '区县名称' },
    county_id: { type: INTEGER, allowNull: false, comment: '所属区县ID' },
    city_id: { type: INTEGER, allowNull: false, comment: '所属城市ID' },
  }, {
    tableName: 'sys_county',
    timestamps: false,
  });
  SysCounty.associate = function() {
    app.model.SysCounty.belongsTo(app.model.SysCity, { foreignKey: 'city_id', targetKey: 'id' });
  };
  return SysCounty;
};
