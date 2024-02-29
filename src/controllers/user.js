const { validate } = require("../libs/validate");
const { userService } = require("../services/user");

class UserController {
  async post(req, res) {
    const { name, email } = req.body;

    try {
      validate.name(name);
      validate.email(email);
    } catch (err) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const createdUser = await userService.create({ name, email });

      return res.status(201).json(createdUser);
    } catch (err) {
      return res.status(err?.status || 500).json({ error: err?.message });
    }
  }

  async get(req, res) {
    const { email } = req.query;

    try {
      validate.email(email);
    } catch (err) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const userFound = await userService.findByEmail({ email });

      return res.status(200).json(userFound);
    } catch (err) {
      return res.status(err?.status || 500).json({ error: err?.message });
    }
  }

  async put(req, res) {
    const { user_id, currentEmail } = req;
    const { name: newName, email: newEmail } = req.body;

    try {
      validate.name(newName);
      validate.email(newEmail);
    } catch (err) {
      return res.status(400).json({ error: err?.message });
    }

    try {
      const userUpdated = await userService.update(user_id, {
        newName,
        newEmail,
        currentEmail,
      });

      return res.status(200).json(userUpdated);
    } catch (err) {
      return res.status(err?.status || 500).json({ error: err?.message });
    }
  }

  async delete(req, res) {
    const { user_id } = req;

    try {
      const userDeleted = await userService.delete(user_id);

      return res.status(200).json(userDeleted);
    } catch (err) {
      return res.status(err?.status || 500).json({ error: err?.message });
    }
  }
}

module.exports = { userController: new UserController() };
