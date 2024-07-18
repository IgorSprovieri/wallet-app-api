<<<<<<< HEAD
=======
const bcrypt = require("bcrypt");
const { userRepository } = require("../db/repositories/user");
>>>>>>> 8ee67a1 (feat: create user passwordHash)
const { validate } = require("../libs/validate");
const { userService } = require("../services/user");

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

      const passwordHash = await bcrypt.hash(password, 8);

      const userCreated = await userRepository.create(
        name,
        email,
        passwordHash
      );
      if (!userCreated) {
        return res.status(400).json({ error: "User not created" });
      }

      return res.status(201).json(userCreated);
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
