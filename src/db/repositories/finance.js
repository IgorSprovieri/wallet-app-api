const db = require("..");

class FinanceRepository {
  async create(user_id, category_id, title, date, value) {
    const query =
      "INSERT INTO finances(user_id, category_id, date, title, value) VALUES($1, $2, $3, $4, $5 ) RETURNING *";
    const values = [user_id, category_id, title, date, value];

    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async get(user_id, initialtDate, finalDate) {
    const query =
      "SELECT fin.title, fin.date, fin.user_id, fin.category_id, cat.name FROM finances as fin JOIN categories as cat ON fin.category_id = cat.category_id WHERE fin.user_id=$1 AND fin.date BETWEEN $2 AND $3 ORDER BY fin.date ASC";
    const values = [user_id, initialtDate, finalDate];

    const { rows } = await db.query(query, values);
    return rows;
  }

  async findById(finance_id) {
    const { rows } = await db.query(
      "SELECT * FROM finances WHERE finance_id=$1 RETURNING *",
      Number(finance_id)
    );
    return rows[0];
  }

  async delete(finance_id) {
    const query = "DELETE FROM finances WHERE finance_id=$1 RETURNING *";
    const values = [Number(finance_id)];

    const { rows } = await db.query(query, values);
    return rows[0];
  }
}

module.exports = { financeRepository: new FinanceRepository() };
