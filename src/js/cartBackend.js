import { apiProductList } from './fetchData.js';
import { createProductsInCart } from './productsInCart.js';
import { url } from './utils.js';

export const isCheckout = async (token, session) => {
  const response = await fetch(url + '/ischeckout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: session }),
  });
  const data = await response.json();
  if (data.success) {
    const checkoutProducts = JSON.parse(data.message.metadata.stripe_cartData);
    checkout(checkoutProducts, apiProductList);
  }
};

export const fetchCart = async (token, cartData) => {
  const response = await fetch(url + '/productsincart', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data.success) {
    const arrayOfProductIds = data.cartData.map(object => {
      return object.id;
    });
    cartData = apiProductList.filter(product => {
      return arrayOfProductIds.includes(product.id);
    });
    createProductsInCart(cartData, data.cartData);
    document
      .getElementById('checkout-btn')
      .addEventListener('click', checkoutSession);

    return;
  }
};

export const checkout = (checkoutProducts, apiProductList) => {
  checkoutProducts = checkoutProducts.map(product => {
    let p = apiProductList.find(p => {
      return p.id == product.id;
    });
    return {
      id: product.id,
      quantity: product.quantity,
      price: p.price * (1 - p.discountPercentage / 100) * product.quantity,
    };
  });

  const cart = {
    checkoutCart: {
      cartData: checkoutProducts,
      // {id: 1, quantity: 1, price: 160 },
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      total: 0,
    },
  };
  for (let p of checkoutProducts) {
    cart.checkoutCart.total += p.price;
  }
  // const allProducts = document.getElementsByClassName('cart-product-container');
  // if (allProducts.length > 0) {
  //   for (let i = 0; i < allProducts.length; i++) {
  //     var obj = { id: 0, quantity: 0, price: 0 };
  //     obj.id = Number(allProducts[i].id.replace('productid-', ''));
  //     obj.quantity = Number(
  //       document.querySelector(`#productid-${obj.id} select`).value
  //     );
  //     obj.price = Number(
  //       document
  //         .querySelector(`#product-${obj.id}-price`)
  //         .innerHTML.replace('$', '')
  //     );
  //     cart.checkoutCart.cartData.push(obj);
  //     cart.checkoutCart.total += obj.price;
  //   }
  const token = localStorage.getItem('token');
  if (token) {
    const makeCheckout = async () => {
      const response = await fetch(url + '/checkout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cart),
      });
      const data = await response.json();
      // alert(data.message);
      window.location.assign('/profile');
      document.getElementById('yourorders-option').click();
    };
    makeCheckout();
  }
  // } else {
  //   alert('Add something to cart!');
  // }
};

export async function checkoutSession() {
  const token = localStorage.getItem('token');
  if (token) {
    const response = await fetch(url + '/checkoutsession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    window.location.assign(data.url);
  }
}
