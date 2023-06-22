const itemModel = require("../models/item-model");
const tagModel = require("../models/tag-model");

class TagService {
  async addTag(nameItem, tag) {
    const item = itemModel.findOne(nameItem);
    if (!item) {
      throw new Error(`Item with name ${nameItem} isnot exists`);
    }
    const tagObj = await tagModel.findOne({ name: tag });
    if (!tagObj) {
      tagObj = await tagModel.create({ item: item._id, name: tag });
    }
    item.tags.push(tag);
    await item.save();
    return item;
  }

  async removeTag(nameItem, tag) {
    //хз как со связями при удалении тега
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
}

module.exports = new TagService();
