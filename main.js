import { createProductCategoryMenu } from './src/js/categoryMenu.js';
import { apiProductList, subcategoryArray } from './src/js/fetchData.js';

let productArray = apiProductList;
let subcategories = subcategoryArray;
console.log(subcategories);
createProductCategoryMenu(productArray);
