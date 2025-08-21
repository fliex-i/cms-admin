/* eslint-disable jsdoc/check-tag-names */
'use strict';
const Controller = require('../../core/base_controller');
// 新版阿里云短信SDK
// const Dysmsapi20170525 = require('@alicloud/dysmsapi20170525');
// const OpenApi = require('@alicloud/openapi-client');
// const Util = require('@alicloud/tea-util');
// const Credential = require('@alicloud/credentials');
// const OpenApiUtil = require('@alicloud/openapi-util');
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
    let { mobile, password } = ctx.request.body;
    password = ctx.helper.cipher(password);
    const member = await ctx.model.McMember.findOne({
      where: {
        mobile,
        password,
      },
    });
    if (member) {
      const token = ctx.helper.generateToken(member);
      // 设置 Session
      ctx.logger.info('登录成功，设置 Session:', { token, memberId: member.id, session: ctx.session });
      // 确保 session 已经初始化并且可以设置
      ctx.session.mcToken = token;
      if (typeof ctx.session.save === 'function') {
        await ctx.session.save(); // 强制保存 session（部分框架需要）
      }
      ctx.logger.info('member:', member);
      this.success({ ...member.dataValues, token }, '登录成功');
    } else {
      this.fail('手机号或密码错误');
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
      this.fail('账户已存在，请登录！');
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
}
module.exports = IndexController;
