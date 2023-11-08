import { createProductCard } from './createProductCard.js';
import { similarProductList } from './data.js';

const similarProductsContainerRow = document.querySelectorAll(
  '#similar-products .row'
);

createProductCard(similarProductList, similarProductsContainerRow);
