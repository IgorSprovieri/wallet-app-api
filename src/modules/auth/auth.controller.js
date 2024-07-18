const bcrypt = require("bcrypt");
const { userRepository } = require("../user/user.repository");
const { validate, jwtToken } = require("../../libs");

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      validate.email(email);
      validate.password(password);
    } catch (err) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const foundUser = await userRepository.findByEmail(email);
      if (!foundUser) {
        return res.status(401).json({ error: "User or password is invalid" });
      }

      const { passwordHash, ...user } = foundUser;

      const isPasswordValid = await bcrypt.compare(password, passwordHash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "User or password is invalid" });
      }

      const token = jwtToken.generate(user);

      return res.status(200).json({ token: token, ...user });
    } catch (err) {
      return res.status(500).json({ error: err?.message });
    }
  }
}

module.exports = { authController: new AuthController() };
