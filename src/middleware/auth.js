const { validate } = require("../libs/validate");
const { userRepository } = require("../db/repositories/user");

class AuthMiddleware {
  async validate(req, res, next) {
    try {
      const { email: currentEmail } = req.headers;

      validate.email(currentEmail);

      const user = await userRepository.findByEmail(currentEmail);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      req.user_id = user.user_id;
      req.currentEmail = currentEmail;

      next();
    } catch (err) {
      return res.status(400).json({ error: err?.message });
    }
  }
}

module.exports = { authMiddleware: new AuthMiddleware() };
