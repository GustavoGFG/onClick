import {
  checkoutSession,
  fetchCart,
  isCheckout,
} from './src/js/cartBackend.js';
import { createCategoryPage } from './src/js/categoryPage.js';
import { createFavoriteProductCard } from './src/js/favoriteProductCard.js';
import { apiProductList, subcategoryArray } from './src/js/fetchData.js';
import {
  checkLogin,
  getUser,
  login,
  logout,
  showFavorite,
  showOrders,
  signup,
} from './src/js/loginSignUp.js';
import { createMainPage } from './src/js/mainPage.js';
import { createProductCard } from './src/js/productCard.js';
import { createProductPage } from './src/js/productPage.js';
import { createProductsInCart } from './src/js/productsInCart.js';
import { renderYourOrders } from './src/js/yourOrders.js';

const route = event => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, '', event.target.href);
  handleLocation();
};

const routes = {
  '/': '/src/pages/index.html',
  '/login': '/src/pages/login.html',
  '/signup': '/src/pages/signup.html',
  '/profile': '/src/pages/profile.html',
  '/products': '/src/pages/products.html',
  '/product': '/src/pages/product.html',
  '/cart': '/src/pages/cart.html',
  404: '/src/pages/404.html',
};

const handleLocation = async () => {
  let pageNotFoud = false;
  const path = window.location.pathname;
  let route = routes[path] || routes[404];

  let params = new URL(document.location).searchParams;
  let productId = params.get('id');
  let department = params.get('department');
  let session = params.get('session_id');

  let productSelected;

  document
    .getElementById('profile-icon-btn')
    .addEventListener('click', checkLogin);

  if (path === '/product') {
    productSelected = apiProductList.filter(product => {
      return product.id == productId;
    })[0];
    if (!productSelected) {
      route = routes[404];
      pageNotFoud = true;
    }
  }

  if (!subcategoryArray.includes(department) && department !== null) {
    route = routes[404];
    pageNotFoud = true;
  }

  const html = await fetch(route).then(data => data.text());
  document.getElementById('main').innerHTML = html;

  if (window.location.pathname === '/') {
    createMainPage(apiProductList);
  }

  if (window.location.pathname === '/product' && pageNotFoud == false) {
    createProductPage(productSelected);
  }
  if (window.location.pathname === '/products' && pageNotFoud == false) {
    createCategoryPage(apiProductList, department);
  }

  if (window.location.pathname === '/profile') {
    getUser();

    document
      .getElementById('favorite-option')
      .addEventListener('click', () => showFavorite(apiProductList));
    document
      .getElementById('yourorders-option')
      .addEventListener('click', () => showOrders(apiProductList));
    document
      .getElementById('logout-btn')
      .addEventListener('click', () => logout);
  }

  if (window.location.pathname === '/cart') {
    var cartData;
    const token = localStorage.getItem('token');

    if (session) {
      isCheckout(token, session);
    } else {
      if (token) {
        fetchCart(token, cartData);
      } else {
        window.location.assign('/login');
      }
    }
  }

  if (window.location.pathname === '/login') {
    document.getElementById('login-btn').addEventListener('click', login);
  }

  if (window.location.pathname === '/signup') {
    document.getElementById('signup-btn').addEventListener('click', signup);
  }
};

window.onpopstate = handleLocation;

window.route = route;

handleLocation();
