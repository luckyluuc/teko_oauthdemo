import { getDiscovery } from "./modules/discovery.js";
import { openLoginForm } from "./modules/login.js";
import { tokenRefreshRequest, tokenRequest } from "./modules/token.js";
import {
  getCustomerDataRequest,
  saveCustomerDataRequest,
} from "./modules/customerdata.js";
import elements from "./utilities/getElements.js";
import { getCodeChallenge } from "./utilities/codeChallenge.js";

const LOGIN_BASE_URL = "login-dev.swisspass.ch";
const CLIENT_ID = "swisspass_ch_entw";
const LOGIN_REDIRECT_URL = "http://localhost:4200/oauth/callback";

let codeChallenge;
let codeVerifier;

let discoveryData, tokenData, customerData;

document.addEventListener("DOMContentLoaded", async function () {
  codeChallenge = await getCodeChallenge();
  codeVerifier = sessionStorage.getItem("codeVerifier");

  discoveryData = await getDiscovery(LOGIN_BASE_URL, CLIENT_ID);
  if (sessionStorage.getItem("code")) {
    tokenData = await tokenRequest(
      sessionStorage.getItem("code"),
      LOGIN_REDIRECT_URL,
      codeVerifier,
      CLIENT_ID,
      discoveryData.token_endpoint
    );
    sessionStorage.removeItem("code");
    sessionStorage.setItem("refreshToken", tokenData.refresh_token);
    sessionStorage.setItem("accessToken", tokenData.access_token);
  } else {
    openLoginForm(
      discoveryData.authorization_endpoint,
      CLIENT_ID,
      LOGIN_REDIRECT_URL,
      codeChallenge
    );
  }
});

elements.loadCustomerDataButton.addEventListener("click", async function () {
  await tokenRefresh();
  customerData = await getCustomerData();
  showCustomerData(customerData);
  elements.changeCustomerDataButton.removeAttribute("disabled");
});

elements.changeCustomerDataButton.addEventListener("click", async function () {
  for (var i = 0; i < elements.formElements.length; i++) {
    elements.formElements[i].removeAttribute("readonly");
    elements.formElements[i].setAttribute("required", "required");
  }

  elements.anrede.removeAttribute("disabled");
  elements.titel.removeAttribute("disabled");

  elements.saveCustomerDataButton.removeAttribute("disabled");
  elements.changeCustomerDataButton.disabled = true;
  elements.loadCustomerDataButton.disabled = true;
});

elements.customerDataForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  await tokenRefresh();

  // button handling when submitting form
  elements.saveCustomerDataButton.disabled = true;
  elements.changeCustomerDataButton.removeAttribute("disabled");
  elements.loadCustomerDataButton.removeAttribute("disabled");

  // save customer data in customerData object
  customerData.anrede = document.getElementById("anrede").value.toUpperCase();
  customerData.titel = document
    .getElementById("titel")
    .value.toUpperCase()
    .replace(/ /g, "_");
  customerData.name = document.getElementById("name").value;
  customerData.vorname = document.getElementById("vorname").value;
  customerData.geburtsdatum = document.getElementById("geburtsdatum").value;
  customerData.adresse.strasseHnr = document.getElementById("strasseHnr").value;
  customerData.adresse.plz = document.getElementById("plz").value;
  customerData.adresse.ort = document.getElementById("ort").value;
  customerData.adresse.land = document.getElementById("land").value;
  customerData.korrespondenz.email = document.getElementById("email").value;
  customerData.korrespondenz.mobil = document.getElementById("mobil").value;

  // send customer data to API and save updated customer data in updatedCustomerData object
  let updatedCustomerData = await saveCustomerDataRequest(
    sessionStorage.getItem("accessToken"),
    customerData
  );

  // show updated customer data in output fields
  showCustomerData(updatedCustomerData);

  // disable select-form fields
  elements.anrede.setAttribute("disabled", "disabled");
  elements.titel.setAttribute("disabled", "disabled");

  // set readonly for input-form fields and remove required
  for (var i = 0; i < elements.formElements.length; i++) {
    elements.formElements[i].removeAttribute("required");
    elements.formElements[i].setAttribute("readonly", "readonly");
  }
});

async function getCustomerData() {
  customerData = await getCustomerDataRequest(
    sessionStorage.getItem("accessToken")
  );
  return customerData;
}

function showCustomerData(customerData) {
  // show customer data in output fields
  // personal data
  document.getElementById("anrede").value = toTitleCase(customerData.anrede);
  if (customerData.titel != "NO_TITLE") {
    document.getElementById("titel").value = customerData.titel;
  } else {
    document.getElementById("titel").value = "no title";
  }
  document.getElementById("name").value = customerData.name;
  document.getElementById("vorname").value = customerData.vorname;
  document.getElementById("geburtsdatum").value = customerData.geburtsdatum;
  // address data
  document.getElementById("strasseHnr").value = customerData.adresse.strasseHnr;
  document.getElementById("plz").value = customerData.adresse.plz;
  document.getElementById("ort").value = customerData.adresse.ort;
  document.getElementById("land").value = customerData.adresse.land;
  // contact data
  document.getElementById("email").value = customerData.korrespondenz.email;
  document.getElementById("mobil").value = customerData.korrespondenz.mobil;
}

function toTitleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

//tokenRefresh function
async function tokenRefresh() {
  try {
    tokenData = await tokenRefreshRequest(
      sessionStorage.getItem("refreshToken"),
      CLIENT_ID,
      discoveryData.token_endpoint
    );
    sessionStorage.setItem("refreshToken", tokenData.refresh_token);
    sessionStorage.setItem("accessToken", tokenData.access_token);
  } catch (error) {
    console.log(error);
  }
}
