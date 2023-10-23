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

export async function silentLogin(
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

  window.location.href = authorizationUri;
}
