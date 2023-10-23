import { getDiscovery } from "./modules/discovery.js";
import { openLoginForm, silentLogin } from "./modules/login.js";
import {
  tokenRefreshRequest,
  tokenRequest,
  tokenRevokeRequest,
} from "./modules/token.js";
import { parseJwt } from "./utilities/parser.js";
import { logoutRequest } from "./modules/logout.js";
import { userinfoRequest } from "./modules/userinfo.js";
import { getSsoTicket } from "./modules/ssoTicket.js";
import { jumpToLogindata } from "./modules/logindata.js";
import { jumpToCustomerdata } from "./modules/customerdata.js";
import { openRegistrationForm } from "./modules/register.js";
import { openPasswordResetForm } from "./modules/pw-reset.js";
import outputs from "./utilities/getOutputs.js";
import buttons from "./utilities/getButtons.js";
import { getCodeChallenge } from "./utilities/codeChallenge.js";

// set default values and export baseUrls to also use them inside modules/setExampleContent.js
// different settings for localhost
const PAGE_URL = "https://demo.login-test.swisspass.ch"; // später durch window.location.href ersetzen
const REGEX_LOGIN_BASE_URL = /https:\/\/demo\.([^/]+\.[^/]+)$/;
export const LOGIN_BASE_URL = PAGE_URL.match(REGEX_LOGIN_BASE_URL)[1];
const CLIENT_ID =
  LOGIN_BASE_URL === "login-dev.swisspass.ch"
    ? "swisspass_demo_entw"
    : "swisspass_demo_test";
const LOGIN_REDIRECT_URL = "http://localhost:4200/oauth-demo/callback"; // später ersetzen durch PAGE_URL + "/oauth-demo/callback"
const LOGOUT_REDIRECT_URL = "http://localhost:4200/oauth-demo/logout"; // später ersetzen durch PAGE_URL + "/oauth-demo/logout"
export const WWW_BASE_URL =
  CLIENT_ID === "swisspass_demo_entw"
    ? "www-deva.swisspass.ch"
    : "www-test.swisspass.ch";
const PROVIDER_ID = "demo";

// set sessionStorage items
sessionStorage.setItem("login_base_url", LOGIN_BASE_URL);
sessionStorage.setItem("after_logout_redirect_uri", LOGOUT_REDIRECT_URL);

let discoveryData,
  tokenData,
  userinfoData,
  ssoTicketData,
  codeChallenge,
  codeVerifier;

// state handling
let isLoggedIn;
if (sessionStorage.getItem("logged_in")) {
  isLoggedIn = true;
} else {
  isLoggedIn = false;
}

// elements to show / collapse
const accordionLoggedOut = document.getElementById("accordionLoggedOut");
const accordionLoggedIn = document.getElementById("accordionLoggedIn");

// show / collapse elements pending on isLoggedIn state
if (isLoggedIn) {
  accordionLoggedOut.style.display = "none";
  accordionLoggedIn.style.display = "block";
} else {
  accordionLoggedOut.style.display = "block";
  accordionLoggedIn.style.display = "none";
}

// on page load
document.addEventListener("DOMContentLoaded", async function () {
  codeChallenge = await getCodeChallenge();
  codeVerifier = sessionStorage.getItem("codeVerifier");

  try {
    //get discoveryData on page load for silentLogin
    discoveryData = await getDiscovery(LOGIN_BASE_URL, CLIENT_ID);
    // check if unsuccesful silentLogin attempt was made (there would be an error inside sessionStorage)
    // check if user is logged in (there would be a code inside sessionStorage)
    if (!sessionStorage.getItem("error") && !sessionStorage.getItem("code")) {
      silentLogin(
        discoveryData.authorization_endpoint,
        CLIENT_ID,
        LOGIN_REDIRECT_URL,
        codeChallenge
      );
    }
  } catch (error) {
    displayError(outputs.discoveryDataOutput, error);
  }
});

/* the following buttons will be shown
when the user is logged out */
buttons.discoveryButton.addEventListener("click", async () => {
  try {
    discoveryData = await getDiscovery(LOGIN_BASE_URL, CLIENT_ID);
    outputs.discoveryDataOutput.value = JSON.stringify(discoveryData, null, 2);
    buttons.loginButton.removeAttribute("disabled");
  } catch (error) {
    displayError(outputs.discoveryDataOutput, error);
  }
});

buttons.loginButton.addEventListener("click", () => {
  openLoginForm(
    discoveryData.authorization_endpoint,
    CLIENT_ID,
    LOGIN_REDIRECT_URL,
    codeChallenge
  );
});

buttons.registrationButton.addEventListener("click", () => {
  openRegistrationForm(WWW_BASE_URL, PROVIDER_ID);
});

buttons.passwordResetButton.addEventListener("click", () => {
  openPasswordResetForm(LOGIN_BASE_URL, PROVIDER_ID);
});

// if there's an authorization code in sessionStorage, show it
if (sessionStorage.getItem("code")) {
  outputs.authorizationCodeOutput.value = sessionStorage.getItem("code");
}

