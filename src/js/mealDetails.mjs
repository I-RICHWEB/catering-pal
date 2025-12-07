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
 ** This function will be use to render the
 ** dropdown button items.
 ** *************************************** */
function dropDownItems(mealDetails, droplist) {
  const target = 20;
  let index = 1;

  for (let i = 1; i <= target; i++) {
    const ingredient = mealDetails["strIngredient" + i];
    const measurement = mealDetails["strMeasure" + i];
    if (ingredient && ingredient.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = `${index}. ${ingredient} (${measurement || ""})`;
      droplist.appendChild(li);
      index++;
    }
  }
}

/* ******************************************
 ** This class will use the API services to get
 ** each meal details and render it the meal
 ** details page.
 ** *************************************** */
export default class MealDetails {
  constructor(param) {
    this.parameter = param;
    this.meal = api.getMealDetailsById(this.parameter);
  }

  /* ******************************************
   ** This method will use each meal to build
   ** a template for page rendering.
   ** *************************************** */
  renderMealTemplateDetails(meal) {
    const img = document.querySelector(".details-image");
    img.setAttribute("src", meal.strMealThumb);
    img.setAttribute("alt", meal.strMeal);

    const name = document.getElementById("meal-name");
    name.innerHTML = `<strong>Name:</strong> ${meal.strMeal}`;

    const mealCate = document.getElementById("meal-category");
    mealCate.innerHTML = `<strong>Category:</strong> ${meal.strCategory}`;

    const area = document.getElementById("meal-area");
    area.innerHTML = `<strong>Area:</strong> ${meal.strArea}`;

    const tag = document.getElementById("meal-tags");
    tag.innerHTML = `<strong>Tags:</strong> ${meal.strTags}`;

    const instruction = document.getElementById("instruction");
    instruction.innerHTML = `<strong>Instructions:</strong> ${meal.strInstructions}`;

    const youTube = document.getElementById("meal-youTube");
    youTube.setAttribute("href", meal.strYoutube);
    youTube.textContent = "Watch YouTube Video";

    const dropList = document.querySelector("#meal-guide");
    dropDownItems(meal, dropList);
  }

  /* ******************************************
   ** This function will call the apiServices to
   ** get the meals by id and call renderMealTemplate
   ** details to fill in all the information into the
   ** Template elements on the page.
   ** *************************************** */
  async renderMealDetails() {
    try {
      const mealData = await this.meal;
      if (mealData.meals.length > 0) {
        const meal = mealData.meals[0];
        this.renderMealTemplateDetails(meal);
      } else {
        const res = document.querySelector("main");
        res.innerHTML = "";
        const p = document.createElement("p");
        p.textContent =
          "Error in loading the meal details, check your network and try reloading.";
        res.appendChild(p);
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  /* ******************************************
   ** This function initialize the class.
   ** *************************************** */
  init() {
    this.renderMealDetails();

    const dropBtn = document.getElementById("dropdown-btn");
    const ingredMeasure = document.querySelector("#meal-guide");
    const instruct = document.getElementById("instruction");
    const sign = document.getElementById("sign");

    dropBtn.addEventListener("click", () => {
      ingredMeasure.classList.toggle("learn");
      instruct.classList.toggle("learn");
      sign.classList.toggle("learn");
    });
  }
}
