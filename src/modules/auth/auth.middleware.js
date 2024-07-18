const { jwtToken } = require("../../libs");
const { userRepository } = require("../user/user.repository");

class AuthMiddleware {
  async validate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = await jwtToken.decode(token);

      const foundUser = await userRepository.findById(decoded?.userId);
      if (!foundUser) {
        return res.status(404).json({ error: "User not found" });
      }

      req.user = { ...foundUser };

      next();
    } catch (error) {
      return res.status(403).json({ error: "Unauthorized" });
    }
  }
}

module.exports = { authMiddleware: new AuthMiddleware() };
