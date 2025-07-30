'use strict';
module.exports = app => {
  const { STRING } = app.Sequelize;
  // 发送短信验证码请求模型（仅用于接口文档/校验，无实际表）
  const SysSendSmsRequest = app.model.define('sys_send_sms_request', {
    mobile: { type: STRING(20), allowNull: false, comment: '手机号' },
  }, {
    tableName: 'sys_send_sms_request',
    timestamps: false,
  });
  return SysSendSmsRequest;
};
