import { Router } from "express";
import { cartDao } from "../persistence/mongo/dao/cart.dao.js";
import { cartController } from "../controllers/cart.controllers.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";
import { authRole } from "../middlewares/authRole.middleware.js";

const router = Router();

router.post("/", cartController.createCart);

router.get("/:cid", cartController.getCartById);

router.post("/:cid/product/:pid",passportCall("jwt"), authRole(["user"]), cartController.addProductToCart);

router.delete("/:cid/product/:pid", cartController.deleteProductToCart);

router.put("/:cid/product/:pid", cartController.updateQuantityProductInCart);

router.delete("/:cid", cartController.clearProductsToCart);

router.get("/:cid/purchase", passportCall("jwt"), authRole(["user"]), cartController.purchaseCart);

export default router;
