const collectionModel = require("../models/collection-model");
const itemModel = require("../models/item-model");
const tagModel = require("../models/tag-model");

class ItemService {
  async addItem(idCollection, name, tags) {
    const collection = await collectionModel.findOne({ _id: idCollection });
    if (!collection) {
      throw new Error(`Collection with id ${idCollection} isnot exists`);
    }

    const tagsArray = tags
      ? tags.split(" ").filter((tag) => tag.startsWith("#"))
      : [];
    const item = await itemModel.create({
      itemCollection: idCollection,
      name: name,
      tags: tagsArray ? tagsArray : [],
    });

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
    const collection = await collectionModel.findById({
      _id: item.itemCollection,
    });
    collection.items.pull(id);
    await collection.save();

    const deletedItem = await itemModel.deleteOne({ _id: id });
    console.log(deletedItem);
    return deletedItem;
  }

  async updateItem(id, name, tags) {
    const item = await itemModel.findOne({ _id: id });
    if (!item) {
      throw new Error(`Item with id ${id} isnot exists`);
    }
    const filter = { _id: id };
    const tagsArray = tags
      ? tags.split(" ").filter((tag) => tag.startsWith("#"))
      : [];
    const updateDoc = {
      $set: {
        name: name,
        tags: tagsArray ? tagsArray : [],
      },
    };
    const options = { upsert: true };
    const updatedItem = await itemModel.updateOne(filter, updateDoc, options);
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

    if (updatedItem) {
      console.log("Item update succesfully");
      return updatedItem;
    } else {
      throw new Error("Item didnt update");
    }
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

  async getItemsById(id) {
    try {
      if(id === ""){
        return null
      }
      const arrId = id.split(",");
      const items = await itemModel.find({ _id: { $in: arrId } }).populate({
        path: "itemCollection",
        populate: {
          path: "user",
          model: "User",
        },
      });
      return items;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = new ItemService();
