const likeService = require("../service/like-service");

class LikeController {
  async addLike(req, res, next) {
    try {
      const { email, nameItem } = req.body;
      const like = await likeService.addLike(email, nameItem);
      return res.json(like);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new LikeController();
