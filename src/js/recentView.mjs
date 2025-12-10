/* ******************************************
 ** Importing all the neccessary tools.
 ** *************************************** */
import {
  addToLocalStorage,
  getLocalStorageItem,
  checkMealExistence,
} from "./utility.mjs";
import ApiServices from "./apiServices.mjs";

/* ******************************************
 ** Creating a new instance of the API services
 ** *************************************** */
const api = new ApiServices();

/* ******************************************
 ** Setting the recent viewed storage list.
 ** Also setting the key of the storage.
 ** *************************************** */
const storageData = [];
const storeKey = "recentlyViewed";

/* **********************************************
 ** These following functions will use the meal id that will be
 ** pass in from the meal-details file to look
 ** up the meal and store it in localStorage if
 ** the meal does not previously exit in the
 ** storage. Then it will dynamically render it
 ** on the home page as a recently viewed meal.
 ** The maximum is going to be four(4) meals.
 ** ****************************************** */

// Getting the meal object from the API
async function getMeal(id) {
  try {
    const meal = await api.getMealDetailsById(id);
    return meal.meals[0];
  } catch (error) {
    console.log(error);
  }
}

// Setting localStorage.
export async function addMealToLocalStorage(id) {
  const mealData = await getMeal(id);
  if (localStorage.getItem(storeKey) !== null) {
    const storage = getLocalStorageItem(storeKey);
    const exist = checkMealExistence(mealData, storage);
    if (!exist) {
      if (storage.length === 4) {
        storage.pop();
        storage.unshift(mealData);
        addToLocalStorage(storeKey, storage);
      } else {
        storage.unshift(mealData);
        addToLocalStorage(storeKey, storage);
      }
    } else {
      return;
    }
  } else {
    storageData.push(mealData);
    addToLocalStorage(storeKey, storageData);
  }
}

// Recently viewed template
function recentViewedTemplate(item) {
  const li = document.createElement("li");
  li.setAttribute("class", "card");
  li.innerHTML = `
        <a href="/meal-page/?id=${item.idMeal}">
        <div class="recent-img-con">
        <img class="recent-image" src="${item.strMealThumb}" alt="${item.strMeal}-meal.jpg" />
        </div>
        <h3 id="recent-name">${item.strMeal}</h3>
        <p id="recent-category">Category: ${item.strCategory}</p>
        </a>`;
  return li;
}

// Rendering recently viewed meals.
export function renderRecentlyViewed() {
  const parentElement = document.querySelector(".cardlist");
  if (localStorage.getItem(storeKey) !== null) {
    const storageItem = getLocalStorageItem(storeKey);
    storageItem.forEach((meal) => {
      const mealCard = recentViewedTemplate(meal);
      parentElement.appendChild(mealCard);
    });
  } else {
    const section = document.querySelector("#recent-sect");
    section.classList.add("close");
  }
}
