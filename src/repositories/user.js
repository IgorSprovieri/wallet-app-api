const db = require("../db");

class UserRepository {
  async findByEmail({ email }) {
    const query = "SELECT * FROM users WHERE email=$1";
    const values = [email];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async create(name, email, passwordHash) {
    const query =
      "INSERT INTO users(name, email, passwordHash) VALUES($1, $2, $3) RETURNING *";
    const values = [name, email, passwordHash];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async update(newName, newEmail, newPasswordHash, user_id) {
    const query =
      "UPDATE users SET name=$1, email=$2, passwordHash=$3 WHERE user_id=$4 RETURNING *";
    const values = [newName, newEmail, newPasswordHash, user_id];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async delete(user_id) {
    const query = "DELETE FROM users WHERE user_id=$1 RETURNING *";
    const values = [user_id];

    const { rows } = await db.query(query, values);
    return rows[0];
  }
}

module.exports = { userRepository: new UserRepository() };
