// export let url = 'https://dummyjson.com/products?limit=100';
export let url = 'https://gustavodev.pythonanywhere.com/products';

export async function getProducts(url) {
  let response = await fetch(url);
  let productListData = await response.json();

  return productListData;
}
