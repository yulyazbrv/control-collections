const userService = require("../service/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const userData = await userService.registration(name, email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        // secure: true,
        // sameSite: "none",
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        // secure: true,
        // sameSite: "none",//for deploy
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(refreshToken);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        // secure: true,
        // sameSite: "none",
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async removeUser(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.removeUser(email);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async blockUser(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.blockUser(email);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async unblockUser(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.unblockUser(email);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async addNewAdmin(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.addAdmin(email);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async deleteAdmin(req, res, next) {
    try {
      const { email } = req.body;
      const user = await userService.removeAdmin(email);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async isAdmin(req, res, next) {
    try {
      const { email } = req.query;
      const checkAdmin = await userService.isAdmin(email);
      return res.json(checkAdmin);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
