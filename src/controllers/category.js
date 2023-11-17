const { validate } = require("../libs/validate");
const { categoryRepository } = require("../db/repositories/category");

class CategoryController {
  async get(req, res) {
    const { user_id } = req;

    try {
      const categories = await categoryRepository.get(user_id);

      return res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json({ error: err?.message });
    }
  }

  async post(req, res) {
    const { user_id } = req;
    const { name, color, icon_url } = req.body;

    try {
      validate.name(name);
      validate.color(color);
      validate.iconUrl(icon_url);
    } catch (err) {
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
        color,
        icon_url
      );
      if (!categoryCreated) {
        return res.status(400).json({ error: "Category not created" });
      }

      return res.status(201).json(categoryCreated);
    } catch (err) {
      return res.status(500).json({ error: err?.message });
    }
  }

  async put(req, res) {
    const { user_id } = req;
    const { id: category_id } = req.params;
    const { name: newName, color: newColor, icon_url: newIcon_url } = req.body;

    try {
      validate.categoryId(category_id);
      validate.name(newName);
      validate.color(newColor);
      validate.iconUrl(newIcon_url);
    } catch (err) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const category = await categoryRepository.findById(category_id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      if (category.user_id !== user_id) {
        return res
          .status(401)
          .json({ error: "Category does not belong to this user" });
      }

      const categoryUpdated = await categoryRepository.update(
        newName,
        newColor,
        newIcon_url,
        category_id
      );
      if (!categoryUpdated) {
        return res.status(400).json({ error: "Category not updated" });
      }

      return res.status(200).json(categoryUpdated);
    } catch (err) {
      return res.status(500).json({ error: err?.message });
    }
  }

  async delete(req, res) {
    const { user_id } = req;
    const { id: category_id } = req.params;

    try {
      validate.categoryId(category_id);
    } catch (err) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const category = await categoryRepository.findById(category_id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      if (!category.user_id !== user_id) {
        return res
          .status(401)
          .json({ error: "Category does not belong to this user" });
      }

      const categoryDeleted = await categoryRepository.delete(category_id);
      if (!categoryDeleted) {
        return res.status(400).json({ error: "Category not deleted" });
      }

      return res.status(200).json(categoryDeleted);
    } catch (err) {
      return res.status(500).json({ error: err?.message });
    }
  }
}

module.exports = { categoryController: new CategoryController() };
