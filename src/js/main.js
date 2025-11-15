import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter } from './utils.mjs';

document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter();
});

const productListElement = document.getElementById('productList'); 
const dataSource = new ProductData('tents');

const productList = new ProductList('tents', dataSource, productListElement);
productList.init();

