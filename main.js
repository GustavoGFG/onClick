import { createProductCategoryMenu } from './src/js/categoryMenu.mjs';
import { apiProductList, subcategoryArray } from './src/js/fetchData.mjs';

let productArray = apiProductList;
let subcategories = subcategoryArray;
console.log(subcategories);
createProductCategoryMenu(productArray);
