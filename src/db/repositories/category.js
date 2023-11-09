const db = require("..");

class CategoryRepository {
  async get(user_id) {
    const query = "SELECT * FROM categories WHERE user_id=$1";
    const values = [user_id];

    const { rows } = await db.query(query, values);
    return rows;
  }

  async findByName(name) {
    const query = "SELECT * FROM categories WHERE name=$1 ";
    const values = [name];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async create(user_id, name, icon_url) {
    const query =
      "INSERT INTO categories(user_id, name, icon_url) VALUES($1, $2, $3) RETURNING *";
    const values = [user_id, name, icon_url];

    const { rows } = await db.query(query, values);
    return rows[0];
  }
}

module.exports = { categoryRepository: new CategoryRepository() };
