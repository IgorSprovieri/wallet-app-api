const db = require("..");
const tableQueries = require("./tables");

const init = async () => {
  try {
    await db.connect();
    await db.query(tableQueries.createUsers());
    await db.query(tableQueries.createCategories());
    await db.query(tableQueries.createFinances());

    console.log("Successfully created tables");

    db.end();

    return;
  } catch (error) {
    throw new Error("Error configuring database: ", error);
  }
};

init();
