/* ******************************************
 ** Importing all the neccessary tools.
 ** *************************************** */
import { loadHeaderFooter, getParameter } from "./utility.mjs";
import Meals from "./meal-list.mjs";

/* ******************************************
 ** Calling the loadHeaderFooter function to
 ** action.
 ** *************************************** */
loadHeaderFooter();

/* ******************************************
 ** Extracting the parameter from the URL
 ** and create a new instance of the meals
 ** class to render the meals dynamically.
 ** *************************************** */
const categoryName = getParameter("category");
const meals = new Meals(categoryName);
meals.init();
