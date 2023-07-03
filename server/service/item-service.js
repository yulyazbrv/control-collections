const collectionModel = require("../models/collection-model");
const itemModel = require("../models/item-model");
const tagModel = require("../models/tag-model");

class ItemService {
  async addItem(idCollection, name, tags) {
    const collection = await collectionModel.findOne({ _id: idCollection });
    if (!collection) {
      throw new Error(`Collection with id ${idCollection} isnot exists`);
    }

    const item = await itemModel.create({
      itemCollection: idCollection,
      name: name,
      tags: tagsArray ? tagsArray : [],
    });

    const tagsArray = tags.split(" ").filter((tag) => tag.startsWith("#"));
    if (tagsArray.length) {
      const createTags = async () => {
        try {
          for (const tag of tagsArray) {
            await tagModel.create({ name: tag, item: item._id });
          }
        } catch (e) {
          console.error(e.message);
        }
      };

      createTags();
    }
    collection.items.push(item);
    await collection.save();
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
    const items = await itemModel.find().populate({
      path: "itemCollection",
      populate: {
        path: "user",
        model: "User",
      },
    });
    return items;
  }

  async getItemsByTag(tag) {
    const items = await itemModel.find({ tags: { $in: [tag] } }).populate({
      path: "itemCollection",
      populate: {
        path: "user",
        model: "User",
      },
    });
    return items;
  }

  async getCollectionItems(id) {
    const collection = await collectionModel.findOne({ _id: id });
    if (!collection) {
      throw new Error(`Collection with ${id} does not exist`);
    }
    const items = await itemModel
      .find({ itemCollection: collection._id })
      .populate({
        path: "itemCollection",
        populate: {
          path: "user",
          model: "User",
        },
      });
    return items;
  }
}

module.exports = new ItemService();
