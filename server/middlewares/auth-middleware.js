const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Unauthorization Error");
    }

    const accessToken = authHeader.split(' ')[1];
    if(!accessToken) {
      throw new Error("Unauthorization Error");
    }

    const userData = tokenService.validateAccessToken(accessToken)
    if(!userData) {
      throw new Error("Unauthorization Error");
    }

    req.user = userData
    next()
  } catch (e) {
    return next(e);
  }
};
