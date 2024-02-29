const { validate } = require("../libs/validate");
const { categoryService } = require("../services/category");

class CategoryController {
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
      const createdCategory = await categoryService.create({
        user_id,
        name,
        color,
        icon_url,
      });

      return res.status(201).json(createdCategory);
    } catch (err) {
      return res.status(err?.status || 500).json({ error: err?.message });
    }
  }

  async get(req, res) {
    const { user_id } = req;

    try {
      const categories = await categoryService.findAll({ user_id });

      return res.status(200).json(categories);
    } catch (err) {
      return res.status(err?.status || 500).json({ error: err?.message });
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
      const updatedCategory = await categoryService.update(category_id, {
        user_id,
        newName,
        newColor,
        newIcon_url,
      });

      return res.status(200).json(updatedCategory);
    } catch (err) {
      return res.status(err?.status || 500).json({ error: err?.message });
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
      const deletedCategory = await categoryService.delete(category_id, {
        user_id,
      });

      return res.status(200).json(deletedCategory);
    } catch (err) {
      return res.status(err?.status || 500).json({ error: err?.message });
    }
  }
}

module.exports = { categoryController: new CategoryController() };
