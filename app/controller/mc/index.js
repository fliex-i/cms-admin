/* eslint-disable jsdoc/check-tag-names */
'use strict';
const Controller = require('../../core/base_controller');
// 新版阿里云短信SDK
const Dysmsapi20170525 = require('@alicloud/dysmsapi20170525');
const OpenApi = require('@alicloud/openapi-client');
const Util = require('@alicloud/tea-util');
const Credential = require('@alicloud/credentials');
const OpenApiUtil = require('@alicloud/openapi-util');
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
  * @description 验证用户手机短信验证码（阿里云新版SDK callApi 方式）
  * @router post /mc/verifySms
  * @request body sys_verify_sms_request *body desc
  * @response 200 baseRes desc
  */
  async verifySms() {
    const { ctx } = this;
    const { mobile, code } = ctx.request.body;
    ctx.logger.info('[verifySms] params:', { mobile, code });

    // 无AK免密方式，使用默认凭据
    const credential = new Credential();
    const config = new OpenApi.Config({
      credential,
      endpoint: 'dysmsapi.aliyuncs.com',
    });
    const client = new OpenApi(config);

    const params = new OpenApi.Params({
      action: 'ValidPhoneCode',
      version: '2017-05-25',
      protocol: 'HTTPS',
      method: 'POST',
      authType: 'AK',
      style: 'RPC',
      pathname: '/',
      reqBodyType: 'json',
      bodyType: 'json',
    });
    const queries = {
      PhoneNo: mobile,
      CertifyCode: code,
    };
    const runtime = new Util.RuntimeOptions({});
    const request = new OpenApi.OpenApiRequest({
      query: OpenApiUtil.query(queries),
    });
    try {
      const result = await client.callApi(params, request, runtime);
      ctx.logger.info('[verifySms] result:', result.body);
      if (result.body && result.body.Code === 'OK') {
        this.success(null, '验证通过');
      } else {
        this.fail(result.body && result.body.Message ? result.body.Message : '验证码错误');
      }
    } catch (e) {
      ctx.logger.error(e);
      this.fail(e.message || '验证码校验失败');
    }
  }
  /**
  * @summary 发送短信验证码
  * @description 发送短信验证码到用户手机，接入阿里云短信服务（callApi方式）
  * @router post /mc/sendSms
  * @request body sys_send_sms_request *body desc
  * @response 200 baseRes desc
  */
  async sendSms() {
    const { ctx } = this;
    const { mobile } = ctx.request.body;
    ctx.logger.info('[sendSms] params:', ctx.request);
    if (!mobile) return this.fail('手机号不能为空');

    // 无AK免密方式，使用默认凭据
    const credential = new Credential();
    const config = new OpenApi.Config({
      credential,
      endpoint: 'dysmsapi.aliyuncs.com',
    });
    const client = new OpenApi(config);

    const params = new OpenApi.Params({
      action: 'RequiredPhoneCode',
      version: '2017-05-25',
      protocol: 'HTTPS',
      method: 'POST',
      authType: 'AK',
      style: 'RPC',
      pathname: '/',
      reqBodyType: 'json',
      bodyType: 'json',
    });
    const queries = {
      PhoneNo: mobile,
    };
    const runtime = new Util.RuntimeOptions({});
    const request = new OpenApi.OpenApiRequest({
      query: OpenApiUtil.query(queries),
    });
    try {
      const result = await client.callApi(params, request, runtime);
      ctx.logger.info('[sendSms] result:', result.body);
      if (result.body && result.body.Code === 'OK') {
        this.success(null, '验证码发送成功');
      } else {
        this.fail(result.body && result.body.Message ? result.body.Message : '短信发送失败');
      }
    } catch (e) {
      ctx.logger.error(e);
      this.fail('短信服务异常');
    }
  }
}
module.exports = IndexController;
