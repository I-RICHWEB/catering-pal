import js from "@eslint/js";

/* ******************************************
 ** Calling the import to import the base url
 ** of the API into the module.
 ** *************************************** */
const baseUrl = import.meta.env.VITE_SERVER_URL;
const key = import.meta.env.VITE_SERVER_KEY;
const host = import.meta.env.VITE_SERVER_HOST;

/* ******************************************
 ** Creating a custom function to convert the
 ** data to JSON object and handle the error.
 ** *************************************** */
function convertToJson(data) {
  const jsonData = data.json();
  if (jsonData) {
    return jsonData;
  } else {
    throw { name: "InternalErrors", message: jsonData };
  }
}

/* ******************************************
 ** Creating a class of the API services module
 ** to handle all the API related request.
 ** *************************************** */
export default class ApiServices {
  constructor() {
    this.options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": host,
      },
    };
  }

  /* ******************************************
   ** This function will be the util function to
   ** to get data from the API with different endpoint.
   ** *************************************** */
  async getDataFromApi(endpoint, param = null) {
    if (param) {
      const res = await fetch(`${baseUrl}${endpoint}${param}`, this.options);
      const jsonData = await convertToJson(res);
      return jsonData;
    } else {
      const res = await fetch(`${baseUrl}${endpoint}`, this.options);
      const jsonData = await convertToJson(res);
      return jsonData;
    }
  }

  /* ******************************************
   ** This function will request the meals categories
   ** from the Api and call on the convert to json
   ** to convert the data it returns.
   ** *************************************** */
  async getMealsCategories() {
    const categoryEndpoint = "categories.php";
    const data = await this.getDataFromApi(categoryEndpoint);
    return data;
  }

  /* ******************************************
   ** This function will get the meals from the api
   ** using the category name that will be extracted
   ** from the url and passed in through the param argument .
   ** *************************************** */
  async getMealsListByCategoryName(params) {
    const listEndpoint = "filter.php?c=";
    const data = await this.getDataFromApi(listEndpoint, params);
    return data;
  }

  /* ******************************************
   ** This function will get a meal details from the api
   ** using the meal ID that will be extracted
   ** from the url and passed in through the param argument .
   ** *************************************** */
  async getMealDetailsById(params) {
    const singleMealEndpoint = "lookup.php?i=";
    const data = await this.getDataFromApi(singleMealEndpoint, params);
    return data;
  }
}
