import { Router } from "express";
import { userDao } from "../persistence/mongo/dao/user.dao.js";
import { comparePassword, hashPassword } from "../utils/hasPassword.js";
import { authRole } from "../middlewares/authRole.middleware.js";
import { createToken } from "../utils/jwt.js";
import { checkTokenHeader } from "../middlewares/checkTokenHeader.middleware.js";
import { checkTokenCookie } from "../middlewares/checkTokenCookie.middleware.js";
import passport from "passport";
import { passportCall } from "../middlewares/passportCall.middleware.js";

const router = Router();

router.post("/login", passportCall("login"), async (req, res) => {
  try {
    const tokenData = {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role
    }
     const token = createToken(tokenData)
     res.cookie("token", token, {httpOnly: true});
    res.status(200).json({ user: req.user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.post("/register", passportCall("register"), async (req, res) => {
  try {
    res.status(201).json({ message: req.user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

router.get("/profile", passportCall("jwt"), authRole(["admin", "user"]), async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
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
