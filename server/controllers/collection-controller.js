const collectionService = require("../service/collection-service");
const fs = require("fs");

class CollectionController {
  async addCollection(req, res, next) {
    try {
      const { email, name, description, theme, customFields } = req.body;
      var img = fs.readFileSync(req.file.path);
      const collection = await collectionService.addCollection(
        email,
        name,
        description,
        theme,
        img,
        customFields
      );
      return res.json(collection);
    } catch (e) {
      next(e);
    }
  }

  async removeCollection(req, res, next) {
    try {
      const { id } = req.body;
      const collection = await collectionService.removeCollection(id);
      return res.json(collection);
    } catch (e) {
      next(e);
    }
  }

  async updateCollection(req, res, next) {
    try {
      const { id, name, description, theme } = req.body;
      const collection = await collectionService.updateCollection(
        id,
        name,
        description,
        theme
      );
      return res.json(collection);
    } catch (e) {
      next(e);
    }
  }

  async getCollections(req, res, next) {
    try {
      const collections = await collectionService.getAllCollections();
      return res.json(collections);
    } catch (e) {
      next(e);
    }
  }

  async getCollectionById(req, res, next) {
    try {
      const { id } = req.query;
      const collection = await collectionService.getCollectionById(id);
      return res.json(collection);
    } catch (e) {
      next(e);
    }
  }

  async getCollectionFields(req, res, next) {
    try {
      const { id } = req.query;
      const collection = await collectionService.getCollectionFields(id);
      return res.json(collection);
    } catch (e) {
      next(e);
    }
  }

  async getUserCollections(req, res, next) {
    try {
      const { email } = req.query;
      const collections = await collectionService.getUserCollections(email);
      return res.json(collections);
    } catch (e) {
      next(e);
    }
  }

  async getFullSearch(req, res, next) {
    try {
      const { searchText } = req.query;
      const collections = await collectionService.fullSearch(searchText);
      return res.json(collections);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CollectionController();
