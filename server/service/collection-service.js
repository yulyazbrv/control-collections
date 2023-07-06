const collectionModel = require("../models/collection-model");
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
}

module.exports = new CollectionService();
