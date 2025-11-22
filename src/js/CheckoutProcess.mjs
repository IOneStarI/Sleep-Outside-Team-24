import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from './utils.mjs';

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

 init() {
  this.list = this.getLocalStorage(this.key);
  this.calculateItemSubTotal();
  this.calculateOrderTotal();
}

  getLocalStorage(key) {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : [];
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice * (item.quantity || 1), 0);
    document.querySelector(`${this.outputSelector} #subtotal`).innerText = this.itemTotal.toFixed(2);
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping = this.list.length > 0 ? 10 + 2 * (this.list.length - 1) : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const outputBase = document.querySelector(this.outputSelector);
    outputBase.querySelector('#tax').innerText = this.tax.toFixed(2);
    outputBase.querySelector('#shipping').innerText = this.shipping.toFixed(2);
    outputBase.querySelector('#order-total').innerText = this.orderTotal.toFixed(2);
  }

  packageItems(items) {
  return items.map(item => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity || 1,
  }));
}

checkout(form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const data = formDataToJSON(form);

      const order = {
        orderDate: new Date().toISOString(),
        fname: data.fname,
        lname: data.lname,
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        cardNumber: data.cardNumber,
        expiration: data.expiration,
        code: data.code,
        items: this.packageItems(this.list),
        orderTotal: this.orderTotal.toFixed(2),
        shipping: this.shipping,
        tax: this.tax.toFixed(2),
      };

      try {
      const response = await ExternalServices.checkout(order);
      localStorage.removeItem('so-cart');
      window.location.href = "./success.html";
    } catch (error) {
      let errMsg = "Order submission failed. Please check your form and try again.";
      if (error.name === 'servicesError' && error.message && error.message.message) {
        errMsg = error.message.message;
      }
      alertMessage(errMsg, true); 
    }
  });
}
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement), convertedJSON = {};
  formData.forEach((value, key) => convertedJSON[key] = value);
  return convertedJSON;
}