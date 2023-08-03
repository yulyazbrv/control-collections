const itemModel = require("../models/item-model");
const tagModel = require("../models/tag-model");

class TagService {
  async removeTag(nameItem, tag) {
    const item = itemModel.findOne(nameItem);
    if (!item) {
      throw new Error(`Item with name ${nameItem} isnot exists`);
    }
    const removedTag = item.tags.indexOf(tag);
    if (removedTag === -1) {
      throw new Error(`Tag with name ${nameItem} isnot exists`);
    }

    item.tags.splice(index, 1);
    await item.save();
    return item;
  }

  async getTags() {
    const tags = await tagModel.find().populate("item");
    return tags;
  }
}

module.exports = new TagService();
