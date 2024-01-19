export const renderYourOrders = (productList, checkoutCart) => {
  var mainContainer = document.getElementById('profile-main-container');
  for (let i = checkoutCart.length - 1; i > -1; i--) {
    mainContainer.innerHTML +=
      /*html*/
      `<div class="purchase-container">
      <div class="purchase-date-total-container">
        <div class="purchase-date-total-container-box">
          <p><b>Purchase Date: </b></p>
          <p>${checkoutCart[i].date}</p>
        </div>
        <div class="purchase-date-total-container-box">
          <p><b>Total: </b></p>
          <p>$${checkoutCart[i].total.toFixed(2)}</p>
        </div>
      </div>
      <div class="yourorders-information">
        <p>Product</p>
        <p>Title</p>
        <p>Quantity</p>
        <p>Total</p>
      </div>
      ${renderYourOrdersProducts(productList, checkoutCart[i].cartData)}
      
    </div>`;
  }
};

const renderYourOrdersProducts = (productList, cartData) => {
  var text = '';
  for (let productInCart of cartData) {
    let product = productList.find(product => {
      return product.id === productInCart.id;
    });
    text += /*html*/ `
    <div class="cart-product-container" id="productid-${product.id}">
    <a href="/product?id=${product.id}">
          <img
            src="${product.thumbnail}"
            alt="${product.title}"
          />
        </a>
        <a href="/product?id=${product.id}" class="cart-product-title">
          <p>${product.title}</p>
        </a>
        <p class="cart-product-price">${productInCart.quantity}</p>
        <p id="product-${product.id}-price" class="cart-product-price">
        $${productInCart.price.toFixed(2)}
        </p>
        </div>`;
  }
  return text;
};
