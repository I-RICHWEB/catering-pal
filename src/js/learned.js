/* ******************************************
 ** Importing all the neccessaries tools needed
 ** *************************************** */
import { loadHeaderFooter } from "./utility.mjs";
import { RenderLearnedMeals } from "./Learned.mjs";

/* ******************************************
 ** Calling the loadHeaderFooter function to
 ** action.
 ** *************************************** */
loadHeaderFooter();

/* ******************************************
 ** Creating a new instance of the render learned
 ** meal and initializing it.
 ** *************************************** */
const learned = new RenderLearnedMeals();
learned.init();
