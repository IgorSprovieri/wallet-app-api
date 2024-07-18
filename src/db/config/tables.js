const createTablesQueries = {
  createUsers: () => {
    return {
      name: "create-users",
      text: "CREATE TABLE users(user_id SERIAL PRIMARY KEY NOT NULL, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, passwordHash TEXT NOT NULL)",
    };
  },
  createCategories: () => {
    return {
      name: "create-categories",
      text: "CREATE TABLE categories(category_id SERIAL PRIMARY KEY NOT NULL, user_id INT, name TEXT NOT NULL, color TEXT, icon_url TEXT,CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE)",
    };
  },
  createFinances: () => {
    return {
      name: "create-finances",
      text: "CREATE TABLE finances(finance_id SERIAL PRIMARY KEY NOT NULL, user_id INT, category_id INT, date DATE, title TEXT, value NUMERIC, CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE, CONSTRAINT fk_categories FOREIGN KEY(category_id) REFERENCES categories(category_id) ON DELETE SET NULL)",
    };
  },
};

module.exports = createTablesQueries;
