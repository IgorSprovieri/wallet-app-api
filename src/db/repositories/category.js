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

  async findById(category_id) {
    const query = "SELECT * FROM categories WHERE category_id=$1 ";
    const values = [category_id];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async create(user_id, name, color, icon_url) {
    const query =
      "INSERT INTO categories(user_id, name, color, icon_url) VALUES($1, $2, $3, $4) RETURNING *";
    const values = [user_id, name, color, icon_url];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async update(newName, newColor, newIcon_url, category_id) {
    const query =
      "UPDATE categories SET name=$1, color=$2, icon_url=$3 WHERE category_id=$4 RETURNING *";
    const values = [newName, newColor, newIcon_url, category_id];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async delete(category_id) {
    const query = "DELETE FROM categories WHERE category_id=$1 RETURNING *";
    const values = [category_id];

    const { rows } = await db.query(query, values);
    return rows[0];
  }
}

module.exports = { categoryRepository: new CategoryRepository() };
