const UserModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  try {
    const {email} = req.body;
    const candidate = await UserModel.findOne({ email });
    if (!candidate) {
      throw new Error(`User with ${email} is not exists`);
    }
    const adminStatus = candidate.isAdmin;
    if (!adminStatus) {
      throw new Error("User isnot admin");
    }

    next()
  } catch (e) {
    return next(e);
  }
};
