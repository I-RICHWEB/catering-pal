/* ******************************************
 ** Importing all the neccessary tools.
 ** *************************************** */
import { loadHeaderFooter, getParameter } from "./utility.mjs";
import MealDetails from "./mealDetails.mjs";

/* ******************************************
 ** Calling the loadHeaderFooter function to
 ** action.
 ** *************************************** */
loadHeaderFooter();

/* ******************************************
 ** This will use the getParameter function to
 ** get the id from the url and then,
 ** create a new instance of the mealDetais
 ** class with the id passed in.
 ** *************************************** */
const id = getParameter("id");
const mealDetails = new MealDetails(id);
mealDetails.init();
