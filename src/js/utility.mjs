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
