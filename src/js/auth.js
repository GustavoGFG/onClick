const url = 'http://localhost:8000';

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
