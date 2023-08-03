const Router = require("express").Router;
const CollectionRouter = new Router();
const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const collectionController = require("../controllers/collection-controller");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "/tmp/upload",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
CollectionRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 1, max: 100 }),
  userController.registration
);

CollectionRouter.get("/getCollections", collectionController.getCollections);
CollectionRouter.get("/getFullSearch", collectionController.getFullSearch);
CollectionRouter.get("/getCollectionById", collectionController.getCollectionById);
CollectionRouter.get("/getCollectionFields", collectionController.getCollectionFields);

CollectionRouter.get(
  "/getUserCollections",
  authMiddleware,
  collectionController.getUserCollections
);

CollectionRouter.post(
  "/addCollection",
  upload.single("image"),
  authMiddleware,
  collectionController.addCollection
);
CollectionRouter.put(
  "/updateCollection",
  authMiddleware,
  collectionController.updateCollection
);
CollectionRouter.delete(
  "/deleteCollection",
  authMiddleware,
  collectionController.removeCollection
);

module.exports = CollectionRouter;
