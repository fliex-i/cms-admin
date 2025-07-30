
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const CmsWorker = app.model.define('cms_worker', {
    createdAt: { type: DataTypes.DATE, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, comment: '更新时间' },
    workType: { type: DataTypes.STRING, comment: '工种' },
    avatar: { type: DataTypes.STRING, comment: '工人照片' },
    desc: { type: DataTypes.STRING, comment: '工人介绍' },
    phone: { type: DataTypes.STRING(11), comment: '联系电话' },
    case: { type: DataTypes.STRING, comment: '施工案例图片' },
    name: { type: DataTypes.STRING, comment: '姓名' },
  },{
  indexes:[{"unique":true,"fields":["name","phone","id"]}],
  paranoid: false,
});
  
  //CmsWorker.sync({ alter: true });
  return CmsWorker;
};
