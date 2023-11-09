const db = require("..");

class CategoryRepository {
  async get(id) {
    const query = "SELECT * FROM categories WHERE user_id=$1";
    const values = [id];

    const { rows } = await db.query(query, values);
    return rows;
  }
}

module.exports = { categoryRepository: new CategoryRepository() };
