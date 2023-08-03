const UserRouter = new Router();
const { body } = require("express-validator");
const userController = require("../controllers/user-controller");
const loginMiddleware = require("../middlewares/login-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

UserRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 1, max: 100 }),
  userController.registration
);
UserRouter.post("/login", loginMiddleware, userController.login);
UserRouter.post("/logout", userController.logout);
UserRouter.get("/refresh", userController.refresh);
UserRouter.get("/users", authMiddleware, userController.getUsers);
UserRouter.get("/isAdmin", authMiddleware, userController.isAdmin);
UserRouter.delete("/deleteUser", authMiddleware, userController.removeUser);
UserRouter.put("/block", authMiddleware, userController.blockUser);
UserRouter.put("/unblock", authMiddleware, userController.unblockUser);
UserRouter.put("/addAdmin", authMiddleware, userController.addNewAdmin);
UserRouter.put("/removeAdmin", authMiddleware, userController.deleteAdmin);

module.exports = UserRouter;
