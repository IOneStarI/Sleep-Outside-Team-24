import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();

  const cartElement = document.querySelector(".product-list");
  const footerElement = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  const shoppingCart = new ShoppingCart(cartElement, footerElement, totalElement);
  shoppingCart.init();
});