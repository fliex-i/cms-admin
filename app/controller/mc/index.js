/* eslint-disable jsdoc/check-tag-names */
'use strict';
const Controller = require('../../core/base_controller');
const path = require('path');
const { Op } = require('sequelize');
const Core = require('@alicloud/pop-core');

/**
* @controller MC会员中心入口
*/
class IndexController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.meta_title = '会员中心';
    await ctx.render('mc/index');
  }
  /**
  * @summary MC登录页面
  * @description MC登录页面
  * @router get /mc/login
  * @response 200 baseRes desc
  */
  async login() {
    const { ctx } = this;
    await ctx.render('mc/login');
  }
  /**
  * @summary 登录接口
  * @description 登录接口
  * @router post /mc/loginPost
  * @request body mc_member_add *body desc
  * @response 200 baseRes desc
  */
  async lginPost() {
    const { ctx } = this;
    let { username, password } = ctx.request.body;
    password = ctx.helper.cipher(password);
    const member = await ctx.model.McMember.findOne({
      where: {
        username,
        password,
      },
    });
    if (member) {
      const token = ctx.helper.generateToken(member);
      // 设置 Session
      ctx.session.mcToken = token;
      this.success(null, '登录成功');
    } else {
      this.fail('账号密码错误');
    }
  }
  /**
  * @summary 用户注册
  * @description 用户中心注册
  * @router post /mc/signup
  * @request body mc_member_add *body desc
  * @response 200 baseRes desc
  */
  async signup() {
    const { ctx } = this;
    const data = ctx.request.body;
    data.password = ctx.helper.cipher(data.password);
    const [ member, created ] = await ctx.model.McMember.findOrCreate({
      where: { username: data.username, email: data.email, mobile: data.mobile },
      defaults: data,
    });
    if (created) {
      this.success(member, '恭喜您注册成功，请登录！');
    } else {
      this.fail('用户名，手机号，邮箱 重复,请重试！');
    }
  }
  /**
  * @summary 退出登录
  * @description 退出登录
  * @router get /mc/logout
  * @response 200 baseRes desc
  */
  async logout() {
    const { ctx } = this;
    const { url } = ctx.query;
    ctx.session.mcToken = null;
    ctx.redirect(url ? url : '/');
  }
  /**
  * @summary 验证用户手机短信
  * @description 验证用户手机短信验证码
  * @router post /mc/verifySms
  * @request body sys_verify_sms_request *body desc
  * @response 200 baseRes desc
  */
  async verifySms() {
    const { ctx } = this;
    const { mobile, code } = ctx.request.body;
    // 这里假设验证码存储在 redis 或 session，实际可根据业务调整
    // const cacheCode = await ctx.app.redis.get(`sms:code:${mobile}`);
    const cacheCode = ctx.session[`sms_code_${mobile}`];
    if (!cacheCode) {
      return this.fail('验证码已过期或未发送');
    }
    if (String(code) === String(cacheCode)) {
      this.success(null, '验证通过');
    } else {
      this.fail('验证码错误');
    }
  }
  /**
  * @summary 发送短信验证码
  * @description 发送短信验证码到用户手机，接入阿里云短信服务
  * @router post /mc/sendSms
  * @request body sys_send_sms_request *body desc
  * @response 200 baseRes desc
  */
  async sendSms() {
    const { ctx, app } = this;
    const { mobile } = ctx.request.body;
    if (!mobile) return this.fail('手机号不能为空');
    // 生成6位验证码
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    // 阿里云短信配置
    const accessKeyId = app.config.aliyunSms.accessKeyId;
    const accessKeySecret = app.config.aliyunSms.accessKeySecret;
    const signName = app.config.aliyunSms.signName;
    const templateCode = app.config.aliyunSms.templateCode;

    const client = new Core({
      accessKeyId,
      accessKeySecret,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25',
    });
    const params = {
      PhoneNumbers: mobile,
      SignName: signName,
      TemplateCode: templateCode,
      TemplateParam: JSON.stringify({ code }),
    };
    const requestOption = { method: 'POST' };
    try {
      const result = await client.request('SendSms', params, requestOption);
      if (result.Code === 'OK') {
        // 存储验证码到 session（可换成 redis）
        ctx.session[`sms_code_${mobile}`] = code;
        // 设置有效期5分钟
        setTimeout(() => { ctx.session[`sms_code_${mobile}`] = null; }, 5 * 60 * 1000);
        this.success(null, '验证码发送成功');
      } else {
        this.fail(result.Message || '短信发送失败');
      }
    } catch (e) {
      ctx.logger.error(e);
      this.fail('短信服务异常');
    }
  }
}
module.exports = IndexController;
