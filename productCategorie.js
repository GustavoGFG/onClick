const productCategoriesArray = [
  {
    category: 'Accessories',
    subCategory: ['Cap', 'Belt', 'Sunglasses'],
  },
  {
    category: 'Alcohol',
    subCategory: ['Accessories', 'Beer', 'Whiskey', 'Wine'],
  },
  {
    category: 'Books',
    subCategory: ['Computer & Information', 'Finance', 'Self-Help'],
  },
  {
    category: 'Fitness',
    subCategory: [
      'Protein & Supplements',
      'Strength & Cardio',
      'Vitamins & Supplements',
    ],
  },
  {
    category: 'Health',
    subCategory: ['Health & Wellness & Electronics'],
  },
  {
    category: 'Pants & Shorts',
    subCategory: ['Dress Pants', 'Jeans', 'Shorts'],
  },
  {
    category: 'Personal Care',
    subCategory: ['Cologne & Fragrance', 'Hair Care', 'Shaving & Grooming'],
  },
  {
    category: 'Shirts',
    subCategory: ['Dress Shirts', 'Polo Shirts', 'T Shirts', 'Tank Tops'],
  },
  {
    category: 'Shoes',
    subCategory: ['Loafers', 'Slippers', 'Sneakers'],
  },
  {
    category: 'Watch',
    subCategory: ['Analog Watch', 'Smartwatch'],
  },
];

const departmentsSideMenu = document.getElementById(
  'product-categories-menu-body'
);

productCategoriesArray.forEach((element, index) => {
  departmentsSideMenu.innerHTML += `
  <div class="accordion-item">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapse-${index}"
                  aria-expanded="false"
                  aria-controls="flush-collapse-${index}"
                >
                  ${element.category}
                </button>
              </h2>
              <div
                id="flush-collapse-${index}"
                class="accordion-collapse collapse"
                data-bs-parent="#product-categories-menu-body"
              >
                <div class="accordion-body">
                  <ul class="list-group list-group-flush">
                    ${getSubCategories(element.subCategory)}
                    
                  </ul>
                </div>
              </div>
            </div>
  `;
});

function getSubCategories(element) {
  let listOfSubcategories = '';
  element.forEach(categories => {
    listOfSubcategories += `<a href="#" class="list-group-item">${categories}</a>`;
  });
  return listOfSubcategories;
}
