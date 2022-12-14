const express = require("express");
const router = express.Router();
const db = require("../db");
const categoriesQueries = require("../queries/categories");
const usersQueries = require("../queries/users");

router.post("/", async (req, res) => {
  try {
    const email = req.headers.email;
    const { category_id, title, date, value } = req.body;

    if (email.length < 5 || !email.includes("@")) {
      return res.status(400).json({ error: "E-mail is invalid" });
    }

    if (!category_id) {
      return res.status(400).json({ error: "Category id is mandatory" });
    }

    if (!title || title.length < 3) {
      return res.status(400).json({
        error: "Title is mandatory and should have more than 3 characters",
      });
    }

    if (!date || date.length != 10) {
      return res.status(400).json({
        error: "Date is mandatory and should be in the format yyyy-mm-dd",
      });
    }

    if (!value) {
      return res.status(400).json({
        error: "Value is mandatory",
      });
    }

    const userQuery = await db.query(usersQueries.findByEmail(email));
    if (!userQuery.rows[0]) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const category = await db.query(categoriesQueries.findById(category_id));
    if (!category.rows[0]) {
      return res.status(404).json({ error: "Category not found" });
    }

    const text =
      "INSERT INTO finances(user_id, category_id, date, title, value) VALUES($1, $2, $3, $4, $5 ) RETURNING *";
    const values = [userQuery.rows[0].id, category_id, title, date, value];

    const createResponse = await db.query(text, values);
    if (!createResponse.rows[0]) {
      return res.status(400).json({ error: "Finance not created" });
    }

    return res.status(200).json(createResponse);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const email = req.headers.email;
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: "Param id is mandatory" });
    }

    if (email.length < 5 || !email.includes("@")) {
      return res.status(400).json({ error: "E-mail is invalid" });
    }

    const userQuery = await db.query(usersQueries.findByEmail(email));
    if (!userQuery.rows[0]) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const findFinancesText = "SELECT * FROM finances WHERE id=$1 RETURNING *";
    const findFinancesValue = [Number(id)];
    const financeItemQuery = await db.query(
      findFinancesText,
      findFinancesValue
    );

    if (!financeItemQuery.rows[0]) {
      return res.status(400).json({ error: "Finance not found" });
    }

    if (!financeItemQuery.rows[0].user_id !== userQuery.rows[0].id) {
      return res.status(401).json({ error: "Finance does not belong to user" });
    }

    const text = "DELETE FROM finances WHERE id=$1 RETURNING *";
    const values = [Number(id)];
    const deleteResponse = await db.query(text, values);

    if (!deleteResponse.rows[0]) {
      return res.status(404).json({ error: "Finance not deleted" });
    }

    return res.status(200).json(deleteResponse.rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
