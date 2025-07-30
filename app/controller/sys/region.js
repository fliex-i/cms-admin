'use strict';
const Controller = require('../../core/base_controller');
/**
* @controller 省市区三级联动
*/
class RegionController extends Controller {
  /**
   * @summary 获取省市区数据
   * @description 查询所有省市区数据，组装为省-市-区三级联动结构
   * @router get /api/sys/region
   * @response 200 baseRes 成功
   */
  async list() {
    const { ctx } = this;
    try {
      // 查询所有省
      const provinces = await ctx.model.SysProvince.findAll({ raw: true });
      // 查询所有市
      const cities = await ctx.model.SysCity.findAll({ raw: true });
      // 查询所有区县
      const counties = await ctx.model.SysCounty.findAll({ raw: true });

      // 组装市下区县，county: {id, name, county_id, city_id}
      const cityIdToCounties = {};
      for (const county of counties) {

        if (!cityIdToCounties[county.city_id]) cityIdToCounties[county.city_id] = [];
        cityIdToCounties[county.city_id].push(county);
      }
      // 组装省下市，city: {id, name, city_id, province_id, children: [county]}
      const provinceIdToCities = {};
      for (const city of cities) {

        if (!provinceIdToCities[city.province_id]) provinceIdToCities[city.province_id] = [];
        provinceIdToCities[city.province_id].push(city);
      }
      // 组装最终结构，province: {id, name, province_id, children: [city]}
      const result = provinces.map(province => {
        return {
          id: province.id,
          name: province.name,
          province_id: province.province_id,
          children: provinceIdToCities[province.province_id] || [],
        };
      });
      console.log('组装后的省市区数据:', JSON.stringify(result, null, 2));
      this.success(result);
    } catch (e) {
      ctx.logger.error(e);
      this.fail(e.message || '服务器错误');
    }
  }
}
module.exports = RegionController;
