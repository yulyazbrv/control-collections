const itemService = require("../service/item-service");

class ItemController {
  async addItem(req, res, next) {
    try {
      const { name, idCollection } = req.body;
      const item = await itemService.addItem(name, idCollection);
      return res.json(item);
    } catch (e) {
      next(e);
    }
  }

  async removeItem(req, res, next) {
    try {
      const { id } = req.body;
      const item = await itemService.removeItem(id);
      return res.json(item);
    } catch (e) {
      next(e);
    }
  }

  async updateItem(req, res, next) {
    try {
      const { id, name, tags } = req.body;
      const item = await itemService.updateItem(id, name, tags);
      return res.json(item);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ItemController();
