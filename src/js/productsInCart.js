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
    const priceWithDiscount =
      product.price * (1 - product.discountPercentage / 100);
    cartProductsContainer.innerHTML += /*html*/ ` 
    <div class="cart-product-container" id="productid-${product.id}">
      <a href="/product?id=${product.id}">
        <img src="${product.thumbnail}" alt="Nike Phanto Run" />
      </a>
      <a href="/product?id=${product.id}" class="cart-product-title">
        <p>${product.title}</p>
      </a>
      ${defineSelectedQuantity(productQuantity, product.id, priceWithDiscount)}
      <p id="product-${product.id}-price" class="cart-product-price">$${(
      priceWithDiscount * productQuantity
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
      <p id="total-price">$${subtotalPrice.toFixed(2)}</p>
    </div>
    <div class="checkout-info">
      <p>Shipping:</p>
      <p>Free</p>
   </div>
   <div class="checkout-btn-container">
     <button onclick="checkout()">CHECKOUT</button>
   </div>`;
}

function defineSelectedQuantity(quantity, productId, priceWithDiscount) {
  var text = `<div class="cart-select-container"><select name="" id="" onchange="changeProductSubTotal(${productId}, this.value, ${priceWithDiscount})">`;
  for (let i = 1; i < 6; i++) {
    if (quantity == i) {
      text += `<option value="${i}" selected>${i}</option>`;
    } else {
      text += `<option value="${i}" >${i}</option>`;
    }
  }
  text += `</select><p class="cart-remove-btn" onclick="removeFromCart(${productId})">Remove</p></div>`;
  return text;
}
