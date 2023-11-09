const { validate } = require("../libs/validate");
const { categoryRepository } = require("../db/repositories/category");

class CategoryController {
  async get(req, res) {
    const { user_id } = req;

    try {
      const categories = await categoryRepository.get(user_id);

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

      return res.status(201).json(categoryCreated);
    } catch (error) {
      return res.status(500).json({ error: err?.message });
    }
  }

  async put(req, res) {
    const { id: category_id } = req.params;
    const { name: newName, icon_url: newIcon_url } = req.body;

    try {
      validate.categoryId(category_id);
      validate.name(newName);
      validate.iconUrl(newIcon_url);
    } catch (error) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const found = await categoryRepository.findById(category_id);
      if (!found) {
        return res.status(404).json({ error: "Category not found" });
      }

      const categoryUpdated = await categoryRepository.update(
        newName,
        newIcon_url,
        category_id
      );
      if (categoryUpdated) {
        return res.status(400).json({ error: "Category not updated" });
      }

      return res.status(200).json(categoryUpdated);
    } catch (error) {
      return res.status(500).json({ error: err?.message });
    }
  }
}

module.exports = { categoryController: new CategoryController() };
