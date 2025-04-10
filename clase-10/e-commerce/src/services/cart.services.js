import { cartDao } from "../persistence/mongo/dao/cart.dao.js";
import { productDao } from "../persistence/mongo/dao/product.dao.js";
import { Types } from "mongoose";

class CartServices {
  async createCart() {
    return await cartDao.create();
  }

  async getCartById(cid) {
    return await cartDao.getById(cid);
  }

  async addProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);

    const productInCart = cart.products.find((element) => element.product._id.toString() == pid);

    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    const cartUpdate = await cartDao.update(cid, { products: cart.products });
    return cartUpdate;
  }

  async deleteProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    cart.products = cart.products.filter((element) => element.product != pid);
    const cartUpdate = await cartDao.update(cid, { products: cart.products });
    return cartUpdate;
  }

  async updateQuantityProductInCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    const product = cart.products.find((element) => element.product == pid);
    product.quantity = quantity;
    const cartUpdate = await cartDao.update(cid, { products: cart.products });
    return cartUpdate;
  }

  async clearProductsToCart(cid) {
    const cartUpdate = await cartDao.update(cid, { products: [] });
    return cartUpdate;
  }

  async purchaseCart(cid) {
    const cart = await cartDao.getById(cid);

    let total = 0; // El total de la compra de productos con stock
    const products = []; // Se guardan los productos que no tienen stock y quedan en el carrito

    // Lógica de validación de stock y suma del monto total
    for (const productCart of cart.products) {
      // Buscamos de manera individual cada producto para obtener su stock
      const prod = await productDao.getById(productCart.product);
      // Validamos si el stock del producto buscado es mayor o igual a la cantidad del carrito
      if (prod.stock >= productCart.quantity) {
        total += prod.price * productCart.quantity; // Sumamos al total de la compra
        // Actualizamos el stock restando la cantidad de productos del carrito
        await productDao.update(prod._id, { stock: prod.stock - productCart.quantity });
      } else {
        // si no hay stock suficiente del producto lo guardamos en nuestro array de productos sin stock
        products.push(productCart);
      }

      // Actualizamos nuestro carrito con los productos que no tenían stock suficiente
      await cartDao.update(cid, { products });
    }

    return total;
  }
}

export const cartServices = new CartServices();
