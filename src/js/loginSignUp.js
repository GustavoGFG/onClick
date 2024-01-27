import { createFavoriteProductCard } from './favoriteProductCard.js';
import { capitalizeWords, url } from './utils.js';
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
  var firstName = capitalizeWords(
    document.getElementById('sign-up-input__first-name').value
  );
  var lastName = capitalizeWords(
    document.getElementById('sign-up-input__last-name').value
  );
  var email = document
    .getElementById('sign-up-input__email')
    .value.toLowerCase();
  var password = document.getElementById('sign-up-input__password').value;

  var signupData = { firstName, lastName, email, password };

  const makeSignup = async () => {
    const response = await fetch(url + '/signup', {
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
    const response = await fetch(url + '/user', {
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

// const patterns = {
//   telephone: /^\d{11}$,
//   username: /^[a-z\d]{5,12}$/i,
//   password: /^[\w@-]{8,20}$/,
//   slug: /^[a-z\d-]{8,20}$/,
//   email: /^$/
// }

// export function validateName(htmlElement) {
//   const toBeValidated = htmlElement.value;
//   const id = htmlElement.id.split('__')[1];
//   const name = id.split('-')[0];
//   var nameError = document.getElementById(`${id}-error`);
//   if (toBeValidated.length === 0) {
//     nameError.innerHTML = `${capitalizeWords(name)} name is required`;
//     return false;
//   }
//   if (!toBeValidated.match(/^[A-Za-z]{1,20}$/)) {
//     nameError.innerHTML = `${capitalizeWords(
//       name
//     )} name must only contain letters [Máx 20 char]`;
//     return false;
//   }
//   nameError.innerHTML = '';
// }
// export function validateEmail(toBeValidated) {
//   var emailError = document.getElementById('email-error');
//   if (toBeValidated.length === 0) {
//     emailError.innerHTML = 'Email is Required';
//     return false;
//   }
//   if (!toBeValidated.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/)) {
//     emailError.innerHTML = 'Email invalid';
//     return false;
//   }
//   emailError.innerHTML = '';
//   return true;
// }

function validatePassword(toBeValidated) {
  // if(!toBeValidated.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[\W_\x7B-\xFF]).{6,15}$/))
}

const patterns = {
  firstname: /^[A-Za-z]{1,20}$/,
  lastname: /^[A-Za-z]{1,20}$/,
  email: /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[\W_\x7B-\xFF]).{8,20}$/,
};
const error = {
  firstname: 'First name must only contain letters [Max 20 char]',
  lastname: 'Last name must only contain letters [Max 20 char]',
  email: 'Email must be a valid address, e.g. me@mydomain.com',
  password:
    'Password must be alphanumeric. At least 1 uppercase. [8 - 20 char]',
};

function validade(field, regex) {
  const fieldId = `${field.attributes.name.value}-error`;
  if (regex.test(field.value)) {
    field.classList.remove('invalid');
    document.getElementById(fieldId).classList.remove('show');
    document.getElementById(fieldId).innerHTML = '';
    return true;
  } else {
    field.classList.add('invalid');
    document.getElementById(fieldId).classList.add('show');
    document.getElementById(fieldId).innerHTML =
      error[`${field.attributes.name.value}`];
    return false;
  }
}
export function validateInputs() {
  const inputs = document
    .getElementsByTagName('main')[0]
    .querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('keyup', e => {
      validade(e.target, patterns[e.target.attributes.name.value]);
    });
  });
}

export function validateToSend() {
  const inputs = document
    .getElementsByTagName('main')[0]
    .querySelectorAll('input');
  var isReadyToSend = true;
  inputs.forEach(input => {
    if (!validade(input, patterns[input.attributes.name.value])) {
      isReadyToSend = false;
    }
  });
  if (isReadyToSend) {
    signup();
  }
}
