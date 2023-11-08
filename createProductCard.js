export function createProductCard(productList, productSectionContainer) {
  for (let product of productList) {
    let ProductContainer = document.createElement('div');
    ProductContainer.classList.add('col-md-3');

    ProductContainer.innerHTML += `
    <div class="product-top">
    <img src="${product.image}" alt="" />
    <div class="overlay-right">
      <button type="button" class="btn btn-secondary" title="Quick Shop">
        <i class="fa-solid fa-eye"></i>
      </button>
      <button type="button" class="btn btn-secondary" title="Add to Wishlist">
      <i class="fa-solid fa-heart"></i>
      </button>
      <button type="button" class="btn btn-secondary" title="Add to Cart">
        <i class="fa-solid fa-shopping-cart"></i>
      </button>
    </div>
  </div>
  <div class="product-bottom text-center">
  ${starReview(product.review)}

  
    <h3>${product.name}</h3>
    <h5>$${product.price}</h5>
    </div>
    `;
    productSectionContainer[0].appendChild(ProductContainer);
  }
}

export function starReview(productReview) {
  const emptyStar = '<i class="fa-regular fa-star"></i>';
  const halfStar = '<i class="fa-regular fa-star-half-stroke"></i>';
  const fullStar = '<i class="fa-solid fa-star"></i>';

  let review = '';
  for (let i = 1; i < 6; i++) {
    if (productReview >= i) {
      review += fullStar;
    } else {
      if (
        productReview % 1 != 0 &&
        !review.includes(halfStar) &&
        productReview >= 0
      ) {
        review += halfStar;
      } else {
        review += emptyStar;
      }
    }
  }
  return review;
}
