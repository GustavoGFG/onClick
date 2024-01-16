import { capitalizeWords, starReview } from './utils.js';

// const sectionName = 'on sale';

export function createFavoriteProductCard(productList, sectionName) {
  // let section = document.createElement('section');
  let container = document.getElementById(sectionName);
  container.classList.add('container');
  container.classList.add('product-section');
  container.classList.add('row');

  for (let product of productList) {
    let ProductContainer = document.createElement('div');
    ProductContainer.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-6');
    ProductContainer.id = `productid-${product.id}`;
    ProductContainer.innerHTML += `
      <div class="product-top">
      <img src="${
        product.thumbnail
      }" alt="" class="img-fluid" style="object-fit: cover"/>
    <div class="overlay-right">
    <a href="/product?id=${product.id}" id='viewbutton-${
      product.id
    }' type="button" class="btn btn-secondary" title="Quick Shop">
        <i class="fa-solid fa-eye fa-hover"></i>
      </a>
      <button type="button" class="btn btn-secondary" title="Add to Wishlist" onclick='removeFromFavorites(${
        product.id
      })'>
      <i class="fa-solid fa-heart-circle-xmark fa-hover"></i>
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
    <h5>$${product.price}</h5>
    </div>
    `;
    document.querySelector(`#${sectionName}`).appendChild(ProductContainer);

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
