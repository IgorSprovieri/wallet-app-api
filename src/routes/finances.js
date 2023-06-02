const express = require("express");
const router = express.Router();
const db = require("../db");
const categoriesQueries = require("../queries/categories");
const usersQueries = require("../queries/users");
const { route } = require("./categories");

router.post("/", async (req, res) => {
  try {
    const currentEmail = req.headers.email;
    const { category_id, title, date, value } = req.body;

    if (
      currentEmail.length < 5 ||
      !currentEmail.includes("@") ||
      !currentEmail.includes(".")
    ) {
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

    const userFound = await db.query(usersQueries.findByEmail(currentEmail));
    if (!userFound.rows[0]) {
      return res.status(404).json({ error: "User not found" });
    }

    const categoryFound = await db.query(
      categoriesQueries.findById(category_id)
    );
    if (!categoryFound.rows[0]) {
      return res.status(404).json({ error: "Category not found" });
    }

    const text =
      "INSERT INTO finances(user_id, category_id, date, title, value) VALUES($1, $2, $3, $4, $5 ) RETURNING *";
    const values = [userFound.rows[0].id, category_id, title, date, value];

    const createResponse = await db.query(text, values);
    if (!createResponse.rows[0]) {
      return res.status(400).json({ error: "Finance not created" });
    }

    return res.status(201).json(createResponse);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const currentEmail = req.headers.email;
    const { date } = req.query;

    if (
      currentEmail.length < 5 ||
      !currentEmail.includes("@") ||
      !currentEmail.includes(".")
    ) {
      return res.status(400).json({ error: "E-mail is invalid" });
    }

    if (!date || date.length != 10) {
      return res.status(400).json({
        error: "Date is mandatory and should be in the format yyyy-mm-dd",
      });
    }

    const userFound = await db.query(usersQueries.findByEmail(currentEmail));
    if (!userFound.rows[0]) {
      return res.status(404).json({ error: "User not found" });
    }

    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();

    const initDate = new Date(year, month, 1).toISOString();
    const finalDate = new Date(year, month + 1, 0).toISOString();

    const text =
      "SELECT fin.title, fin.date, fin.user_id, fin category_id, cat.name FROM finances as fin JOIN categories as cat ON fin.category_id = cat.id WHERE fin.user_id=$1 AND fin.date BETWEEN $2 AND $3 ORDER BY fin.date ASC";
    const values = (userFound.rows[0].id, initDate, finalDate);

    const getResponse = await db.query(text, values);

    return res.status(200).json(getResponse.rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const currentEmail = req.headers.email;
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: "Param id is mandatory" });
    }

    if (
      currentEmail.length < 5 ||
      !currentEmail.includes("@") ||
      !currentEmail.includes(".")
    ) {
      return res.status(400).json({ error: "E-mail is invalid" });
    }

    const userFound = await db.query(usersQueries.findByEmail(currentEmail));
    if (!userFound.rows[0]) {
      return res.status(404).json({ error: "User not found" });
    }

    const financeFound = await db.query(
      "SELECT * FROM finances WHERE id=$1 RETURNING *",
      Number(id)
    );
    if (!financeFound.rows[0]) {
      return res.status(400).json({ error: "Finance not found" });
    }

    if (!financeFound.rows[0].user_id !== userFound.rows[0].id) {
      return res.status(401).json({ error: "Finance does not belong to user" });
    }

    const text = "DELETE FROM finances WHERE id=$1 RETURNING *";
    const values = [Number(id)];

    const deleteResponse = await db.query(text, values);
    if (!deleteResponse.rows[0]) {
      return res.status(400).json({ error: "Finance not deleted" });
    }

    return res.status(200).json(deleteResponse.rows);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
