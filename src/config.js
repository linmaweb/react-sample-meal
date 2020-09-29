/***********************************************************/
/* need a valid app id and key from https://api.edamam.com */
/***********************************************************/

const APP_ID = `YOUR APP ID HERE`; // need a valid app id
const APP_KEY = `YOUR APP KEY HERE`; // need a valid app key

export const URL_CORS = `https://cors-anywhere.herokuapp.com/`;
export const URL_BASE = `https://api.edamam.com/search?q=`;
export const URL_API = `app_id=${APP_ID}&app_key=${APP_KEY}`;

export const SEARCH_DEFAULT = {
  default: "salad",
  from: 0,
  to: 60,
};
