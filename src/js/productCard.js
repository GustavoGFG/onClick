import { capitalizeWords, starReview } from './utils.js';

// const sectionName = 'on sale';

export function createProductCard(productList, sectionName) {
  let section = document.createElement('section');
  section.id = `${sectionName.replace(' ', '')}-section`;
  section.classList.add('container');
  section.classList.add('product-section');
  section.innerHTML = `
  <div class="title-box">
    <h2>${capitalizeWords(sectionName)}</h2>
  </div>
  <div class="row"></div>
  `;
  document.getElementsByTagName('main')[0].appendChild(section);

  for (let product of productList) {
    let ProductContainer = document.createElement('div');
    ProductContainer.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-6');
    ProductContainer.id = `productid-${product.id}`;
    ProductContainer.innerHTML += `
      <div class="product-top">
      <img src="${product.thumbnail}" alt="" class="img-fluid"/>
    <div class="overlay-right">
    <a href="/product?id=${product.id}" id='viewbutton-${
      product.id
    }' type="button" class="btn btn-secondary" title="Quick Shop">
        <i class="fa-solid fa-eye fa-hover"></i>
      </a>
      <button type="button" class="btn btn-secondary" title="Add to Wishlist" onclick='addToFavorites(${
        product.id
      })'>
      <i class="fa-solid fa-heart fa-hover"></i>
      </button>
      <button type="button" class="btn btn-secondary" title="Add to Cart" onclick='addToCart(${
        product.id
      })'>
        <i class="fa-solid fa-shopping-cart fa-hover"></i>
      </button>
      </div>
  </div>
  <div class="product-bottom text-center">
  ${starReview(product.rating)}
  
  
    <h3>${product.title}</h3>
    <div class="productcard-price-container">
    <h5 ${
      product.discountPercentage > 0 ? 'class="price-with-discount"' : ''
    } >$${product.price.toFixed(2)}</h5>
    ${
      product.discountPercentage === 0
        ? ''
        : '<h5>$' +
          (product.price * (1 - product.discountPercentage / 100)).toFixed(2) +
          '</h5>'
    }
    </div>
    </div>
    `;
    document
      .querySelector(`#${sectionName.replace(' ', '')}-section .row`)
      .appendChild(ProductContainer);

    let viewButton = document.getElementById(`productid-${product.id}`);

    viewButton.addEventListener('click', () => {
      let buttonId = viewButton.id.split('-')[1];
      saveSelectedProduct(buttonId);
    });
  }
}

function saveSelectedProduct(id) {
  let clickedProduct = {
    productId: id,
  };

  localStorage.setItem('productSelected', JSON.stringify(clickedProduct));
}
function getSelectedProductId() {
  return (selectedProductId = localStorage.getItem('productSelected'));
}
