const collectionModel = require("../models/collection-model");
const commentModel = require("../models/comment-model");
const itemModel = require("../models/item-model");
const userModel = require("../models/user-model");

class CollectionService {
  async addCollection(email, name, description, theme) {
    const candidate = await userModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} does not exist`);
    }

    const collection = await collectionModel.create({
      user: candidate._id,
      name: name,
      description: description,
      theme: theme,
    });

    return collection;
  }

  async removeCollection(id) {
    const collection = await collectionModel.findOne({ _id: id });
    if (!collection) {
      throw new Error(`Collection with id ${id} isnot exists`);
    }

    const deletedCollection = await collectionModel.deleteOne({ _id: id });
    return deletedCollection;
  }

  async updateCollection(id, name, description, theme) {
    const collection = await collectionModel.findOne({ _id: id });
    if (!collection) {
      throw new Error(`Collection with id ${id} isnot exists`);
    }
    const filter = { _id: id };
    const updateDoc = {
      $set: {
        name: name,
        description: description,
        theme: theme,
      },
    };
    const options = { upsert: true };
    const updatedCollection = await collectionModel.updateOne(
      filter,
      updateDoc,
      options
    );
    if (updatedCollection) {
      console.log("Collection update succesfully");
      return updatedCollection;
    } else {
      throw new Error("Collection didnt update");
    }
  }

  async getAllCollections() {
    const collections = await collectionModel.find().populate("user");
    return collections;
  }

  async getCollectionById(id) {
    const collection = await collectionModel
      .findOne({ _id: id })
      .populate("user");
    return collection;
  }

  async getUserCollections(email) {
    const candidate = await userModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} does not exist`);
    }
    const collections = await collectionModel
      .find({ user: candidate._id })
      .populate("user");
    return collections;
  }

  async fullSearch(searchText) {
    const query = { $text: { $search: searchText } };
    const queryCollection = {
      $or: [
        { name: { $regex: searchText, $options: "i" } },
        { description: { $regex: searchText, $options: "i" } },
        { theme: { $regex: searchText, $options: "i" } },
      ],
    };
    const itemsIdArray = [];
    const collections = await collectionModel.find(queryCollection);
    console.log(JSON.stringify(collections));
    if (collections.length !== 0) {
      collections.forEach((collection) => {
        if (collection.items.length !== 0) {
          const itemIds = collection.items.map((item) => item.toString());
          itemsIdArray.push(...itemIds);
        }
      });
    }

    const items = await itemModel.find(query);
    if (items.length !== 0) {
      items.forEach((item) => itemsIdArray.push(item._id.toString()));
    }

    const comments = await commentModel.find(query);
    if (comments.length !== 0) {
      comments.forEach((comment) => itemsIdArray.push(comment.item.toString()));
    }

    const uniqueItemsIdArray = Array.from(new Set(itemsIdArray));

    return uniqueItemsIdArray;
  }
}

module.exports = new CollectionService();
