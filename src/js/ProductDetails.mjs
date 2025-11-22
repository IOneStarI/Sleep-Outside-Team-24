import { getLocalStorage, setLocalStorage, alertMessage  } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    document.getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  }

addProductToCart() {
  let cart = getLocalStorage("so-cart") || [];
  const productId = this.product.Id;
  const existingItem = cart.find(item => item.Id === productId);

  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
    alertMessage("Product quantity increased in cart!");
  } else {
    this.product.quantity = 1;
    cart.push(this.product);
    alertMessage("Product added to cart!");
  }

  setLocalStorage("so-cart", cart);
}


renderProductDetails() {
  productDetailsTemplate(this.product);
}
}

function productDetailsTemplate(product) {
  if (!product) return;

  const brandElem = document.querySelector('h2');
  if (brandElem) brandElem.textContent = product.Brand?.Name || '';

  const nameElem = document.querySelector('h3');
  if (nameElem) nameElem.textContent = product.NameWithoutBrand || '';

const productImage = document.getElementById('productImage');
if (productImage) {
  productImage.src = product.Images?.PrimaryLarge || '';
  productImage.alt = product.NameWithoutBrand || 'Product image';
}

  const priceElem = document.getElementById('productPrice');
  if (priceElem) priceElem.textContent = product.FinalPrice ? `$${product.FinalPrice.toFixed(2)}` : '';

  const colorElem = document.getElementById('productColor');
  if (colorElem) {
    const colors = product.Colors || [];
    colorElem.textContent = colors.length > 0 ? colors[0].ColorName : 'No colors available';
  }

  const descElem = document.getElementById('productDesc');
  if (descElem) descElem.innerHTML = product.DescriptionHtmlSimple || '';

  const addToCartBtn = document.getElementById('addToCart');
  if (addToCartBtn) addToCartBtn.dataset.id = product.Id || '';
}