const Router = require("express").Router;
const CommentRouter = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
const commentController = require("../controllers/comment-controller");

CommentRouter.post("/addComment", authMiddleware, commentController.addComment);
CommentRouter.get("/getComments", commentController.getComments);

module.exports = CommentRouter;
