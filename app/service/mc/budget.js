'use strict';
const Service = require('egg').Service;

class McBudgetService extends Service {
  async create(data) {
    return await this.ctx.model.McBudget.create(data);
  }
  async findById(id) {
    return await this.ctx.model.McBudget.findByPk(id);
  }
  async update(id, data) {
    return await this.ctx.model.McBudget.update(data, { where: { id } });
  }
  async delete(id) {
    return await this.ctx.model.McBudget.destroy({ where: { id } });
  }
  async list(where = {}) {
    return await this.ctx.model.McBudget.findAll({ where });
  }
}

module.exports = McBudgetService;
