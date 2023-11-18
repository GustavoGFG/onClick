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

export function shuffle(array) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

export let url = 'https://gustavodev.pythonanywhere.com/products';

export async function getProducts(url) {
  let response = await fetch(url);
  let productListData = await response.json();

  return productListData;
}
