/* ******************************************
 ** Importing all the neccessaries tools needed
 ** *************************************** */
import {
  getLocalStorageItem,
  addToLocalStorage,
  checkMealExistence,
} from "./utility.mjs";
import ApiServices from "./apiServices.mjs";

const api = new ApiServices();

/* ******************************************
 ** This class is going to handles adding and
 ** removing of meals form the learned list.
 ** *************************************** */
export default class SettingLearned {
  constructor(id) {
    this.Id = id;
    this.storeKey = "learned";
    this.storeItem = [];
    this.meal = api.getMealDetailsById(this.Id);
  }

  async getMeal() {
    try {
      const meal = await this.meal;
      return meal.meals[0];
    } catch (error) {
      console.log(error);
    }
  }

  async setLearnedLocalStorage() {
    const theMeal = await this.getMeal();
    if (localStorage.getItem(this.storeKey) !== null) {
      const storage = getLocalStorageItem(this.storeKey);
      const exist = checkMealExistence(theMeal, storage);
      if (!exist) {
        storage.push(theMeal);
        addToLocalStorage(this.storeKey, storage);
        this.setButton();
      } else {
        return;
      }
    } else {
      this.storeItem.push(theMeal);
      addToLocalStorage(this.storeKey, this.storeItem);
      this.setButton();
    }
  }

  async removeMealFromLearned() {
    const meal = await this.getMeal();
    const store = getLocalStorageItem(this.storeKey);
    const mealIndex = store.findIndex((item) => item.idMeal === meal.idMeal);
    if (mealIndex !== -1) {
      store.splice(mealIndex, 1);
      addToLocalStorage(this.storeKey, store);
      this.setButton();
    }
  }

  async setButton() {
    const meal = await this.getMeal();
    if (localStorage.getItem(this.storeKey) !== null) {
      const storage = getLocalStorageItem(this.storeKey);
      const checkExist = checkMealExistence(meal, storage);
      const btnElement = document.getElementById("add-learn");
      const indicator = document.getElementById("meal-learn");
      if (checkExist) {
        if (btnElement.textContent == "Add To Learned") {
          btnElement.textContent = "Remove From Learned";
          indicator.innerHTML = `<strong>Learned:</strong> <span class="indicate">✅✅✅</span>`;
        }
      } else {
        btnElement.textContent = "Add To Learned";
        indicator.innerHTML = "";
      }
    }
  }

  init() {
    this.setButton();
    const btn = document.getElementById("add-learn");
    btn.addEventListener("click", () => {
      if (btn.textContent == "Add To Learned") {
        this.setLearnedLocalStorage();
      } else {
        this.removeMealFromLearned();
      }
    });
  }
}

/* ******************************************
 ** This class is going to check localStorage
 ** for meals that has been added as learned.
 ** Then render them to the learned meals page.
 ** *************************************** */
export class RenderLearnedMeals {
  constructor() {
    this.key = "learned";
  }
  /* ******************************************
   ** This method will use each meal to build
   ** and return a template for rendering.
   ** *************************************** */
  learnedMealsTemplate(meal) {
    const li = document.createElement("li");
    li.setAttribute("class", "meal-card");
    li.innerHTML = `
        <a href="/meal-page/?id=${meal.idMeal}">
        <div class="cate-img-con">
        <img class="cate-img" src="${meal.strMealThumb}" alt="${meal.strMeal}-meal.jpg" />
        </div>
        <h3>${meal.strMeal}</h3>
        <p>Category: ${meal.strCategory}</p>
        </a>`;
    return li;
  }

  renderLearnedMeal() {
    if (localStorage.getItem(this.key)) {
      const meals = getLocalStorageItem(this.key);
      const parentElem = document.querySelector(".meal");
      if (meals.length > 0) {
        parentElem.innerHTML = "";
        meals.forEach((meal) => {
          const mealList = this.learnedMealsTemplate(meal);
          parentElem.appendChild(mealList);
        });
      }
    }
  }
  init() {
    this.renderLearnedMeal();
  }
}
