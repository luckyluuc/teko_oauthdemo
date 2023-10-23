export function openLoginForm(
  authorizationEndpoint,
  clientId,
  redirectUri,
  codeChallenge
) {
  let authorizationUri =
    authorizationEndpoint +
    "?response_type=code" +
    "&client_id=" +
    clientId +
    "&redirect_uri=" +
    redirectUri +
    "&scope=" +
    encodeURIComponent("openid customer") +
    "&code_challenge=" +
    codeChallenge +
    "&code_challenge_method=S256&acr_values=swisspass-login-uid-pw";
  window.location.href = authorizationUri;
}

export function silentLogin(
  authorizationEndpoint,
  clientId,
  redirectUri,
  codeChallenge
) {
  let authorizationUri =
    authorizationEndpoint +
    "?response_type=code" +
    "&client_id=" +
    clientId +
    "&redirect_uri=" +
    redirectUri +
    "&scope=" +
    encodeURIComponent("openid customer") +
    "&code_challenge=" +
    codeChallenge +
    "&code_challenge_method=S256&acr_values=swisspass-login-uid-pw&prompt=none";

  // if fetch is done with credentials: include, the browser will send the cookie
  // but some browser versions (e.g. Safari) do not allow 3rd party cookies anymore
  // therefore the request is done in foreground
  window.location.href = authorizationUri;
}
