export let url = 'https://dummyjson.com/products?limit=100';

export async function getProducts(url) {
  let response = await fetch(url);
  let productListData = await response.json();

  return productListData.products;
}
