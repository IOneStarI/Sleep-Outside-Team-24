import { getLocalStorage, renderWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images?.PrimarySmall || '/images/default-image.svg'}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors && item.Colors[0] ? item.Colors[0].ColorName : ''}</p>
    <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

export default class ShoppingCart {
  constructor(listElement, footerElement, totalElement) {
    this.listElement = listElement;
    this.footerElement = footerElement;
    this.totalElement = totalElement;
  }

  init() {
    const cartItems = getLocalStorage("so-cart") || [];
    this.renderCart(cartItems);
  }

  renderCart(cartItems) {
    if (cartItems.length === 0) {
      this.listElement.innerHTML = `<li class="cart-empty-message">Cart is empty</li>`;
      if (this.footerElement) this.footerElement.classList.add('hide');
      return;
    }

    const html = cartItems.map(cartItemTemplate).join('');
    renderWithTemplate(html, this.listElement);

    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice * (item.quantity || 1), 0);

    if (this.footerElement && this.totalElement) {
      this.footerElement.classList.remove('hide');
      this.totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  }
}
