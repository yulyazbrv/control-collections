const Router = require("express").Router;
const ItemRouter = new Router();
const itemController = require("../controllers/item-controller");

ItemRouter.post("/addItem", authMiddleware, itemController.addItem);
ItemRouter.put("/updateItem", authMiddleware, itemController.updateItem);
ItemRouter.delete("/deleteItem", authMiddleware, itemController.removeItem);
ItemRouter.get("/getItems", itemController.getAllItems);
ItemRouter.get("/getItemsByTag", itemController.getItemsByTag);
ItemRouter.get("/getItemsById", itemController.getItemsById);
ItemRouter.get("/getCollectionItems", itemController.getCollectionItems);

module.exports = ItemRouter;