// get the tokens and show them
buttons.tokenButton.addEventListener("click", async () => {
  // disable token button, as you can get tokens only once with authorization code
  buttons.tokenButton.setAttribute("disabled", true);
  try {
    tokenData = await tokenRequest(
      sessionStorage.getItem("code"),
      LOGIN_REDIRECT_URL,
      codeVerifier,
      CLIENT_ID,
      discoveryData.token_endpoint
    );

    // add refresh token and access token to sessionStorage
    sessionStorage.setItem("refreshToken", tokenData.refresh_token);
    sessionStorage.setItem("accessToken", tokenData.access_token);

    // show token data on output fields
    outputs.tokenDataOutput.value = JSON.stringify(tokenData, null, 2);
    outputs.idTokenDataOutput.value = JSON.stringify(
      parseJwt(tokenData.id_token),
      null,
      2
    );
    Array.from(outputs.accessTokenDataOutputs).forEach((e) => {
      e.value = JSON.stringify(
        parseJwt(sessionStorage.getItem("accessToken")),
        null,
        2
      );
    });
    Array.from(outputs.refreshTokenDataOutputs).forEach((e) => {
      e.value = JSON.stringify(
        sessionStorage.getItem("refreshToken"),
        null,
        2
      ).slice(1, -1);
    });
  } catch (error) {
    // if request fails and enable login button and show errormessage
    buttons.redoLoginButton.removeAttribute("disabled");
    displayError(outputs.tokenDataOutput, error);
  }
});

// open login form
buttons.redoLoginButton.addEventListener("click", () => {
  openLoginForm(
    discoveryData.authorization_endpoint,
    CLIENT_ID,
    LOGIN_REDIRECT_URL,
    codeChallenge
  );
});

/* the following buttons will be shown
when the user is logged in */
buttons.tokenRefreshButton.addEventListener("click", async () => {
  // if following request fails, logout is triggered -> see doTokenRefresh()
  doTokenRefresh(outputs.refreshTokenResponseOutput);
});
//end of token

//logindata
buttons.userinfoButton.addEventListener("click", async () => {
  // if this request fails, logout is triggered -> see doTokenRefresh()
  await doTokenRefresh(outputs.userinfoDataOutput);
  userinfoData = await userinfoRequest(
    sessionStorage.getItem("accessToken"),
    discoveryData.userinfo_endpoint
  );

  // add userinfo data to output fields
  outputs.userinfoDataOutput.value = JSON.stringify(userinfoData, null, 2);
  outputs.authenEmailOutputData.innerHTML = userinfoData.authenEmail;
});

buttons.ssoTicketLoginDataButton.addEventListener("click", async () => {
  // if this request fails, logout is triggered -> see doTokenRefresh()
  await doTokenRefresh(outputs.ssoTicketLoginDataOutput);
  ssoTicketData = await getSsoTicket(
    LOGIN_BASE_URL,
    CLIENT_ID,
    sessionStorage.getItem("accessToken")
  );

  // add sso ticket to output field
  outputs.ssoTicketLoginDataOutput.value = JSON.stringify(
    ssoTicketData,
    null,
    2
  );

  // enable change login data button
  buttons.changeLoginDataButton.removeAttribute("disabled");
});

buttons.changeLoginDataButton.addEventListener("click", () => {
  jumpToLogindata(
    LOGIN_BASE_URL,
    WWW_BASE_URL,
    ssoTicketData.sso_ticket,
    PROVIDER_ID
  );
});
//end of logindata

//customer data
buttons.userinfoCustomerDataButton.addEventListener("click", async () => {
  // if this request fails, logout is triggered -> see doTokenRefresh()
  await doTokenRefresh(outputs.userinfoDataOutput);
  userinfoData = await userinfoRequest(
    sessionStorage.getItem("accessToken"),
    discoveryData.userinfo_endpoint
  );

  // add userinfo data to output fields
  outputs.lastNameOutputData.textContent = userinfoData.sn;
  outputs.firstNameOutputData.textContent = userinfoData.givenname;
  outputs.streetOutputData.textContent = userinfoData.street;
  outputs.postalCodeOutputData.textContent = userinfoData.postalCode;
  outputs.cityOutputData.textContent = userinfoData.l;
});

buttons.ssoTicketCustomerDataButton.addEventListener("click", async () => {
  // if this request fails, logout is triggered -> see doTokenRefresh()
  await doTokenRefresh(outputs.ssoTicketCustomerDataOutput);
  ssoTicketData = await getSsoTicket(
    LOGIN_BASE_URL,
    CLIENT_ID,
    sessionStorage.getItem("accessToken")
  );

  // add sso ticket to output field
  outputs.ssoTicketCustomerDataOutput.value = JSON.stringify(
    ssoTicketData.sso_ticket,
    null,
    2
  ).slice(1, -1);

  // enable change customer data button
  buttons.changeCustomerDataButton.removeAttribute("disabled");
});

buttons.changeCustomerDataButton.addEventListener("click", () => {
  jumpToCustomerdata(
    LOGIN_BASE_URL,
    WWW_BASE_URL,
    ssoTicketData.sso_ticket,
    PROVIDER_ID
  );
});
//end of customerdata

