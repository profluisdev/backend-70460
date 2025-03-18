import { Router } from "express";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";
import authRouter from "./auth.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/carts", cartsRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
