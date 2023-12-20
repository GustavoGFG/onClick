import { capitalizeWords } from './utils.js';

export function createProductCategoryMenu(productArray) {
  let categoryArray = createProductCategoryArray(productArray);

  categoryArray = sortCategoriesAlphabetically(categoryArray);

  const productCategoryMenu = document.getElementById(
    'product-categories-menu-body'
  );

  renderProductCategoryMenu(categoryArray, productCategoryMenu);
}

function createProductCategoryArray(productArray) {
  let categoryArray = [];
  let itemAdded = false;

  productArray.map(product => {
    itemAdded = false;

    if (categoryArray.length === 0) {
      categoryArray = [
        { category: product.category, subcategory: [product.subcategory] },
      ];
    } else {
      for (let item of categoryArray) {
        if (item.category === product.category) {
          if (item.subcategory.includes(product.subcategory)) {
            return;
          } else {
            item.subcategory.push(product.subcategory);
            itemAdded = true;
          }
        }
      }
      if (itemAdded == false) {
        categoryArray.push({
          category: product.category,
          subcategory: [product.subcategory],
        });
      }
    }
  });
  return categoryArray;
}

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

function renderProductCategoryMenu(categoryArray, productCategoryMenu) {
  categoryArray.forEach((element, index) => {
    productCategoryMenu.innerHTML += `
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
                
                ${getSubCategories(element.subcategory.sort())}
                  
                </ul>
                </div>
            </div>
          </div>
`;
  });
}

function getSubCategories(element) {
  let listOfSubcategories = '';
  element.forEach(categories => {
    listOfSubcategories += `<a id="${categories}-link" href="/products?department=${categories}" class="list-group-item">${capitalizeWords(
      categories
    )}</a>`;
  });
  return listOfSubcategories;
}
