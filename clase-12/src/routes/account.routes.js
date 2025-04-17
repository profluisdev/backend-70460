import { Router } from "express";
import { accountController } from "../controllers/account.controllers.js";

const router = Router();

router.post("/deposit", accountController.depositAccount)
router.post("/extract", accountController.extractAccount)
router.post("/transfer", accountController.transfer)

export default router;