import { createCategoryPage } from './src/js/categoryPage.js';
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
};

window.onpopstate = handleLocation;

window.route = route;

handleLocation();
