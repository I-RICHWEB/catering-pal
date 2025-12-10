/* ******************************************
 ** Importing all the neccessary tools.
 ** *************************************** */
import { heroSlideShow, loadHeaderFooter, navViewLink } from "./utility.mjs";
import Categories from "./categories.mjs";
import { renderRecentlyViewed } from "./recentView.mjs";

/* ******************************************
 ** Calling the heroSlideShow function to action
 ** *************************************** */
heroSlideShow();

/* ******************************************
 ** Calling the loadHeaderFooter function to
 ** action.
 ** *************************************** */
loadHeaderFooter();

/* ******************************************
 ** Creating a new instance of the category
 ** class and initializing it.
 ** *************************************** */
const category = new Categories();
category.init();

/* ******************************************
 ** Calling the renderRecentlyViewed meals
 ** function.
 ** *************************************** */
renderRecentlyViewed();
