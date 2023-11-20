import { capitalizeWords, getProducts, url } from './usefull_functions.js';

// import { apiProductList } from './createCategoryPage.js';

let alist = await getProducts(url);

const productCategoriesArray = [
  {
    category: 'Accessories',
    subCategory: ['Caps', 'Belts', 'Sunglasses'],
  },
  {
    category: 'Alcohol',
    subCategory: ['Accessories', 'Beers', 'Whiskies', 'Wines'],
  },
  {
    category: 'Books',
    subCategory: ['Computer & Information', 'Finance', 'Self-Help'],
  },
  {
    category: 'Fitness',
    subCategory: [
      'Proteins & Supplements',
      'Strength & Cardio',
      'Vitamins & Supplements',
    ],
  },
  {
    category: 'Health',
    subCategory: ['Heath Electronics'],
  },
  {
    category: 'Pants & Shorts',
    subCategory: ['Dress Pants', 'Jeans', 'Shorts'],
  },
  {
    category: 'Personal Care',
    subCategory: ['Cologne & Fragrances', 'Hair Care', 'Shaving & Grooming'],
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
    category: 'Watches',
    subCategory: ['Analog Watches', 'Smartwatches'],
  },
];

let list = [];

alist.forEach(product => {
  if (list.length == 0) {
    list[0] = {
      category: product.category,
      subcategory: [product.subcategory],
    };
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].category == product.category) {
      if (!list[i].subcategory.includes(product.subcategory)) {
        list[i].subcategory.push(product.subcategory);
        return;
      } else {
        return;
      }
    } else if (i == list.length - 1 && list[i].category != product.category) {
      list[i + 1] = {
        category: product.category,
        subcategory: [product.subcategory],
      };
    }
  }
});

//
function sortCategoriesAlphabetically(categoriesArray) {
  // Sort the categories alphabetically based on the 'category' property
  categoriesArray.sort((a, b) => {
    const categoryA = a.category.toLowerCase();
    const categoryB = b.category.toLowerCase();

    if (categoryA < categoryB) {
      return -1;
    }
    if (categoryA > categoryB) {
      return 1;
    }
    return 0;
  });
  return categoriesArray;
}
//

list = sortCategoriesAlphabetically(list);

list.forEach(item => {
  item.subcategory = item.subcategory.sort();
});

const departmentsSideMenu = document.getElementById(
  'product-categories-menu-body'
);

list.forEach((element, index) => {
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
                  ${capitalizeWords(element.category)}
                </button>
              </h2>
              <div
                id="flush-collapse-${index}"
                class="accordion-collapse collapse"
                data-bs-parent="#product-categories-menu-body"
              >
                <div class="accordion-body">
                  <ul class="list-group list-group-flush">
                    ${getSubCategories(element.subcategory)}
                    
                  </ul>
                </div>
              </div>
            </div>
  `;
});

list.forEach(element => {
  element.subcategory.forEach(item => {
    document
      .getElementById(`${item}-link`)
      .addEventListener('click', () => saveSelectedProductCategory(item));
  });
});
function getSubCategories(element) {
  let listOfSubcategories = '';
  element.forEach(categories => {
    listOfSubcategories += `<a id="${categories}-link" href="./category.html" class="list-group-item">${capitalizeWords(
      categories
    )}</a>`;
  });
  return listOfSubcategories;
}

function saveSelectedProductCategory(selectedCategory) {
  let selectedProductCategory = { selectedCategory };

  localStorage.setItem(
    'categorySelected',
    JSON.stringify(selectedProductCategory)
  );
}
