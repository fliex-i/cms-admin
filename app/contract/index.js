'use strict';
module.exports = {
  token: {
    token: { type: 'string', description: '用户token', required: true, example: 'fdsafaslfjdsafjdadsafkjhfjdakj' },
  },
  baseRes: {
    status: { type: 'integer', required: true, example: 0 },
    data: { type: 'string', required: true, example: '请求成功' },
    msg: { type: 'string', required: true, example: 'ok' },
  },
  sys_send_sms_request: [
    { name: 'mobile', type: 'string', required: true, comment: '手机号' },
  ],
  sys_verify_sms_request: {
    mobile: { type: 'string', required: true, comment: '手机号' },
    code: { type: 'string', required: true, comment: '验证码' },
  },
};
