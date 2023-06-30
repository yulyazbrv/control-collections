const itemModel = require("../models/item-model");
const likeModel = require("../models/like-model");
const userModel = require("../models/user-model");

class LikeService {
  async addLike(email, id) {
    const candidate = await userModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} isnot exists`);
    }

    const item = await itemModel.findOne({_id: id});
    if (!item) {
      throw new Error(`Item with id ${id} doesnt exists`);
    }

    const like = await likeModel.create({
      user: candidate._id,
      item: item._id,
    });
    item.likes.push(like);
    await item.save();
    return like;
  }

  async removeLike(email, id) {
    const candidate = await userModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} doesnt exists`);
    }

    const item = await itemModel.findOne({_id: id});
    if (!item) {
      throw new Error(`Item with id ${id} doesnt exists`);
    }

    const like = await likeModel.deleteOne({
      user: candidate._id,
      item: item._id,
    });
    item.likes = item.likes.filter((like) => like.user && like.user.toString() !== candidate._id.toString());
    await item.save();
    return like;
  }

  async checkLike(email, id){
    const candidate = await userModel.findOne({ email });
    if (!candidate) {
      return false
    }
    
    const like = await likeModel.findOne({item: id, user: candidate._id})
    if(like){
      return true
    }else {
      return false
    }
  }
}

module.exports = new LikeService();
