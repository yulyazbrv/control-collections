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

    const deletedCollection = await collectionModel
      .deleteOne({ _id: id })
      .then(() => {
        console.log("Collection deleted succesfully");
        return deletedCollection;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async updateCollection(id, name, description, theme) {
    const collection = await collectionModel.findOne({ _id: id });
    if (!collection) {
      throw new Error(`Collection with id ${id} isnot exists`);
    }
    const filter = { _id: id };
    const updateDoc = {
      $set: {
        name: name ? name : collection.name,
        description: description ? description : collection.description,
        theme: theme ? theme : collection.theme,
      },
    };
    const options = { upsert: true };
    const updateCollection = await collectionModel
      .updateOne({ filter, updateDoc, options })
      .then(() => {
        console.log("Collection update succesfully");
        return updateCollection;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async getAllCollections() {
    const collections = await collectionModel.find();
    return collections;
  }

  async getUserCollections(email) {
    const candidate = await userModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} does not exist`);
    }
    const collections = await collectionModel.find({ user: candidate._id });
    return collections;
  }
}

module.exports = new CollectionService();
