const { userRepository } = require("../repositories/user");

class UserService {
  async create({ name, email }) {
    const alreadyExists = await userRepository.findByEmail({ email });
    if (alreadyExists) {
      throw { status: 409, message: "User already exists" };
    }

    const createdUser = await userRepository.create({ name, email });
    if (!createdUser) {
      throw { status: 500, message: "Failed to create user" };
    }

    return createdUser;
  }

  async findByEmail({ email }) {
    const userFound = await userRepository.findByEmail({ email });
    if (!userFound) {
      throw { status: 404, message: "User not found" };
    }

    return userFound;
  }

  async update(user_id, { newName, newEmail, currentEmail }) {
    if (newEmail !== currentEmail) {
      const alreadyExists = await userRepository.findByEmail({
        email: newEmail,
      });
      if (!alreadyExists) {
        throw { status: 409, message: "New email already exists" };
      }
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
