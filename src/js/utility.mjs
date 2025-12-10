/* ******************************************
 ** This function is going to be use for the
 ** hero images slide show.
 ** *************************************** */
export function heroSlideShow() {
  const images = [
    "barbecue.jpg",
    "Fried-salmon.jpg",
    "fruit-juice.jpg",
    "fruit-splash.jpg",
    "grilled-chicken.jpg",
    "served-food.jpg",
    "set-of-foods.jpg",
    "Sushi.jpg",
  ];
  const element = document.getElementById("heros");

  const path = "./images/heros/";
  let index = 0;

  function updateImageSrc() {
    element.src = `${path}${images[index]}`;
    element.alt = images[index];

    index = (index + 1) % images.length;
  }

  updateImageSrc();
  setInterval(updateImageSrc, 3000);
}

/* ******************************************
 ** This function is going to load the header
 ** and footer from the partials folder.
 ** *************************************** */
export async function loadTemplate(path) {
  const template = (await fetch(path)).text();
  return template;
}

/* ******************************************
 ** This function is going to render the HTML
 ** into the document that is calling it.
 ** *************************************** */
export function renderTemplate(htmlTemplate, parentElement, data, callback) {
  parentElement.innerHTML = htmlTemplate;

  if (callback) {
    callback(data);
  }
}

/* ******************************************
 ** This function is going to load the header
 ** and footer from the partials folder.
 ** *************************************** */
export async function loadHeaderFooter() {
  const headerData = await loadTemplate("../partials/header.html");
  const footerData = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector(".headings");
  const footerElement = document.querySelector(".footer");
  renderTemplate(headerData, headerElement);
  renderTemplate(footerData, footerElement);
  navViewLink();
}

/* ******************************************
 ** This function will get parameters from the
 ** the URL and will return it.
 ** *************************************** */
export function getParameter(key) {
  const searchStr = window.location.search;
  const pageUrl = new URLSearchParams(searchStr);
  const parameter = pageUrl.get(key);
  return parameter;
}

/* ******************************************
 ** This function will set items to localStorage
 ** *************************************** */
export function addToLocalStorage(key, mealData) {
  localStorage.setItem(key, JSON.stringify(mealData));
}

/* ******************************************
 ** This function will get localStorage items
 ** and return it back as a json object.
 ** *************************************** */
export function getLocalStorageItem(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

/* ******************************************
 ** This function will check for the existence
 ** of meals in the localStorage and return a
 ** boolean.
 ** *************************************** */
export function checkMealExistence(meal, storageItem) {
  const exist = storageItem.some((ml) => ml.idMeal === meal.idMeal);
  return exist;
}

/* ******************************************
 ** This function will toggle the nav link for
 ** small screen sizes.
 ** *************************************** */
export function navViewLink() {
  const btn = document.getElementById("select-nav");
  const slide = document.getElementById("nav-link");

  btn.addEventListener("click", () => {
    slide.classList.toggle("show");
  });
}
