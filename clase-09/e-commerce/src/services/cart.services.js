import { cartDao } from "../persistence/mongo/dao/cart.dao.js";

class CartServices {
  async createCart() {
    return await cartDao.create();
  }

  async getCartById(cid) {
    return await cartDao.getById(cid);
  }

  async addProductToCart(cid, pid) {
    const cart = await cartDao.getById(cid);
    const productInCart = cart.products.find((element) => element.product == pid);
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
}

export const cartServices = new CartServices();
