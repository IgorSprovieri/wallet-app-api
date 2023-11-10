const { validate } = require("../libs/validate");
const { financeRepository } = require("../db/repositories/finance");

class FinanceController {
  async post(req, res) {
    const { user_id } = req;
    const { category_id, title, date, value } = req.body;

    try {
      validate.categoryId(category_id);
      validate.title(title);
      validate.date(date);
      validate.value(value);
    } catch (err) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const category = await db.query(categoriesQueries.findById(category_id));
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      const financeCreated = await financeRepository.create(
        user_id,
        category_id,
        title,
        date,
        value
      );
      if (!financeCreated) {
        return res.status(400).json({ error: "Finance not created" });
      }

      return res.status(201).json(financeCreated);
    } catch (err) {
      return res.status(500).json({ error: err?.message });
    }
  }

  async get(req, res) {
    try {
      const { user_id } = req;
      const { date } = req.query;

      try {
        validate.date(date);
      } catch (error) {
        return res.status(400).json(error);
      }

      const dateObject = new Date(date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth();

      const initialDate = new Date(year, month, 1).toISOString();
      const finalDate = new Date(year, month + 1, 0).toISOString();

      const finances = await financeRepository.get(
        user_id,
        initialDate,
        finalDate
      );

      return res.status(200).json(finances.rows);
    } catch (err) {
      return res.status(500).json({ error: err?.message });
    }
  }

  async put(req, res) {
    const { user_id } = req;
    const { id: finance_id } = req.params;
    const {
      category_id: newCategory_id,
      title: newTitle,
      date: newDate,
      value: newValue,
    } = req.body;

    try {
      validate.categoryId(newCategory_id);
      validate.title(newTitle);
      validate.date(newDate);
      validate.value(newValue);
    } catch (err) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const finance = await financeRepository.findById(finance_id);
      if (!finance) {
        return res.status(404).json({ error: "Finance not found" });
      }

      if (!finance.user_id !== user_id) {
        return res
          .status(401)
          .json({ error: "Finance does not belong to this user" });
      }

      const category = await db.query(
        categoriesQueries.findById(newCategory_id)
      );

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      const financeUpdated = await financeRepository.update(
        finance_id,
        newCategory_id,
        newTitle,
        newDate,
        newValue
      );
      if (!financeUpdated) {
        return res.status(400).json({ error: "Finance not updated" });
      }

      return res.status(200).json(financeUpdated);
    } catch (err) {
      return res.status(500).json({ error: err?.message });
    }
  }

  async delete(req, res) {
    const { user_id } = req;
    const { id: finance_id } = req.params;

    try {
      validate.financeId(finance_id);
    } catch (err) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const finance = await financeRepository.findById(finance_id);
      if (!finance) {
        return res.status(404).json({ error: "Finance not found" });
      }

      if (!finance.user_id !== user_id) {
        return res
          .status(401)
          .json({ error: "Finance does not belong to this user" });
      }

      const financeDeleted = await financeRepository.delete(finance_id);
      if (!financeDeleted) {
        return res.status(400).json({ error: "Finance not deleted" });
      }

      return res.status(200).json(financeDeleted);
    } catch (err) {
      return res.status(500).json({ error: err?.message });
    }
  }
}

module.exports = { financeController: new FinanceController() };
