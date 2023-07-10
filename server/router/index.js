const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const loginMiddleware = require("../middlewares/login-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const tagController = require("../controllers/tag-controller");
const likeController = require("../controllers/like-controller");
const itemController = require("../controllers/item-controller");
const collectionController = require("../controllers/collection-controller");
const commentController = require("../controllers/comment-controller");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 1, max: 100 }),
  userController.registration
);

router.post("/registration", userController.registration);
router.post("/login", loginMiddleware, userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, adminMiddleware, userController.getUsers);
router.delete(
  "/deleteUser",
  authMiddleware,
  adminMiddleware,
  userController.removeUser
);
router.put("/block", authMiddleware, adminMiddleware, userController.blockUser);
router.put(
  "/unblock",
  authMiddleware,
  adminMiddleware,
  userController.unblockUser
);
router.put(
  "/addAdmin",
  authMiddleware,
  adminMiddleware,
  userController.addNewAdmin
);
router.put(
  "/removeAdmin",
  authMiddleware,
  adminMiddleware,
  userController.deleteAdmin
);
router.post("/addTag", authMiddleware, tagController.addNewTag);
router.get("/getTags", tagController.getTags);
router.delete("/deleteTag", authMiddleware, tagController.deleteTag);
router.post("/addLike", authMiddleware, likeController.addLike);
router.delete("/removeLike", authMiddleware, likeController.removeLike);
router.get("/checkLike", likeController.checkLike);
router.post("/addItem", authMiddleware, itemController.addItem);
router.put("/updateItem", authMiddleware, itemController.updateItem);
router.delete("/deleteItem", authMiddleware, itemController.removeItem);
router.post(
  "/addCollection",
  authMiddleware,
  collectionController.addCollection
);
router.put(
  "/updateCollection",
  authMiddleware,
  collectionController.updateCollection
);
router.delete(
  "/deleteCollection",
  authMiddleware,
  collectionController.removeCollection
);
router.post("/addComment", authMiddleware, commentController.addComment);
router.get("/getComments", commentController.getComments);
router.get("/getCollections", collectionController.getCollections);
router.get("/getFullSearch", collectionController.getFullSearch);
router.get("/getCollectionById", collectionController.getCollectionById);
router.get(
  "/getUserCollections",
  authMiddleware,
  collectionController.getUserCollections
);
router.get("/getItems", itemController.getAllItems);
router.get("/getItemsByTag", itemController.getItemsByTag);
router.get("/getItemsById", itemController.getItemsById);
router.get("/getCollectionItems", itemController.getCollectionItems);

module.exports = router;
