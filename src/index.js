require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const routes = require("./routes/index");

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(routes);

app.listen(port, "0.0.0.0", async () => {
  try {
    await db.connect();
    console.log(`App listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
