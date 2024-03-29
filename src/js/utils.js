export function capitalizeWords(str) {
  return str.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

export function starReview(productReview) {
  const emptyStar = '<i class="fa-regular fa-star"></i>';
  const halfStar = '<i class="fa-regular fa-star-half-stroke"></i>';
  const fullStar = '<i class="fa-solid fa-star"></i>';

  let review = '<div>';
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
  review += '</div>';
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

export const url = 'https://onclickstore-api.vercel.app';
