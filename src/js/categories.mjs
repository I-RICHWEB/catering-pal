/* ******************************************
 ** Importing all the neccessary tools.
 ** *************************************** */
import ApiServices from "./apiServices.mjs";
import { renderTemplate } from "./utility.mjs";

/* ******************************************
 ** Making a new instance of the ApiServices
 ** class.
 ** *************************************** */
const apiService = new ApiServices();

/* ******************************************
 ** This default Categories class will be used
 ** to fetch and collect the data from the API
 ** and dynamically render the object data to
 ** the home page.
 ** *************************************** */
export default class Categories {
  constructor() {
    this.categories = apiService.getMealsCategories();
  }
  /* ******************************************
   ** The method will be use to generate the
   ** categories card template.
   ** *************************************** */
  categoryTemplate(cateData) {
    const li = document.createElement("li");
    li.setAttribute("class", "card");
    li.innerHTML = `
        <a href="/mealList/?category=${cateData.strCategory}">
        <div class="cate-img-con">
        <img class="cate-img" src="${cateData.strCategoryThumb}" alt="${cateData.strCategory}-category.jpg" />
        </div>
        <h3>${cateData.strCategory}</h3>
        <p>${cateData.strCategoryDescription}</p>
        </a>`;
    return li;
  }

  /* ******************************************
   ** This method will be use to render the category.
   ** *************************************** */
  async renderCategoryWithTemplate() {
    const categoryElement = document.querySelector(".category");
    categoryElement.innerHTML = "<li> Loading categories...</li>";
    try {
      const categoryData = await this.categories;
      if (categoryData.categories.length > 0) {
        categoryElement.innerHTML = "";
        categoryData.categories.forEach((category) => {
          const categoryCard = this.categoryTemplate(category);
          categoryElement.appendChild(categoryCard);
        });
      } else {
        const loader = document.createElement("li");
        loader.innerHTML =
          "<p>Error in loading categories from the server.</p>";
        categoryElement.appendChild(loader);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  /* ******************************************
   ** Initializing the class method.
   ** *************************************** */
  init() {
    this.renderCategoryWithTemplate();
  }
}
