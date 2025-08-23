
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const CmsMaterials = app.model.define('cms_materials', {
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    thumb: { type: DataTypes.STRING, comment: '商家门头照片' },
    photos: { type: DataTypes.JSON, comment: '商家门店内部照片' },
    address: { type: DataTypes.STRING, comment: '商家地址' },
    phone: { type: DataTypes.STRING, comment: '商家电话' },
    weixin: { type: DataTypes.STRING, comment: '商家微信' },
    desc: { type: DataTypes.JSON, comment: '商家简介' },
    type: { type: DataTypes.INTEGER, comment: '商家类型Id' },
    name: { type: DataTypes.STRING, comment: '商家名称' },
    contact: { type: DataTypes.STRING, comment: '联系人' },
    region: { type: DataTypes.STRING, comment: '服务区域说明' },
  },{
  
  paranoid: false,
});
  CmsMaterials.associate = function() {
       app.model.CmsMaterialsTypes.hasMany(app.model.CmsMaterials, {
            foreignKey: 'type',
            sourceKey: 'id',
            constraints: true,
          });
          
      };
  //CmsMaterials.sync({ alter: true });
  return CmsMaterials;
};
