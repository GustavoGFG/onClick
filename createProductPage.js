import { starReview } from './usefull_functions.js';

const main = document.getElementsByTagName('main')[0];

export function createProductPage(productSelected) {
  const singleProductSection = document.createElement('section');
  singleProductSection.classList.add('single-product');
  singleProductSection.innerHTML = getInnerHTML(productSelected);
  main.appendChild(singleProductSection);
}
function getInnerHTML(productSelected) {
  let singleProductInnerHTML = ` <section class="single-product">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div class="slider">
                <div
                  id="product-slider"
                  class="carousel slide"
                  data-bs-ride="carousel"
                  data-bs-interval="3000"
                >
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img
                        src="${productSelected.thumbnail}"
                        class="d-block img-fluid w-100"
                        alt="..."
                      />
                    </div>
                    ${createProductsImages(productSelected.images)}
                  </div>
                  <button
                    class="carousel-control-prev z-0"
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
                    class="carousel-control-next z-0"
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

            <div class="col-md-4">
              <p class="new-arrival text-center">NEW</p>
              <h2>${productSelected.title}</h2>
              <p>Product Code: ${'IRSC-' + productSelected.id + '-2023'}</p>

              ${starReview(productSelected.rating)}

              ${createProductPrice(productSelected)}
              

              <p><b>Avaiability:</b> ${
                productSelected.stock > 0 ? 'In Stock' : 'Out of Stock'
              }</p>
              <p><b>Condition:</b> New</p>
              <p><b>Brand:</b> ${productSelected.brand}</p>
              <div style="display: flex; align-items: center">
                <label>Quantity:</label>
                <input type="number" value="1" />
                <button type="button" class="btn btn-primary">Add to Cart</button>
              <div>
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
      </section> 
      `;
  return singleProductInnerHTML;
}

function createProductsImages(images) {
  let imagesContainer = '';
  for (let image of images) {
    imagesContainer += `
    <div class="carousel-item">
    <img
      src="${image}"
      class="d-block img-fluid w-100"
      alt="..."
    />
  </div>
    `;
  }

  return imagesContainer;
}

function createProductPrice(productSelected) {
  let priceContainer = '';
  if (productSelected.discountPercentage != 0) {
    priceContainer += `<p class="price-with-discount">USD $${productSelected.price.toFixed(
      2
    )}</p>`;
  }
  priceContainer += `<p class="price">USD $${(
    (productSelected.price * (100 - productSelected.discountPercentage)) /
    100
  ).toFixed(2)}</p>`;

  return priceContainer;
}
