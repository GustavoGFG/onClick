import { starReview } from './usefull_functions.js';

export function createProductCard(productList, productSectionContainer) {
  for (let product of productList) {
    let ProductContainer = document.createElement('div');
    ProductContainer.classList.add('col-md-3');
    ProductContainer.id = `productid-${product.id}`;
    ProductContainer.innerHTML += `
    <div class="product-top">
    <img src="${product.thumbnail}" alt="" class="img-fluid"/>
    <div class="overlay-right">
      <a href="./product.html" id='viewbutton-${
        product.id
      }' type="button" class="btn btn-secondary" title="Quick Shop">
        <i class="fa-solid fa-eye"></i>
      </a>
      <button type="button" class="btn btn-secondary" title="Add to Wishlist">
      <i class="fa-solid fa-heart"></i>
      </button>
      <button type="button" class="btn btn-secondary" title="Add to Cart">
        <i class="fa-solid fa-shopping-cart"></i>
      </button>
    </div>
  </div>
  <div class="product-bottom text-center">
  ${starReview(product.rating)}

  
    <h3>${product.title}</h3>
    <h5>$${product.price}</h5>
    </div>
    `;
    productSectionContainer[0].appendChild(ProductContainer);

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
