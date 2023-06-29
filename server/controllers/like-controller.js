const likeService = require("../service/like-service");

class LikeController {
  async addLike(req, res, next) {
    try {
      const { email, id } = req.body;
      const like = await likeService.addLike(email, id);
      return res.json(like);
    } catch (e) {
      next(e);
    }
  }

  async removeLike(req, res, next) {
    try {
      const { email, id } = req.body;
      const like = await likeService.removeLike(email, id);
      return res.json(like);
    } catch (e) {
      next(e);
    }
  }

  async checkLike(req, res, next) {
    try {
      const { email, id } = req.query;
      const like = await likeService.checkLike(email, id);
      return res.json(like);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new LikeController();
