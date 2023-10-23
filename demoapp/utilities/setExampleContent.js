import { LOGIN_BASE_URL, WWW_BASE_URL } from "../main.js";

// set example request values for url, options and params
// discovery
const exampleDiscoveryUrl =
  "https://" +
  LOGIN_BASE_URL +
  "/v3/oev-oauth/rest/oauth2/authorization-servers/&lt;client_id&gt;/.well-known/openid-configuration";
const exampleDiscoveryUrlOutput = document.getElementById(
  "exampleDiscoveryUrlOutput"
);
exampleDiscoveryUrlOutput.innerHTML = exampleDiscoveryUrl;

// login
const exampleLoginUrl =
  "https://" +
  LOGIN_BASE_URL +
  "/v3/oevlogin/oauth2/v3/&lt;client_id&gt;/authorize";
const exampleLoginParam = `response_type=code
client_id=&lt;client_id&gt;
redirect_uri=&lt;redirect_uri&gt;
scope=encodeURIComponent("openid customer")
code_challenge=&lt;code_challenge&gt;
code_challenge_method=S256
acr_values=swisspass-login-uid-pw`;
const exampleLoginUrlOutput = document.getElementById("exampleLoginUrlOutput");
const exampleLoginParamOutput = document.getElementById(
  "exampleLoginParamOutput"
);
exampleLoginUrlOutput.innerHTML = exampleLoginUrl;
exampleLoginParamOutput.innerHTML = exampleLoginParam.replace(/\n/g, "<br>");

// registration
const exampleRegistrationUrl = "https://" + WWW_BASE_URL + "/register";
const exampleRegistrationParam = "provider=&lt;provider_id&gt;";
const exampleRegistrationUrlOutput = document.getElementById(
  "exampleRegistrationUrlOutput"
);
const exampleRegistrationParamOutput = document.getElementById(
  "exampleRegistrationParamOutput"
);
exampleRegistrationUrlOutput.innerHTML = exampleRegistrationUrl;
exampleRegistrationParamOutput.innerHTML = exampleRegistrationParam;

// pw-reset
const examplePasswordResetUrl = "https://" + LOGIN_BASE_URL + "/v3/pw-reset";
const examplePasswordResetParam = "provider=&lt;provider_id&gt;";
const examplePasswordResetUrlOutput = document.getElementById(
  "examplePasswordResetUrlOutput"
);
const examplePasswordResetParamOutput = document.getElementById(
  "examplePasswordResetParamOutput"
);
examplePasswordResetUrlOutput.innerHTML = examplePasswordResetUrl;
examplePasswordResetParamOutput.innerHTML = examplePasswordResetParam;

// token
const exampleTokenUrl =
  "https://" +
  LOGIN_BASE_URL +
  "/v3/oev-oauth/rest/oauth2/authorization-servers/&lt;client_id&gt;/token";
const exampleTokenOptions = `headers: { Content-Type:
application/x-www-form-urlencoded }
body: { grant_type: authorization_code,
code: &lt;authorization_code&gt;,
redirect_uri: &lt;redirect_uri&gt;,
code_verifier: &lt;code_verifier&gt;,
client_id: &lt;client_id&gt; }`;
const exampleTokenUrlOutput = document.getElementById("exampleTokenUrlOutput");
const exampleTokenOptionsOutput = document.getElementById(
  "exampleTokenOptionsOutput"
);
exampleTokenUrlOutput.innerHTML = exampleTokenUrl;
exampleTokenOptionsOutput.innerHTML = exampleTokenOptions.replace(
  /\n/g,
  "<br>"
);

// token refresh
const exampleTokenRefreshUrl =
  "https://" +
  LOGIN_BASE_URL +
  "/v3/oev-oauth/rest/oauth2/authorization-servers/&lt;client_id&gt;/token";
const exampleTokenRefreshOptions = `headers: { Content-Type:
application/x-www-form-urlencoded }
body: { grant_type: refresh_token,
refresh_token: &lt;refresh_token&gt;,
client_id: &lt;client_id&gt;,
scope: openid customer }`;
const exampleTokenRefreshUrlOutput = document.getElementById(
  "exampleTokenRefreshUrlOutput"
);
const exampleTokenRefreshOptionsOutput = document.getElementById(
  "exampleTokenRefreshOptionsOutput"
);
exampleTokenRefreshUrlOutput.innerHTML = exampleTokenRefreshUrl;
exampleTokenRefreshOptionsOutput.innerHTML = exampleTokenRefreshOptions.replace(
  /\n/g,
  "<br>"
);

// revoke token
const exampleRevokeTokenUrl =
  "https://" +
  LOGIN_BASE_URL +
  "/v3/oev-oauth/rest/oauth2/authorization-servers/&lt;client_id&gt;/revoke";
