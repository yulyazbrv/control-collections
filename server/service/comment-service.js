const commentModel = require("../models/comment-model");
const itemModel = require("../models/item-model");
const userModel = require("../models/user-model");

class CommentService {
  async addComment(email, id, text) {
    const candidate = await userModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} doesnt exists`);
    }

    const item = await itemModel.findOne({ _id: id });
    if (!item) {
      throw new Error(`Item with id ${id} doesnt exists`);
    }

    const date = new Date();
    const comment = await commentModel.create({
      user: candidate._id,
      item: item._id,
      message: text,
      creation_date: date.toLocaleString('en-US'),
    });

    item.comments.push(comment);
    await item.save();
    return comment;
  }

  async getComments(id) {
    const item = await itemModel.findOne({ _id: id });
    if (!item) {
      throw new Error(`Item with id ${id} doesnt exists`);
    }

    const comments = await commentModel.find({ item: item }).populate("user");
    return comments;
  }
}

module.exports = new CommentService();
