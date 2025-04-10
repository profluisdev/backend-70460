import { ticketModel } from "../models/ticket.model.js";

class TicketDao {
  async getAll() {
    return await ticketModel.find();
  }

  async getOne(query) {
    return await ticketModel.findOne(query);
  }

  async create(data) {
    return await ticketModel.create(data);
  }

  async update(id, data) {
    return await ticketModel.findByIdAndUpdate(id, data, { new: true });
  }

  async remove(id) {
    return await ticketModel.findByIdAndDelete(id);
  }
}

export const ticketDao = new TicketDao();
