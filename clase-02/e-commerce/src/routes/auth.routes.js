import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { comparePassword, hashPassword } from "../utils/hasPassword.js";
import { authRole } from "../middlewares/authRole.middleware.js";

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.getOne({ email });

    if (!user || !(await comparePassword(user.password, password))) {
      return res.status(401).json({ message: "Email o password invalido" });
    }
    // Guardamos la información del usuario en las session
    req.session.user = user;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userDao.getOne({ email });
    if (user) return res.status(400).json({ message: "Ya hay un usuario registrado con ese email" });
    const newUserData = {
      ...req.body,
      password: await hashPassword(req.body.password),
    };
    // Crear un nuevo usuario
    const newUser = await userDao.create(newUserData);

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.get("/profile", authRole(["admin", "user"]), async (req, res) => {
  try {
    if (!req.session.user) return res.status(401).json({ message: "No hay usuario logueado" });

    res.status(200).json({ user: req.session.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.get("/logout", async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: "Session cerrada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

export default router;
