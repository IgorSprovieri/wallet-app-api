const { userRepository } = require("../db/repositories/user");
const { validate } = require("../libs/validate");

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
      const alreadyExists = await userRepository.findByEmail(email);
      if (alreadyExists) {
        return res.status(403).json({ error: "User already exists" });
      }

      const userCreated = await userRepository.create(name, email);
      if (!userCreated) {
        return res.status(400).json({ error: "User not created" });
      }

      return res.status(201).json(userCreated);
    } catch (err) {
      return res.status(500).json({ error: err?.message });
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
      const user = await userRepository.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(201).json(user);
    } catch (err) {
      return res.status(500).json({ error: err?.message });
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
      if (newEmail !== currentEmail) {
        const alreadyExists = await userRepository.findByEmail(newEmail);
        if (!alreadyExists) {
          return res.status(404).json({ error: "New email already in use" });
        }
      }

      const userUpdated = await userRepository.update(
        newName,
        newEmail,
        user_id
      );
      if (!userUpdated) {
        return res.status(400).json({ error: "User not updated" });
      }

      return res.status(200).json(userUpdated);
    } catch (err) {
      return res.status(500).json({ error: err?.message });
    }
  }

  async delete(req, res) {
    const { user_id } = req;

    try {
      const userDeleted = await userRepository.delete(user_id);
      if (!userDeleted) {
        return res.status(400).json({ error: "User not deleted" });
      }

      return res.status(200).json(userDeleted);
    } catch (err) {
      return res.status(500).json({ error: err?.message });
    }
  }
}

module.exports = { userController: new UserController() };
