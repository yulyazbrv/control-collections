const Router = require("express").Router;
const TagRouter = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
const tagController = require("../controllers/tag-controller");

TagRouter.post("/addTag", authMiddleware, tagController.addNewTag);
TagRouter.get("/getTags", tagController.getTags);
TagRouter.delete("/deleteTag", authMiddleware, tagController.deleteTag);

module.exports = TagRouter;
