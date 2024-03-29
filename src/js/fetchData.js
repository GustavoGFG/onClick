import { createProductCard } from './productCard.js';
import { url } from './utils.js';

// let url = 'https://gustavodev.pythonanywhere.com/products';

async function getProducts(url) {
  let response = await fetch(url + '/allproducts');
  let productListData = await response.json();

  return productListData;
}

export let apiProductList = await getProducts(url);

export let subcategoryArray = [];
apiProductList.map(product => {
  if (!subcategoryArray.includes(product.subcategory)) {
    subcategoryArray.push(product.subcategory);
  }
});

export async function searchByWord(word) {
  const response = await fetch(url + '/searchproducts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ searchedProducts: word }),
  });
  const data = await response.json();
  if (data.products.length > 0) {
    createProductCard(data.products, `Results`);
    document
      .getElementById('search-products-input')
      .setAttribute('value', word);
  } else {
    document.getElementsByTagName(
      'main'
    )[0].innerHTML = /*html*/ `<section class="main-flex container-404">
    <h2 class="title-404 text-center">RESULTS CANNOT BE FOUND</h2>
  
    <p class="text-404">
      If you're lost, try using our search bar in the top menu, or go to our
    </p>
  
    <a href="/" class="link-404">homepage</a>
  </section>`;
  }
}
