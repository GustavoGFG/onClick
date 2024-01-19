import { createCategoryPage } from './src/js/categoryPage.js';
import { createFavoriteProductCard } from './src/js/favoriteProductCard.js';
import { apiProductList, subcategoryArray } from './src/js/fetchData.js';
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

  let productSelected;

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
    const getUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch(
          'https://onclickstore-api.vercel.app/user',
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
        document.getElementById('profile-name').innerHTML = data.user.firstName;
      }
    };
    getUser();

    const favoriteOption = document.getElementById('favorite-option');
    const yourOrdersOption = document.getElementById('yourorders-option');

    const showFavorite = () => {
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
          createFavoriteProductCard(
            productList,
            'profile-main-product-container'
          );
        }
      };
      showFavoriteProducts();
    };

    const showOrders = productList => {
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

    yourOrdersOption.addEventListener('click', () =>
      showOrders(apiProductList)
    );
    favoriteOption.addEventListener('click', () =>
      showFavorite(apiProductList)
    );
  }
  if (window.location.pathname === '/cart') {
    var cartData;
    const token = localStorage.getItem('token');
    if (token) {
      const fetchCart = async () => {
        const response = await fetch(
          'https://onclickstore-api.vercel.app/productsincart',
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
          const arrayOfProductIds = data.cartData.map(object => {
            return object.id;
          });
          cartData = apiProductList.filter(product => {
            return arrayOfProductIds.includes(product.id);
          });
          createProductsInCart(cartData, data.cartData);

          return;
        }
      };
      fetchCart();
    } else {
      window.location.assign('/login');
    }
  }
};

window.onpopstate = handleLocation;

window.route = route;

handleLocation();
