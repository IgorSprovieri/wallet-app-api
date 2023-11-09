const { validate } = require("../libs/validate");
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

  async post(req, res) {
    const { user_id } = req;
    const { name, icon_url } = req.body;

    try {
      validate.name(name);
      validate.iconUrl(icon_url);
    } catch (error) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const alreadyExists = await categoryRepository.findByName(name);
      if (alreadyExists) {
        return res.status(400).json({ error: "Category already exists" });
      }

      const categoryCreated = await categoryRepository.create(
        user_id,
        name,
        icon_url
      );
      if (categoryCreated) {
        return res.status(400).json({ error: "Category not created" });
      }

      return res.status(200).json(categoryCreated);
    } catch (error) {
      return res.status(500).json({ error: err?.message });
    }
  }
}

module.exports = { categoryController: new CategoryController() };
