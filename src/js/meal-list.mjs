/* ******************************************
 ** Importing all the neccessary tools.
 ** *************************************** */
import ApiServices from "./apiServices.mjs";

/* ******************************************
 ** Creating a new instance of the APIService
 ** class.
 ** *************************************** */
const api = new ApiServices();

/* ******************************************
 ** This class will call the ApiServices to
 ** get the meals by category and use a
 ** template model to render the meals into
 ** mealListing page.
 ** *************************************** */
export default class Meals {
  constructor(param) {
    this.parameter = param;
    this.meals = api.getMealsListByCategoryName(this.parameter);
  }

  /* ******************************************
   ** This method will use each meal to build
   ** and return a template for rendering.
   ** *************************************** */
  mealsTemplate(meal) {
    const li = document.createElement("li");
    li.setAttribute("class", "meal-card");
    li.innerHTML = `
        <a href="/meal-page/?id=${meal.idMeal}">
        <div class="cate-img-con">
        <img class="cate-img" src="${meal.strMealThumb}" alt="${meal.strMeal}-meal.jpg" />
        </div>
        <h3>${meal.strMeal}</h3>
        </a>`;
    return li;
  }

  /* ******************************************
   ** This function will call the apiServices to
   ** get the meals by category and use the template
   ** to render the meals to the page.
   ** *************************************** */
  async renderMealList() {
    const mealListElement = document.querySelector(".list");
    mealListElement.innerHTML = "<li> Loading meals...</li>";
    try {
      const mealsData = await this.meals;
      if (mealsData.meals.length > 0) {
        mealListElement.innerHTML = "";
        mealsData.meals.forEach((meal) => {
          const mealCard = this.mealsTemplate(meal);
          mealListElement.appendChild(mealCard);
        });
      } else {
        mealListElement.innerHTML = "";
        const res = document.createElement("li");
        res.innerHTML = "<p>Error in loading categories from the server.</p>";
        mealListElement.appendChild(res);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  /* ******************************************
   ** This function initialize the class.
   ** *************************************** */
  init() {
    this.renderMealList();
  }
}
