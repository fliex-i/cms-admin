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
    ctx.logger.info(ctx.request, '/check file');
    const file = ctx.request.files[0];
    try {
      console.log(file);
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
