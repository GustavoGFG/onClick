import { createProductCard } from './createProductCard.js';
// import { onSaleProductList, newProductsProductList } from './data.js';
import { getProducts, url } from './fake_store_api.js';

let apiProductList = await getProducts(url);

let onSaleProductList = apiProductList.slice(0, 4);
let newProductsProductList = apiProductList.slice(11, 19);

const onSaleContainerRow = document.querySelectorAll('#on-sale-container .row');
const newProductContainerRow = document.querySelectorAll(
  '#new-products-container .row'
);

createProductCard(onSaleProductList, onSaleContainerRow);
createProductCard(newProductsProductList, newProductContainerRow);
