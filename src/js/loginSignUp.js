import { createFavoriteProductCard } from './favoriteProductCard.js';
import { url } from './utils.js';
import { renderYourOrders } from './yourOrders.js';

export const login = () => {
  var email = document.getElementById('sign-in-input__email').value;
  var password = document.getElementById('sign-in-input__password').value;

  var loginData = { email, password };

  const makeLogin = async () => {
    const response = await fetch(url + '/login', {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem('token', data.token);
      window.location.assign('/');
    } else {
      alert(data.message);
    }
  };
  makeLogin();
};

export const signup = () => {
  var firstName = document.getElementById('sign-up-input__first-name').value;
  var lastName = document.getElementById('sign-up-input__last-name').value;
  var email = document.getElementById('sign-up-input__email').value;
  var password = document.getElementById('sign-up-input__password').value;

  var signupData = { firstName, lastName, email, password };

  const makeSignup = async () => {
    response = await fetch(url + '/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });
    const data = await response.json();

    if (data.success) {
      localStorage.setItem('token', data.token);
      window.location.assign('/');
    } else {
      alert(data.message);
    }
  };
  makeSignup();
};

export const checkLogin = () => {
  const token = localStorage.getItem('token');
  if (token) {
    window.location.assign('/profile');
  } else {
    window.location.assign('/login');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.assign('/');
};

export const getUser = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const response = await fetch('https://onclickstore-api.vercel.app/user', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    document.getElementById('profile-name').innerHTML = data.user.firstName;
  }
};

export const showFavorite = apiProductList => {
  document.getElementById('profile-main-container').innerHTML =
    '<p id="profile-main-container-title" class="title-box"></p><div id="profile-main-product-container" class="container product-section"></div>';
  document.getElementById('profile-main-container-title').innerHTML =
    'FAVORITE PRODUCTS';
  const token = localStorage.getItem('token');
  const showFavoriteProducts = async () => {
    const response = await fetch(
      'https://onclickstore-api.vercel.app/allfavorites',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data.favoriteProducts.length > 0) {
      const container = document.getElementById('profile-main-container');
      var productList = apiProductList;
      productList = productList.filter(product => {
        return data.favoriteProducts.includes(product.id);
      });
      createFavoriteProductCard(productList, 'profile-main-product-container');
    }
  };
  showFavoriteProducts();
};

export const showOrders = productList => {
  document.getElementById('profile-main-container').innerHTML =
    '<p id="profile-main-container-title" class="title-box"></p><div id="profile-main-product-container" class="container"></div>';
  document.getElementById('profile-main-container-title').innerHTML =
    'PURCHASE HISTORY';
  const token = localStorage.getItem('token');
  if (token) {
    const getCheckoutHistory = async () => {
      const response = await fetch(
        'https://onclickstore-api.vercel.app/checkouthistory',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        renderYourOrders(productList, data.checkoutCart);
        // return data.checkoutCart;
      }
    };
    getCheckoutHistory();
  }
};
