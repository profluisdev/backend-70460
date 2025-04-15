import { v4 as uuid } from "uuid";
import { ticketDao } from "../persistence/mongo/dao/ticket.dao.js";
import { ticketTemplate } from "../email/templates/ticket.template.js";
import { sendEmail } from "../email/sendEmail.js";
class TicketService {

  async createTicket(amount, userMail){
      const newTicket = {
        code: uuid(),
        purchaser: userMail,
        amount
      };

      const ticket = await ticketDao.create(newTicket);
      const template = ticketTemplate(ticket.code, ticket.amount, ticket.purchase_datatime, ticket.purchaser);
      await sendEmail(template, "Nuevo ticket de compra", userMail);
      return ticket;
  }
}

export const ticketService = new TicketService();