import { starReview } from './starRating.js';

const main = document.getElementsByTagName('main')[0];

export function createProductPage(productSelected) {
  const singleProductSection = document.createElement('section');
  singleProductSection.classList.add('single-product');
  singleProductSection.innerHTML = getInnerHTML(productSelected);
  main.appendChild(singleProductSection);
}
function getInnerHTML(productSelected) {
  console.log(productSelected);
  let singleProductInnerHTML = ` <section class="single-product">
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <div class="slider">
                <div
                  id="product-slider"
                  class="carousel slide carousel-fade"
                  data-bs-ride="carousel"
                  data-bs-interval="3000"
                >
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img
                        src="${productSelected.images[0]}"
                        class="d-block"
                        alt="..."
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src="${productSelected.images[1]}"
                        class="d-block"
                        alt="..."
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src="${productSelected.images[2]}"
                        class="d-block"
                        alt="..."
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src="${productSelected.images[3]}"
                        class="d-block"
                        alt="..."
                      />
                    </div>
                  </div>
                  <button
                    class="carousel-control-prev"
                    type="button"
                    data-bs-target="#product-slider"
                    data-bs-slide="prev"
                  >
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button
                    class="carousel-control-next"
                    type="button"
                    data-bs-target="#product-slider"
                    data-bs-slide="next"
                  >
                    <span
                      class="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-3">
              <p class="new-arrival text-center">NEW</p>
              <h2>${productSelected.title}</h2>
              <p>Product Code: ${'IRSC-' + productSelected.id + '-2023'}</p>

              ${starReview(productSelected.rating)}

              <p class="price">USD $${productSelected.price.toFixed(2)}</p>
              <p><b>Avaiability:</b> ${
                productSelected.stock > 0 ? 'In Stock' : 'Out of Stock'
              }</p>
              <p><b>Condition:</b> New</p>
              <p><b>Brand:</b> ${productSelected.brand}</p>

              <label>Quantity:</label>
              <input type="number" value="1" />
              <button type="button" class="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>

      <!-- PRODUCT DESCRIPTION -->
      <section class="product-description">
        <div class="container">
          <h6>Product Description</h6>
          <p>
            ${productSelected.description}
          </p>
          <hr />
        </div>

        <div id="similar-products" class="container">
          <div class="title-box">
            <h2>Similar</h2>
          </div>
          <div class="row"></div>
        </div>
      </section> `;
  return singleProductInnerHTML;
}

// function starReview(productReview) {
//   const emptyStar = '<i class="fa-regular fa-star"></i>';
//   const halfStar = '<i class="fa-regular fa-star-half-stroke"></i>';
//   const fullStar = '<i class="fa-solid fa-star"></i>';

//   let review = '';
//   for (let i = 1; i < 6; i++) {
//     if (productReview >= i) {
//       review += fullStar;
//     } else {
//       if (
//         productReview % 1 != 0 &&
//         !review.includes(halfStar) &&
//         productReview >= 0
//       ) {
//         review += halfStar;
//       } else {
//         review += emptyStar;
//       }
//     }
//   }
//   return review;
// }
