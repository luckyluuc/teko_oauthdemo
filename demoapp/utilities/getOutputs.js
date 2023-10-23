// get data output fields from index.html
const discoveryDataOutput = document.getElementById("discoveryDataOutput");
const authorizationCodeOutput = document.getElementById(
  "authorizationCodeOutput"
);
const tokenDataOutput = document.getElementById("tokenDataOutput");
const accessTokenDataOutputs = document.getElementsByClassName(
  "accessTokenDataOutput"
);
const refreshTokenDataOutputs = document.getElementsByClassName(
  "refreshTokenDataOutput"
);
const idTokenDataOutput = document.getElementById("idTokenDataOutput");
const userinfoDataOutput = document.getElementById("userinfoDataOutput");
const authenEmailOutputData = document.getElementById("authenEmailOutputData");
const ssoTicketCustomerDataOutput = document.getElementById(
  "ssoTicketCustomerDataOutput"
);
const ssoTicketLoginDataOutput = document.getElementById(
  "ssoTicketLoginDataOutput"
);
const lastNameOutputData = document.getElementById("lastNameOutputData");
const firstNameOutputData = document.getElementById("firstNameOutputData");
const streetOutputData = document.getElementById("streetOutputData");
const postalCodeOutputData = document.getElementById("postalCodeOutputData");
const cityOutputData = document.getElementById("cityOutputData");
const refreshTokenResponseOutput = document.getElementById(
  "refreshTokenResponseOutput"
);
const revokeTokenResponseOutput = document.getElementById(
  "revokeTokenResponseOutput"
);

const outputs = {
  discoveryDataOutput,
  authorizationCodeOutput,
  tokenDataOutput,
  accessTokenDataOutputs,
  refreshTokenDataOutputs,
  idTokenDataOutput,
  userinfoDataOutput,
  authenEmailOutputData,
  ssoTicketCustomerDataOutput,
  ssoTicketLoginDataOutput,
  lastNameOutputData,
  firstNameOutputData,
  streetOutputData,
  postalCodeOutputData,
  cityOutputData,
  refreshTokenResponseOutput,
  revokeTokenResponseOutput,
};

export default outputs;
