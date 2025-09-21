'use strict';
const Controller = require('../../core/base_controller');

class UploadController extends Controller {
  /**
   * @summary 图片上传
   * @description 上传图片，返回图片地址
   * @router post /cms/upload
   * @request formData file file 图片文件
   * @response 200 baseRes desc
   */
  async image() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    try {
      // 限制图片大小最大500kb
      if (file && file.size > 500 * 1024) {
        // throw new Error('图片大小不能超过500KB');
        this.fail('图片大小不能超过500KB');
      }
      const upload = await ctx.service.sys.objectStorage.upload({}, file);
      if (upload && upload.url) {
        this.success({ url: upload.url, message: '上传成功' });
      } else {
        throw new Error('上传失败');
      }
    } catch (e) {
      ctx.logger.error(e);
      this.fail(e.message || '上传失败');
    } finally {
      if (file && file.filepath) {
        const fs = require('fs/promises');
        await fs.unlink(file.filepath);
      }
    }
  }

  /**
   * @summary 视频上传
   * @description 上传视频，返回视频地址
   * @router post /cms/upload/video
   * @request formData file file 视频文件
   * @response 200 baseRes desc
   */
  async video() {
    const { ctx } = this;
    ctx.logger.info(ctx.request, '/check video file');
    const file = ctx.request.files[0];
    try {
      // 检查文件类型，仅允许 mp4
      if (!file || !file.filename || !file.filename.toLowerCase().endsWith('.mp4')) {
        throw new Error('只允许上传 mp4 格式视频');
      }
      const upload = await ctx.service.sys.objectStorage.upload({}, file);
      if (upload && upload.url) {
        this.success({ url: upload.url, message: '上传成功' });
      } else {
        throw new Error('上传失败');
      }
    } catch (e) {
      ctx.logger.error(e);
      this.fail(e.message || '上传失败');
    } finally {
      if (file && file.filepath) {
        const fs = require('fs/promises');
        await fs.unlink(file.filepath);
      }
    }
  }
}
module.exports = UploadController;