//logout
// add state for AT and RT revoke buttons, to enable logout button only if both buttons were clicked
let revokeATButtonClicked = false;
let revokeRTButtonClicked = false;

buttons.revokeAccessTokenButton.addEventListener("click", async () => {
  try {
    let revokeATInfo = await tokenRevokeRequest(
      sessionStorage.getItem("accessToken"),
      "access_token",
      CLIENT_ID,
      discoveryData.revocation_endpoint
    );

    // add revoke info to output fields
    Array.from(outputs.accessTokenDataOutputs).forEach((e) => {
      e.value = JSON.stringify(revokeATInfo, null, 2).slice(1, -1);
    });
  } catch (error) {
    // if request fails, show error message
    displayError(Array.from(outputs.accessTokenDataOutputs), error);
  }
  // set AT button clicked to true and run enableLogoutButtonIfReady() to enable logout button if both buttons were clicked
  revokeATButtonClicked = true;
  enableLogoutButtonIfReady();
});

buttons.revokeRefreshTokenButton.addEventListener("click", async () => {
  try {
    let revokeRTInfo = await tokenRevokeRequest(
      sessionStorage.getItem("refreshToken"),
      "refresh_token",
      CLIENT_ID,
      discoveryData.revocation_endpoint
    );

    // add revoke info to output fields
    Array.from(outputs.refreshTokenDataOutputs).forEach((e) => {
      e.value = JSON.stringify(revokeRTInfo, null, 2).slice(1, -1);
    });
  } catch (error) {
    // if request fails, show error message
    displayError(Array.from(outputs.refreshTokenDataOutputs), error);
  }
  // set AT button clicked to true and run enableLogoutButtonIfReady() to enable logout button if both buttons were clicked
  revokeRTButtonClicked = true;
  enableLogoutButtonIfReady();
});

// function to check if both revoke buttons were clicked and enable logout button if so
function enableLogoutButtonIfReady() {
  if (revokeATButtonClicked && revokeRTButtonClicked) {
    buttons.logoutButton.removeAttribute("disabled");
  }
}

// logout button
buttons.logoutButton.addEventListener("click", async () => {
  // remove authorization code from sessionStorage if there is one
  if (sessionStorage.getItem("code")) {
    sessionStorage.removeItem("code");
  }
  // do logout with reason "logoutClicked"
  logoutRequest("logoutClicked");
});
//end of logout

//doTokenRefresh function
async function doTokenRefresh(errorOutputField) {
  try {
    tokenData = await tokenRefreshRequest(
      sessionStorage.getItem("refreshToken"),
      CLIENT_ID,
      discoveryData.token_endpoint
    );

    // add/update refresh token and access token to sessionStorage
    sessionStorage.setItem("refreshToken", tokenData.refresh_token);
    sessionStorage.setItem("accessToken", tokenData.access_token);

    // show refreshed token data on output fields
    outputs.tokenDataOutput.value = JSON.stringify(tokenData, null, 2);
    outputs.refreshTokenResponseOutput.value = JSON.stringify(
      tokenData,
      null,
      2
    );
    Array.from(outputs.accessTokenDataOutputs).forEach((e) => {
      e.value = JSON.stringify(
        parseJwt(sessionStorage.getItem("accessToken")),
        null,
        2
      ).slice(2, -2);
    });
    Array.from(outputs.refreshTokenDataOutputs).forEach((e) => {
      e.value = JSON.stringify(
        sessionStorage.getItem("refreshToken"),
        null,
        2
      ).slice(1, -1);
    });
    Array.from(outputs.accessTokenDataOutputs).forEach((e) => {
      e.classList.remove("error");
    });
  } catch (error) {
    displayError(errorOutputField, error);
    setTimeout(() => {
      autoLogout("tokenRefreshFailed");
    }, 5000); // time to show the error message in ms
  }
}

//autoLogout function - is triggered when token refresh fails
async function autoLogout(logoutReason) {
  // revoke access token
  try {
    let accessTokenInfo = await tokenRevokeRequest(
      sessionStorage.getItem("accessToken"),
      "access_token",
      CLIENT_ID,
      discoveryData.revocation_endpoint
    );
    console.log(accessTokenInfo);
  } catch (error) {
    console.log(error);
  }

  // revoke refresh token
  try {
    let refreshTokenInfo = await tokenRevokeRequest(
      sessionStorage.getItem("refreshToken"),
      "refresh_token",
      CLIENT_ID,
      discoveryData.revocation_endpoint
    );
    console.log(refreshTokenInfo);
  } catch (error) {
    console.log(error);
  }
  // pass logout reason through to logoutRequest
  logoutRequest(logoutReason);
}

//display error function
function displayError(elements, error) {
  // if not an array, make it an array, to handle arrays and single elements the same way
  if (!Array.isArray(elements)) {
    elements = [elements];
  }

  elements.forEach((element) => {
    element.classList.add("error");
    element.value = error;
  });
}
