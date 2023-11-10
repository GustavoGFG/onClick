export let url = 'https://fake-store-api.mock.beeceptor.com/api/products';

export async function getProducts(url) {
  let response = await fetch(url);
  let productListData = await response.json();

  console.log(productListData);
  return productListData.products;
}

getProducts(url);
