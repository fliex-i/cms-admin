
'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const McAq = app.model.define('mc_aq', {
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '创建时间' },
    id: { type: DataTypes.INTEGER, autoIncrement:true, primaryKey: true, comment: '主键' },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, comment: '更新时间' },
    uid: { type: DataTypes.INTEGER, comment: '关联用户id' },
    question: { type: DataTypes.STRING, comment: '咨询内容' },
    answer: { type: DataTypes.STRING, comment: '管理员回复内容' },
    response_time: { type: DataTypes.DATE, comment: '管理员回复时间' },
  },{
  indexes:[{"unique":false,"fields":["id","uid"]}],
  paranoid: false,
});
  McAq.associate = function() {
       app.model.McMember.hasMany(app.model.McAq, {
            foreignKey: 'uid',
            sourceKey: 'id',
            constraints: true,
          });
          
      };
  //McAq.sync({ alter: true });
  return McAq;
};
