export function createProductsInCart(productList) {
  var cartProductsContainer = document.getElementById(
    'cart-products-container'
  );
  cartProductsContainer.innerHTML = '';
  console.log(productList);
  productList.forEach(product => {
    cartProductsContainer.innerHTML += /*html*/ ` <div class="cart-product-container">
      <a href="/product?id=${product.id}">
        <img src="${product.thumbnail}" alt="Nike Phanto Run" />
      </a>
      <a href="/product?id=${product.id}" class="cart-product-title">
        <p>${product.title}</p>
      </a>
      <select name="" id="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <p class="cart-product-price">$${(
        product.price *
        (1 - product.discountPercentage / 100)
      ).toFixed(2)}</p>
    </div>`;
  });
}
