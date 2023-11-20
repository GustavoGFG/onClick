import { createProductCard } from './createProductCard.js';
import { getProducts, url } from './usefull_functions.js';

export let apiProductList = await getProducts(url);

function getSelectedProductCategory() {
  return JSON.parse(localStorage.getItem('categorySelected'));
}

let selectedCategory = getSelectedProductCategory();

let filteredByCategoryList = apiProductList.filter(product => {
  return (
    product.subcategory === selectedCategory['selectedCategory'].toLowerCase()
  );
});

createProductCard(filteredByCategoryList, selectedCategory['selectedCategory']);
