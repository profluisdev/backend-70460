import { request, response } from "express";
import { cartDao } from "../persistence/mongo/dao/cart.dao.js";
import { cartServices } from "../services/cart.services.js";
import { productDao } from "../persistence/mongo/dao/product.dao.js";

class CartControllers{
  async createCart (req = request, res = response) {
    try {
      const cart = await cartServices.createCart();
  
      res.status(201).json({ status: "ok", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

   async getCartById (req = request, res = response) {
    try {
      const { cid } = req.params;
      const cart = await cartServices.getCartById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
  
      res.status(200).json({ status: "ok", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  async addProductToCart (req = request, res = response) {
    try {
      const { cid, pid } = req.params;
      const product = await productDao.getById(pid);
      if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
      const cart = await cartServices.getById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
  
      const cartUpdate = await cartServices.addProductToCart(pid, cid);
      
      res.status(200).json({ status: "ok", payload: cartUpdate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  async deleteProductToCart (req = request, res = response) {
    try {
      const { cid, pid } = req.params;
      const product = await productDao.getById(pid);
      if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
      const cart = await cartDao.getById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
  
      const cartUpdate = await cartServices.deleteProductToCart(cid, pid);
  
      res.status(200).json({ status: "ok", payload: cartUpdate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  async updateQuantityProductInCart (req = request, res = response) {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
  
      const product = await productDao.getById(pid);
      if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
      const cart = await cartDao.getById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
  
      const cartUpdate = await cartServices.updateQuantityProductInCart(cid, pid, Number(quantity));
  
      res.status(200).json({ status: "ok", payload: cartUpdate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }

  async clearProductsToCart (req = request, res = response)  {
    try {
      const { cid } = req.params;
      const cart = await cartServices.clearProductsToCart(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
  
      res.status(200).json({ status: "ok", cart });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  }
}

export const cartController = new CartControllers();