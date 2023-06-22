const commentModel = require("../models/comment-model");
const itemModel = require("../models/item-model");
const userModel = require("../models/user-model");

class CommentService {
  async addComment(email, nameItem, text) {
    const candidate = await userModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} isnot exists`);
    }

    const item = itemModel.findOne(nameItem);
    if (!item) {
      throw new Error(`Item with name ${nameItem} isnot exists`);
    }

    const date = new Date();
    const comment = await commentModel.create({
      user: candidate._id,
      item: item._id,
      message: text,
      creation_date: date.getFullYear(),
    });

    item.comments.push(comment);
    await item.save();
    return comment;
  }
}

module.exports = new CommentService();
