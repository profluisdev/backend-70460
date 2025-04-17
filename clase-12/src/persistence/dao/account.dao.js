import { accountModel } from "../models/account.model.js";

class AccountDao {
  async create(data) {
    return await accountModel.create(data);
  }
  async getAll() {
    return await accountModel.find();
  }
  async findOne(query) {
    return await accountModel.findOne(query);
  }
  async update(id, data) {
    return await accountModel.findByIdAndUpdate(id, data, { new: true });
  }
  async remove(id) {
    return await accountModel.findByIdAndDelete(id);
  }
}

export const accountDao = new AccountDao();
