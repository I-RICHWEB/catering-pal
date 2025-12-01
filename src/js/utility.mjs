/* ******************************************
 ** This function is going to be use for the
 ** hero images slide show.
 ** *************************************** */
export function heroSlideShow(images, element) {
  const path = "./images/heros/";
  let index = 0;

  function updateImageSrc() {
    element.src = `${path}${images[index]}`;
    element.alt = images[index];

    index = (index + 1) % images.length;
  }

  updateImageSrc();
  setInterval(updateImageSrc, 5000);
}
