import { v4 as uuid } from "uuid";
import { ticketDao } from "../persistence/mongo/dao/ticket.dao.js";
class TicketService {

  async createTicket(amount, userMail){
      const newTicket = {
        code: uuid(),
        purchaser: userMail,
        amount
      };

      const ticket = await ticketDao.create(newTicket);

      return ticket;
  }
}

export const ticketService = new TicketService();