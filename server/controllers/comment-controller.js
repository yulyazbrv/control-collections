const commentService = require("../service/comment-service");

class CommentController {
  async addComment(req, res, next) {
    try {
      const { email, id, text } = req.body;
      const comment = await commentService.addComment(email, id, text);
      return res.json(comment);
    } catch (e) {
      next(e);
    }
  }

  async getComments(req, res, next) {
    try {
      const { id } = req.query;
      const comments = await commentService.getComments(id);
      return res.json(comments);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CommentController();
