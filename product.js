import { createProductCard } from './createProductCard.js';
import { createProductPage } from './createProductPage.js';
import { similarProductList } from './data.js';
import { getProducts, url } from './fake_store_api.js';

function getSelectedProductId() {
  return JSON.parse(localStorage.getItem('productSelected'));
}
let productId = getSelectedProductId();

// createProductCard(similarProductList, similarProductsContainerRow);

let apiProductList = await getProducts(url);

const productSelected = apiProductList.find(product => {
  return product.id === Number(productId.productId);
});

const filteredList = apiProductList
  .filter(product => {
    return product.category === productSelected.category;
  })
  .slice(0, 4);

createProductPage(productSelected);

const similarProductsContainerRow = document.querySelectorAll(
  '#similar-products .row'
);
createProductCard(filteredList, similarProductsContainerRow);
