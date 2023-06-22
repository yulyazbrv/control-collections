const itemModel = require("../models/item-model");
const likeModel = require("../models/like-model");
const userModel = require("../models/user-model");

class LikeService {
  async addLike(email, nameItem) {
    const candidate = await userModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} isnot exists`);
    }

    const item = itemModel.findOne(nameItem);
    if (!item) {
      throw new Error(`Item with name ${nameItem} isnot exists`);
    }

    const like = await likeModel.create({
      user: candidate._id,
      item: item._id,
    });
    item.likes.push(like);
    await item.save();
    return like;
  }
}

module.exports = new LikeService();
