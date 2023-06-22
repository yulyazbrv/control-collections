const commentService = require("../service/comment-service");

class CommentController {
  async addComment(req, res, next) {
    try {
      const { email, nameItem, text } = req.body;
      const comment = await commentService.addComment(email, nameItem, text);
      return res.json(comment);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CommentController();
