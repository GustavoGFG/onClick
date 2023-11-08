const onSaleContainerRow = document.querySelectorAll('#on-sale-container .row');
const newProductContainerRow = document.querySelectorAll(
  '#new-products-container .row'
);

const emptyStar = '<i class="fa-regular fa-star"></i>';
const halfStar = '<i class="fa-regular fa-star-half-stroke"></i>';
const fullStar = '<i class="fa-solid fa-star"></i>';

const onSaleProductList = [
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

const newProductsProductList = [
  {
    name: 'ViewSonic 27" Monitor',
    price: '165.00',
    review: 3.5,
    image: './Assets/new-arrivals/product-1.png',
  },
  {
    name: 'Christmas Sweatshirt',
    price: '20.40',
    review: 4,
    image: './Assets/new-arrivals/product-2.png',
  },
  {
    name: "Men's Belt",
    price: '22.98',
    review: 4.5,
    image: './Assets/new-arrivals/product-3.png',
  },
  {
    name: 'LeNovo YogaBook 9i',
    price: '699.00',
    review: 5,
    image: './Assets/new-arrivals/product-4.png',
  },
  {
    name: '4 in 1 Christmas Set',
    price: '108.00',
    review: 4,
    image: './Assets/new-arrivals/product-5.png',
  },
  {
    name: 'PS5 Spider Man Edition',
    price: '450.00',
    review: 5,
    image: './Assets/new-arrivals/product-6.png',
  },
  {
    name: 'Kid Trax Spider Man',
    price: '115.00',
    review: 4,
    image: './Assets/new-arrivals/product-7.png',
  },
  {
    name: 'Workout System',
    price: '889.49',
    review: 5,
    image: './Assets/new-arrivals/product-8.png',
  },
];

function createProductCard(productList, productSectionContainer) {
  console.log(productSectionContainer);
  for (product of productList) {
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

createProductCard(onSaleProductList, onSaleContainerRow);
createProductCard(newProductsProductList, newProductContainerRow);
