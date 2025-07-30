'use strict';
module.exports = app => {
  const { STRING } = app.Sequelize;
  // 验证短信验证码请求模型（仅用于接口文档/校验，无实际表）
  const SysVerifySmsRequest = app.model.define('sys_verify_sms_request', {
    mobile: { type: STRING(20), allowNull: false, comment: '手机号' },
    code: { type: STRING(10), allowNull: false, comment: '短信验证码' },
  }, {
    tableName: 'sys_verify_sms_request',
    timestamps: false,
  });
  return SysVerifySmsRequest;
};
