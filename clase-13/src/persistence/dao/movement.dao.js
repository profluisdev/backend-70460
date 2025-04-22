import { movementModel } from "../models/movement.model.js";

class MovementDao {
  async create(data) {
    return await movementModel.create(data);
  }
  async getAll() {
    return await movementModel.find();
  }
  async findOne(query) {
    return await movementModel.findOne(query);
  }
  async update(id, data) {
    return await movementModel.findByIdAndUpdate(id, data, { new: true });
  }
  async remove(id) {
    return await movementModel.findByIdAndDelete(id);
  }
}

export const movementDao = new MovementDao();
