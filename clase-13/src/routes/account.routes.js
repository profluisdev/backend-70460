import { Router } from "express";
import { accountController } from "../controllers/account.controllers.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";

const router = Router();

router.post("/deposit", accountController.depositAccount)
router.post("/extract", accountController.extractAccount)
router.post("/transfer", passportCall("jwt"), accountController.transfer)

export default router;