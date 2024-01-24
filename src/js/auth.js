const url = 'https://onclickstore-api.vercel.app';

const addToCart = (productId, productQuantity = -1) => {
  const token = localStorage.getItem('token');
  let bodyData =
    productQuantity === -1
      ? { itemId: productId }
      : {
          itemId: productId,
          productQuantity: Number(productQuantity),
        };
  if (token) {
    const addToCartDB = async () => {
      const response = await fetch(url + '/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
    };
    addToCartDB();
  } else {
    window.location.assign('/login');
  }
};

const removeFromCart = productId => {
  const token = localStorage.getItem('token');
  if (token) {
    const removeFromCartDB = async () => {
      const response = await fetch(url + '/removefromcart', {
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
        // document.getElementById('favorite-option').click();
        document.getElementById(`productid-${productId}`).remove();
        changeProductSubTotal(productId, 0, 0);
      }
    };
    removeFromCartDB();
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
        // document.getElementById('favorite-option').click();
        document.getElementById(`productid-${productId}`).remove();
      }
    };
    removeFromFavoritesDB();
  } else {
    window.location.assign('/login');
  }
};

function changeProductSubTotal(id, selectedQuantity, priceWithDiscount) {
  if (selectedQuantity != 0) {
    addToCart(id, selectedQuantity);
    document.getElementById(`product-${id}-price`).innerHTML = `$${(
      selectedQuantity * priceWithDiscount
    ).toFixed(2)}`;
  }
  var Subtotalprice = 0;
  var Subtotalitems = 0;
  var priceArray = document.getElementsByClassName('cart-product-price');
  var quantityArray = document.getElementsByTagName('select');
  for (let i = 0; i < priceArray.length; i++) {
    Subtotalprice += Number(priceArray[i].innerHTML.replace('$', ''));
    Subtotalitems += Number(quantityArray[i].value);
  }

  document.getElementById('total-price').innerHTML =
    '$' + Subtotalprice.toFixed(2);
  document.getElementById('total-items').innerHTML = Subtotalitems;
}

