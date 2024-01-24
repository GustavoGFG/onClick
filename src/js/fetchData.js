// let url = 'https://gustavodev.pythonanywhere.com/products';
let url = 'https://onclickstore-api.vercel.app/allproducts';
async function getProducts(url) {
  let response = await fetch(url);
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
