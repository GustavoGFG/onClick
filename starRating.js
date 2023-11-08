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
