
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const CmsMaterialsTypes = app.model.define('cms_materials_types', {
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    name: { type: DataTypes.STRING, comment: '材料商家类型' },
    desc: { type: DataTypes.STRING, comment: '类型描述' },
  },{
  
  paranoid: false,
});
  
  //CmsMaterialsTypes.sync({ alter: true });
  return CmsMaterialsTypes;
};
