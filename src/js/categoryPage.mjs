import { createProductCard } from './productCard.mjs';

// function getSelectedProductCategory() {
//   return JSON.parse(localStorage.getItem('categorySelected'));
// }

// let selectedCategory = getSelectedProductCategory();

export function createCategoryPage(productArray, subcategory) {
  let filteredByCategoryList = productArray.filter(product => {
    return product.subcategory === subcategory;
  });

  createProductCard(filteredByCategoryList, subcategory);
}
