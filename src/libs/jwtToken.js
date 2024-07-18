const jwt = require("jsonwebtoken");

class JwtToken {
  #secret = process.env.JWT_SECRET || "secret";

  generate(user) {
    return jwt.sign({ ...user }, this.#secret, { expiresIn: "1h" });
  }

  decode(token) {
    return jwt.decode(token, this.#secret);
  }
}

return { jwtToken: new JwtToken() };
