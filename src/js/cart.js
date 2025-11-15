import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
});

const cartElement = document.querySelector(".product-list");
const shoppingCart = new ShoppingCart(cartElement);
shoppingCart.init();
