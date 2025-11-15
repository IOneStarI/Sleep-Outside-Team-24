import { getLocalStorage, renderWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
  }

  init() {
    const cartItems = getLocalStorage("so-cart") || [];
    this.renderCart(cartItems);
  }

 renderCart(cartItems) {
  if (cartItems.length === 0) {
    this.listElement.innerHTML = `<li class="cart-empty-message">Cart is empty</li>`;
    return;
  }
  const html = cartItems.map(cartItemTemplate).join('');
  renderWithTemplate(html, this.listElement);
}
}
