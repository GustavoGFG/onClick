const onSaleContainerRow = document.querySelectorAll('#on-sale-container .row');

const emptyStar = '<i class="fa-regular fa-star"></i>';
const halfStar = '<i class="fa-regular fa-star-half-stroke"></i>';
const fullStar = '<i class="fa-solid fa-star"></i>';

const productList = [
  {
    name: 'Fitness Watch',
    price: '40.00',
    review: 4,
    image: './Assets/products/onsale-product1.png',
  },
  {
    name: 'Sunglasses',
    price: '25.00',
    review: 4.5,
    image: './Assets/products/onsale-product2.png',
  },
  {
    name: 'Leather Watch',
    price: '95.00',
    review: 5,
    image: './Assets/products/onsale-product3.png',
  },
  {
    name: 'Formal Shoes',
    price: '70.00',
    review: 3.5,
    image: './Assets/products/onsale-product4.png',
  },
];

function createProductCard(productList) {
  for (product of productList) {
    let onSaleProductContainer = document.createElement('div');
    onSaleProductContainer.classList.add('col-md-3');

    onSaleProductContainer.innerHTML += `
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

    onSaleContainerRow[0].appendChild(onSaleProductContainer);
  }
}

function starReview(productReview) {
  let review = '';
  console.log(productReview);
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
    console.log(review);
  }
  return review;
}

createProductCard(productList);
