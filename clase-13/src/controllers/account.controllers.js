import { request, response } from "express";
import { accountService } from "../services/account.services.js";
import { errorLog } from "../utils/errorLog.js";

class AccountController {
  async depositAccount(req = request, res = response) {
    try {
      const { amount, alias, accountNumber } = req.body;
      const accountQuery = alias ? { alias } : { accountNumber };

      const account = await accountService.depositAccount(accountQuery, amount);

      res.status(201).json({ status: "ok", account });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
  async extractAccount(req = request, res = response) {
    try {
      const { amount, alias, accountNumber } = req.body;
      const accountQuery = alias ? { alias } : { accountNumber };

      const account = await accountService.extractAccount(accountQuery, amount);
      if(account.status == "error") return res.status(400).json(account);

      res.status(201).json({ status: "ok", account });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
  async transfer(req = request, res = response) {
    try {
      const { amount, alias, accountNumber, description } = req.body;
      const accountQuery = alias ? { alias } : { accountNumber };

      const accounts = await accountService.transfer(accountQuery, amount, req.user._id, description);
      if(accounts.status == "crocante") return res.status(400).json(accounts);

      res.status(201).json({ status: "ok", accounts });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
}

export const accountController = new AccountController();
