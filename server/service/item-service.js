const collectionModel = require("../models/collection-model");
const itemModel = require("../models/item-model");

class ItemService {
  async addItem(name, idCollection) {
    const collection = await collectionModel.findOne({ _id: idCollection });
    if (!collection) {
      throw new Error(`Collection with id ${idCollection} isnot exists`);
    }

    const item = await itemModel.create({
      itemCollection: idCollection,
      name: name,
    });

    return item;
  }

  async removeItem(id) {
    const item = await itemModel.findOne({ _id: id });
    if (!item) {
      throw new Error(`Item with id ${id} isnot exists`);
    }

    const deletedItem = await collectionModel
      .deleteOne({ _id: id })
      .then(() => {
        console.log("Item deleted succesfully");
        return deletedItem;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async updateItem(id, name, tags) {
    const item = await itemModel.findOne({ _id: id });
    if (!item) {
      throw new Error(`Item with id ${id} isnot exists`);
    }
    const filter = { _id: id };
    const updateDoc = {
      $set: {
        name: name ? name : item.name,
        tags: tags ? tags : item.tags,
      },
    };
    const options = { upsert: true };
    const updatedItem = await itemModel
      .updateOne({ filter, updateDoc, options })
      .then(() => {
        console.log("Item update succesfully");
        return updatedItem;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async getAllItems() {
    const items = await itemModel.find();
    return items;
  }
}

module.exports = new ItemService();
