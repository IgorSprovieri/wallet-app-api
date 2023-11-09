const db = require("..");

class UserRepository {
  async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email=$1";
    const values = [email];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async create(name, email) {
    const query = "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *";
    const values = [name, email];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async update(newName, newEmail, user_id) {
    const query =
      "UPDATE users SET name=$1, email=$2 WHERE user_id=$3 RETURNING *";
    const values = [newName, newEmail, user_id];

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
