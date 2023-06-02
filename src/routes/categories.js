const express = require("express");
const router = express.Router();
const db = require("../db");
const categoriesQueries = require("../queries/categories");

router.get("/", async (req, res) => {
  try {
    const getResponse = await db.query("SELECT * FROM categories");

    return res.status(200).json(getResponse.rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
