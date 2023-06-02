const createTablesQueries = {
  createDatabase: () => {
    return {
      name: "create-database",
      text: "CREATE DATABASE finances",
    };
  },
  createUsers: () => {
    return {
      name: "create-users",
      text: "CREATE TABLE users(user_id SERIAL PRIMARY KEY NOT NULL,name TEXT NOT NULL,email TEXT UNIQUE NOT NULL)",
    };
  },
  createCategories: () => {
    return {
      name: "create-categories",
      text: "CREATE TABLE categories(category_id SERIAL PRIMARY KEY NOT NULL, name TEXT NOT NULL)",
    };
  },
  createFinances: () => {
    return {
      name: "create-finances",
      text: "CREATE TABLE finances(id SERIAL PRIMARY KEY NOT NULL, user_id INT, category_id INT, date DATE, title TEXT, value NUMERIC, CONSTRAINT fk_users FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE, CONSTRAINT fk_categories FOREIGN KEY(category_id) REFERENCES categories(category_id) ON DELETE SET NULL)",
    };
  },
};

module.exports = createTablesQueries;
