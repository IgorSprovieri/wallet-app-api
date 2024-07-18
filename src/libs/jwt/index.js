const jwt = require("jsonwebtoken");

class JwtToken {
  #secret = process.env.JWT_SECRET || "secret";

  generate(user) {
    return jwt.sign({ ...user }, this.#secret, { expiresIn: "1h" });
  }

  async decode(token) {
    await jwt.verify(token, process.env.JWT_HASH);
  }
}

return { jwtToken: new JwtToken() };
