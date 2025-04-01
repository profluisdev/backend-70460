import { userModel } from "../models/user.model.js";

class UserDao {
  async getAll() {
    return await userModel.find();
  }

  async getOne(query) {
    return await userModel.findOne(query);
  }

  async create(data) {
    return await userModel.create(data);
  }

  async update(id, data) {
    return await userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id) {
    return await userModel.findByIdAndDelete(id);
  }
}

export const userDao = new UserDao();
