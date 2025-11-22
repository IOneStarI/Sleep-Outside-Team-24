import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();

  const cartElement = document.querySelector(".product-list");
  const footerElement = document.querySelector(".cart-footer");
  const totalElement = document.querySelector(".cart-total");

  const shoppingCart = new ShoppingCart(cartElement, footerElement, totalElement);
  shoppingCart.init();

  const checkoutBtn = document.getElementById('checkout-button');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('so-cart') || "[]");
      if (cart.length === 0) {
        alert("Your cart is empty! Please add items before checking out.");
        // DO NOT navigate forward!
        return;
      }
      window.location.href = '../checkout/index.html';
    });
  }
});
