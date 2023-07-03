const tagService = require("../service/tag-service");

class TagController {
  async addNewTag(req, res, next) {
    try {
      const { nameItem, tag } = req.body;
      const newTag = await tagService.addTag(nameItem, tag);
      return res.json(newTag);
    } catch (e) {
      next(e);
    }
  }

  async deleteTag(req, res, next) {
    try {
      const { nameItem, tag } = req.body;
      const deletedTag = await tagService.removeTag(nameItem, tag);
      return res.json(deletedTag);
    } catch (e) {
      next(e);
    }
  }

  async getTags(req, res, next) {
    try {
      const tags = await tagService.getTags();
      return res.json(tags);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TagController();
