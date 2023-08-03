const Router = require("express").Router;
const LikeRouter = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
const likeController = require("../controllers/like-controller");

LikeRouter.post("/addLike", authMiddleware, likeController.addLike);
LikeRouter.delete("/removeLike", authMiddleware, likeController.removeLike);
LikeRouter.get("/checkLike", likeController.checkLike);

module.exports = LikeRouter;
