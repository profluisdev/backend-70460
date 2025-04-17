
import { Router } from "express";
import { userController } from "../controllers/user.controllers.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";

const router = Router();

router.post("/register", passportCall("register"), userController.createUser);
router.post("/login", passportCall("login"), userController.loginUser);

export default router;