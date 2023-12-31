const itemService = require("../service/item-service");

class ItemController {
  async addItem(req, res, next) {
    try {
      const { itemCollection, name, tags } = req.body;
      const item = await itemService.addItem(itemCollection, name, tags);
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

  async getAllItems(req, res, next) {
    try {
      const items = await itemService.getAllItems();
      return res.json(items);
    } catch (e) {
      next(e);
    }
  }

  async getItemsByTag(req, res, next) {
    try {
      const { tag } = req.query;
      const items = await itemService.getItemsByTag(decodeURIComponent(tag));
      return res.json(items);
    } catch (e) {
      next(e);
    }
  }

  async getCollectionItems(req, res, next) {
    try {
      const { _id } = req.query;
      const items = await itemService.getCollectionItems(_id);
      return res.json(items);
    } catch (e) {
      next(e);
    }
  }

  async getItemsById(req, res, next) {
    try {
      const { id } = req.query;
      const items = await itemService.getItemsById(id);
      return res.json(items);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ItemController();
