import { BIG_DATA_URL, SMALL_DATA_URL } from "./staticData";
const fetch = require("node-fetch");

export function getData(bool) {
  if (bool === true) {
    return fetch(BIG_DATA_URL)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => error.message);
  } else if (bool === false) {
    return fetch(SMALL_DATA_URL)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => error.message);
  }
}
