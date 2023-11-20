import { createProductCard } from './createProductCard.js';
import { createProductPage } from './createProductPage.js';
import { getProducts, url, shuffle } from './usefull_functions.js';

function getSelectedProductId() {
  return JSON.parse(localStorage.getItem('productSelected'));
}
let productId = getSelectedProductId();

// createProductCard(similarProductList, similarProductsContainerRow);

let apiProductList = await getProducts(url);

const productSelected = apiProductList.find(product => {
  return product.id === Number(productId.productId);
});

let filteredList = apiProductList.filter(product => {
  return (
    product.category === productSelected.category &&
    product.id != productId.productId
  );
});
filteredList = shuffle(filteredList).slice(0, 4);

createProductPage(productSelected);

const similarProductsContainerRow = document.querySelectorAll(
  '#similar-products .row'
);

// createProductCard(filteredList, similarProductsContainerRow);
createProductCard(filteredList, 'similar');
