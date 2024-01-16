import { createCategoryPage } from './src/js/categoryPage.js';
import { createFavoriteProductCard } from './src/js/favoriteProductCard.js';
import { apiProductList, subcategoryArray } from './src/js/fetchData.js';
import { createMainPage } from './src/js/mainPage.js';
import { createProductCard } from './src/js/productCard.js';
import { createProductPage } from './src/js/productPage.js';

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
  '/cart': '/src/pages/product.html',
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
      console.log('Entrou');
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
    const favoriteOption = document.getElementById('favorite-option');

    const showFavorite = () => {
      document.getElementById('profile-main-container').innerHTML =
        '<p id="profile-main-container-title"></p><div id="profile-main-product-container" class="container product-section"></div>';
      document.getElementById('profile-main-container-title').innerHTML =
        'FAVORITE PRODUCTS';
      const token = localStorage.getItem('token');
      const showFavoriteProducts = async () => {
        const response = await fetch(
          'https://onclick.cyclic.app/allfavorites',
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

    favoriteOption.addEventListener('click', () =>
      showFavorite(apiProductList)
    );
  }
};

window.onpopstate = handleLocation;

window.route = route;

handleLocation();