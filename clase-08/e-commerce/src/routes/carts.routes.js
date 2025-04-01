import { Router } from "express";
import { cartDao } from "../persistence/mongo/dao/cart.dao.js";
import { cartController } from "../controllers/cart.controllers.js";



const router = Router();

router.post("/", cartController.createCart);

router.get("/:cid", cartController.getCartById);

router.post("/:cid/product/:pid", cartController.addProductToCart);

router.delete("/:cid/product/:pid", cartController.deleteProductToCart);

router.put("/:cid/product/:pid", cartController.updateQuantityProductInCart);

router.delete("/:cid", cartController.clearProductsToCart);

export default router;
