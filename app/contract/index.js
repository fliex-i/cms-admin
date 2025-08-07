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

};
