import { createProductCard } from './createProductCard.js';
import { onSaleProductList, newProductsProductList } from './data.js';

const onSaleContainerRow = document.querySelectorAll('#on-sale-container .row');
const newProductContainerRow = document.querySelectorAll(
  '#new-products-container .row'
);

createProductCard(onSaleProductList, onSaleContainerRow);
createProductCard(newProductsProductList, newProductContainerRow);
