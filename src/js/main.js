/* ******************************************
 ** Importing all the neccessary tools.
 ** *************************************** */
import { heroSlideShow } from "./utility.mjs";

const imageList = [
  "barbecue.jpg",
  "Fried-salmon.jpg",
  "fruit-juice.jpg",
  "fruit-splash.jpg",
  "grilled-chicken.jpg",
  "served-food.jpg",
  "set-of-foods.jpg",
  "Sushi.jpg",
];
const imgElement = document.getElementById("heros");

heroSlideShow(imageList, imgElement);
