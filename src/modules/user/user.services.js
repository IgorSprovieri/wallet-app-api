const bcrypt = require("bcrypt");
const { userRepository } = require("./user.repository");

class UserService {
  async create({ name, email, password }) {
    const alreadyExists = await userRepository.findByEmail({ email });
    if (alreadyExists) {
      throw { status: 409, message: "User already exists" };
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const createdUser = await userRepository.create({
      name,
      email,
      passwordHash,
    });
    if (!createdUser) {
      throw { status: 500, message: "Failed to create user" };
    }

    return createdUser;
  }

  async update(user_id, { newName, newEmail }) {
    const alreadyExists = await userRepository.findByEmail(newEmail);
    if (!alreadyExists) {
      throw { status: 409, message: "New email already in use" };
    }

    const updatedUser = await userRepository.update(user_id, {
      newName,
      newEmail,
    });
    if (!updatedUser) {
      throw { status: 500, message: "Failed to update user" };
    }

    return updatedUser;
  }

  async delete(user_id) {
    const deletedUser = await userRepository.delete(user_id);
    if (!deletedUser) {
      throw { status: 500, message: "Failed to delete user" };
    }

    return deletedUser;
  }
}

module.exports = { userService: new UserService() };
