const { validate } = require("../../libs");
const { userService } = require("./user.services");

class UserController {
  async post(req, res) {
    const { name, email, password } = req.body;

    try {
      validate.name(name);
      validate.email(email);
      validate.password(password);
    } catch (err) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const createdUser = await userService.create({ name, email, password });
      if (!createdUser) {
        return res.status(400).json({ error: "User not created" });
      }

      return res.status(201).json(createdUser);
    } catch (err) {
      return res
        .status(err?.status || 500)
        .json({ error: err?.message || "Unexpected error" });
    }
  }

  get(req, res) {
    return res.status(200).json({ ...req.user });
  }

  async put(req, res) {
    const { user_id } = req.user;
    const { name: newName, email: newEmail } = req.body;

    try {
      validate.name(newName);
      validate.email(newEmail);
    } catch (err) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const updatedUser = await userService.update(user_id, {
        newName,
        newEmail,
      });

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res
        .status(err?.status || 500)
        .json({ error: err?.message || "Unexpected error" });
    }
  }

  async delete(req, res) {
    const { user_id } = req.user;

    try {
      const deletedUser = await userService.delete(user_id);

      return res.status(200).json(deletedUser);
    } catch (err) {
      return res
        .status(err?.status || 500)
        .json({ error: err?.message || "Unexpected error" });
    }
  }
}

module.exports = { userController: new UserController() };
