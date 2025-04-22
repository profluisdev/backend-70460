import { userModel } from "../models/user.model.js";

class UserDao {
  async create(data) {
    return await userModel.create(data);
  }
  async getAll() {
    return await userModel.find();
  }
  async findOne(query) {
    return await userModel.findOne(query).populate("movements.movement")
  }
  async update(id, data) {
    return await userModel.findByIdAndUpdate(id, data, { new: true });
  }
  async remove(id) {
    return await userModel.findByIdAndDelete(id);
  }
}

export const userDao = new UserDao();