const exampleRevokeTokenOptions = `headers: { Content-Type:
application/x-www-form-urlencoded }
body: { token: &lt;token&gt;,
token_type_hint: &lt;refresh|access&gt;,
client_id: &lt;client_id&gt; }`;
const exampleRevokeTokenUrlOutput = document.getElementById(
  "exampleRevokeTokenUrlOutput"
);
const exampleRevokeTokenOptionsOutput = document.getElementById(
  "exampleRevokeTokenOptionsOutput"
);
exampleRevokeTokenUrlOutput.innerHTML = exampleRevokeTokenUrl;
exampleRevokeTokenOptionsOutput.innerHTML = exampleRevokeTokenOptions.replace(
  /\n/g,
  "<br>"
);

// userinfo
const exampleUserinfoUrl =
  "https://" +
  LOGIN_BASE_URL +
  "/v3/oev-oauth/rest/oauth2/authorization-servers/&lt;client_id&gt;/userinfo";
const exampleUserinfoOptions = `headers: { Authorization: "Bearer &lt;access_token&gt;" }
`;
const exampleUserinfoUrlOutput = document.getElementById(
  "exampleUserinfoUrlOutput"
);
const exampleUserinfoOptionsOutput = document.getElementById(
  "exampleUserinfoOptionsOutput"
);
exampleUserinfoUrlOutput.innerHTML = exampleUserinfoUrl;
exampleUserinfoOptionsOutput.innerHTML = exampleUserinfoOptions.replace(
  /\n/g,
  "<br>"
);

// sso-ticket
const exampleSsoTicketUrl =
  "https://" +
  LOGIN_BASE_URL +
  "/v3/oev-oauth/rest/oauth2/authorization-servers/&lt;client_id&gt;/resources/sso_ticket";
const exampleSsoTicketOptions = `headers: { Authorization: "Bearer &lt;access_token&gt;" }
`;
const exampleSsoTicketUrlOutput = document.getElementById(
  "exampleSsoTicketUrlOutput"
);
const exampleSsoTicketOptionsOutput = document.getElementById(
  "exampleSsoTicketOptionsOutput"
);
exampleSsoTicketUrlOutput.innerHTML = exampleSsoTicketUrl;
exampleSsoTicketOptionsOutput.innerHTML = exampleSsoTicketOptions.replace(
  /\n/g,
  "<br>"
);

// jump to logindata on sp.ch
const exampleJumpLogindataUrl =
  "https://" + LOGIN_BASE_URL + "/v3/oevlogin/logout";
const exampleJumpLogindataParam = `Location=
encodeURIComponent(/v3/oevlogin/check-login?sso_ticket=
encodeURIComponent(&lt;ssoTicket&gt;)&Location=
encodeURIComponent(https://www-test.swisspass.ch/kunde/logindaten
?provider=&lt;providerId&gt;)))`;
const exampleJumpLogindataUrlOutput = document.getElementById(
  "exampleJumpLogindataUrlOutput"
);
const exampleJumpLogindataParamOutput = document.getElementById(
  "exampleJumpLogindataParamOutput"
);
exampleJumpLogindataUrlOutput.innerHTML = exampleJumpLogindataUrl;
exampleJumpLogindataParamOutput.innerHTML = exampleJumpLogindataParam.replace(
  /\n/g,
  "<br>"
);

// jump to customerdata on sp.ch
const exampleJumpCustomerdataUrl =
  "https://" + LOGIN_BASE_URL + "/v3/oevlogin/logout";
const exampleJumpCustomerdataParam = `Location=
encodeURIComponent(/v3/oevlogin/check-login?sso_ticket=
encodeURIComponent(&lt;ssoTicket&gt;)&Location=
encodeURIComponent(https://www-test.swisspass.ch/kunde/profile
?provider=&lt;providerId&gt;)))`;
const exampleJumpCustomerdataUrlOutput = document.getElementById(
  "exampleJumpCustomerdataUrlOutput"
);
const exampleJumpCustomerdataParamOutput = document.getElementById(
  "exampleJumpCustomerdataParamOutput"
);
exampleJumpCustomerdataUrlOutput.innerHTML = exampleJumpCustomerdataUrl;
exampleJumpCustomerdataParamOutput.innerHTML =
  exampleJumpCustomerdataParam.replace(/\n/g, "<br>");

// logout
const exampleLogoutUrl = "https://" + LOGIN_BASE_URL + "/v3/oevlogin/logout";
const exampleLogoutParam = `Location=&lt;after_logout_location&gt;`;
const exampleLogoutUrlOutput = document.getElementById(
  "exampleLogoutUrlOutput"
);
const exampleLogoutParamOutput = document.getElementById(
  "exampleLogoutParamOutput"
);
exampleLogoutUrlOutput.innerHTML = exampleLogoutUrl;
exampleLogoutParamOutput.innerHTML = exampleLogoutParam.replace(/\n/g, "<br>");
