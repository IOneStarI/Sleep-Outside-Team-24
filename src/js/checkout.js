import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();

  const checkout = new CheckoutProcess("so-cart", "#checkout-form");
  checkout.init();

  checkout.calculateOrderTotal();
  const form = document.querySelector("#checkout-form");
  if (form) {
    checkout.checkout(form);
  }
});
