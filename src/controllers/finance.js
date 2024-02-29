const { validate } = require("../libs/validate");
const { financeService } = require("../services/finance");

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
      const createdFinance = await financeService.create({
        user_id,
        category_id,
        title,
        date,
        value,
      });

      return res.status(201).json(createdFinance);
    } catch (err) {
      return res.status(err?.status).json({ error: err?.message });
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

      const finances = await financeService.find({ user_id, date });

      return res.status(200).json(finances);
    } catch (err) {
      return res.status(err?.status || 500).json({ error: err?.message });
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
      const updatedFinance = await financeService.update(finance_id, {
        user_id,
        newCategory_id,
        newTitle,
        newDate,
        newValue,
      });

      return res.status(200).json(updatedFinance);
    } catch (err) {
      return res.status(err?.status || 500).json({ error: err?.message });
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
      const deletedFinance = await financeService.delete(finance_id, {
        user_id,
      });

      return res.status(200).json(deletedFinance);
    } catch (err) {
      return res.status(err?.status || 500).json({ error: err?.message });
    }
  }
}

module.exports = { financeController: new FinanceController() };
