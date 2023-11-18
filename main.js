import { createProductCard } from './createProductCard.js';
import { getProducts, url, shuffle } from './usefull_functions.js';

let apiProductList = await getProducts(url);
console.log(apiProductList);

let onSaleProductList = getOnSaleProducts(apiProductList);
onSaleProductList = shuffle(onSaleProductList).slice(0, 4);

let newProductsProductList = shuffle(apiProductList);
newProductsProductList = newProductsProductList.slice(0, 8);

const onSaleContainerRow = document.querySelectorAll('#on-sale-container .row');
const newProductContainerRow = document.querySelectorAll(
  '#new-products-container .row'
);

createProductCard(onSaleProductList, onSaleContainerRow);
createProductCard(newProductsProductList, newProductContainerRow);

function getOnSaleProducts(list) {
  return list.filter(product => {
    return product.discountPercentage != 0;
  });
}