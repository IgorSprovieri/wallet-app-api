const { categoryRepository } = require("../category/category.repository");
const { financeRepository } = require("./finance.repository");

class FinanceService {
  async create({ user_id, category_id, title, date, value }) {
    const category = await db.query(categoryRepository.findById(category_id));
    if (!category) {
      throw { status: 404, message: "Category not found" };
    }

    const createdFinance = await financeRepository.create({
      user_id,
      category_id,
      title,
      date,
      value,
    });
    if (!createdFinance) {
      throw { status: 500, message: "Failed to create finance" };
    }

    return createdFinance;
  }

  async findAll(user_id, date) {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth();

    const initialDate = new Date(year, month, 1).toISOString();
    const finalDate = new Date(year, month + 1, 0).toISOString();

    const finances = await financeRepository.get(user_id, {
      initialDate,
      finalDate,
    });
    if (!finances) {
      throw { status: 500, message: "Failed to find finances" };
    }

    return finances;
  }

  async update(finance_id, { newCategory_id, newTitle, newDate, newValue }) {
    const finance = await financeRepository.findById(finance_id);
    if (!finance) {
      throw { status: 404, message: "Finance not found" };
    }

    const category = await categoryRepository.findById(newCategory_id);
    if (!category) {
      throw { status: 404, message: "Category not found" };
    }

    const updatedFinance = await financeRepository.update(finance_id, {
      newCategory_id,
      newTitle,
      newDate,
      newValue,
    });
    if (!updatedFinance) {
      throw { status: 500, message: "Failed to update finance" };
    }

    return updatedFinance;
  }

  async delete(finance_id) {
    const finance = await financeRepository.findById(finance_id);
    if (!finance) {
      throw { status: 404, message: "Finance not found" };
    }

    const deletedFinance = await financeRepository.delete(finance_id);
    if (!deletedFinance) {
      throw { status: 500, message: "Failed to delete finance" };
    }

    return deletedFinance;
  }
}

module.exports = { financeService: new FinanceService() };
