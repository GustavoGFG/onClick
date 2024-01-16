const url = 'https://onclick.cyclic.app';

const login = () => {
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

const signup = () => {
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

const checkLogin = () => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    window.location.assign('/profile');
  } else {
    window.location.assign('/login');
  }
};

const logout = () => {
  localStorage.removeItem('token');
  window.location.assign('/');
};

const addToCart = productId => {
  const token = localStorage.getItem('token');
  if (token) {
    const addToCartDB = async () => {
      const response = await fetch(url + '/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: productId }),
      });
      const data = await response.json();
    };
    addToCartDB();
  } else {
    window.location.assign('/login');
  }
};
const addToFavorites = productId => {
  const token = localStorage.getItem('token');
  if (token) {
    const addToFavoritesDB = async () => {
      const response = await fetch(url + '/addtofavorites', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: productId }),
      });
      const data = await response.json();
    };
    addToFavoritesDB();
  } else {
    window.location.assign('/login');
  }
};
const removeFromFavorites = productId => {
  const token = localStorage.getItem('token');
  if (token) {
    const removeFromFavoritesDB = async () => {
      const response = await fetch(url + '/removefromfavorites', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: productId }),
      });
      const data = await response.json();
      if (data.success) {
        document.getElementById('favorite-option').click();
      }
    };
    removeFromFavoritesDB();
  } else {
    window.location.assign('/login');
  }
};
