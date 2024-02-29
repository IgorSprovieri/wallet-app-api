import { categoryRepository } from "../repositories/category";

class CategoryService {
  async create({ user_id, name, color, icon_url }) {
    const alreadyExists = await categoryRepository.findByName(name);
    if (alreadyExists) {
      throw { status: 409, message: "Category already exists" };
    }

    const createdCategory = await categoryRepository.create({
      user_id,
      name,
      color,
      icon_url,
    });
    if (!createdCategory) {
      throw { status: 500, message: "Failed to create category" };
    }

    return createdCategory;
  }

  async findAll({ user_id }) {
    const categories = await categoryRepository.findAll({ user_id });
    if (!categories) {
      throw { status: 500, message: "Failed to find categories" };
    }

    return categories;
  }

  async update(category_id, { user_id, newName, newColor, newIcon_url }) {
    const category = await categoryRepository.findById(category_id);
    if (!category) {
      throw { status: 404, message: "Category not found" };
    }

    if (category.user_id !== user_id) {
      throw { status: 401, message: "Category does not belong to this user" };
    }

    const updatedCategory = await categoryRepository.update(category_id, {
      newName,
      newColor,
      newIcon_url,
    });
    if (!updatedCategory) {
      throw { status: 500, message: "Failed to update category" };
    }

    return updatedCategory;
  }

  async delete(category_id, { user_id }) {
    const category = await categoryRepository.findById(category_id);
    if (!category) {
      throw { status: 404, message: "Category not found" };
    }

    if (!category.user_id !== user_id) {
      throw { status: 401, message: "Category does not belong to this user" };
    }

    const deletedCategory = await categoryRepository.delete(category_id);
    if (!deletedCategory) {
      throw { status: 500, message: "Failed to delete category" };
    }

    return deletedCategory;
  }
}

module.exports = { categoryService: new CategoryService() };
