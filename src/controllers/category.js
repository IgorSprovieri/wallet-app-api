const { validate } = require("../libs/validate");
const { userRepository } = require("../db/repositories/user");
const { categoryRepository } = require("../db/repositories/category");

class CategoryController {
  async get(req, res) {
    const { user_id } = req;

    try {
      const categories = categoryRepository.get(user_id);

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: err?.message });
    }
  }
}

module.exports = { categoryController: new CategoryController() };
