export function createProductsInCart(productList, productIdAndQuantityArray) {
  var cartProductsContainer = document.getElementById(
    'cart-products-container'
  );
  cartProductsContainer.innerHTML = '';
  var subtotalItems = 0;
  var subtotalPrice = 0;
  productList.forEach(product => {
    var productQuantity = productIdAndQuantityArray.find(productInCart => {
      return productInCart.id == product.id;
    }).quantity;
    subtotalItems += productQuantity;
    var productTotalPrice = (
      product.price *
      (1 - product.discountPercentage / 100) *
      productQuantity
    ).toFixed(2);
    subtotalPrice += Number(productTotalPrice);
    cartProductsContainer.innerHTML += /*html*/ ` 
    <div class="cart-product-container">
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
        (1 - product.discountPercentage / 100) *
        productQuantity
      ).toFixed(2)}</p>
    </div>`;
  });
  const cartTotalContainer = document.getElementById('cart-total-container');
  cartTotalContainer.innerHTML = /*html*/ `
    <div class="checkout-info">
      <p>Total Items:</p>
      <p id="total-items">${subtotalItems}</p>
    </div>
    <div class="checkout-info">
      <p>Total Price:</p>
      <p id="total-price">$${subtotalPrice}</p>
    </div>
    <div class="checkout-info">
      <p>Shipping:</p>
      <p>Free</p>
   </div>
   <div class="checkout-btn-container">
     <button>CHECKOUT</button>
   </div>`;
}
