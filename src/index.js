require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const routesCategories = require("./routes/categories");
const routesUsers = require("./routes/users");
const routesFinances = require("./routes/finances");

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/categories", routesCategories);
app.use("/users", routesUsers);
app.use("/finances", routesFinances);

app.get("/", (req, res) => {
  res.send("It is a wallet app API");
});

app.listen(port, "0.0.0.0", async () => {
  try {
    await db.connect();
    console.log(`App listening on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
