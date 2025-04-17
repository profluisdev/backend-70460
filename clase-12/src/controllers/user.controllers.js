import { request, response } from "express";
import { errorLog } from "../utils/errorLog.js";

class UserController {
  async createUser(req = request, res = response) {
    try {
      res.status(201).json({ status: "ok", user: req.user });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
  async loginUser(req = request, res = response) {
    try {
      res.status(201).json({ status: "ok", user: req.user });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  }
}

export const userController = new UserController();
