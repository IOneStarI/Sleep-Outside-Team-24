import ShoppingCart from './ShoppingCart.mjs';

const cartElement = document.querySelector(".product-list");
const shoppingCart = new ShoppingCart(cartElement);
shoppingCart.init();
