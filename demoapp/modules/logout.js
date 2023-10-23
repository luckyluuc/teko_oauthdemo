export function logoutRequest(logoutReason) {
  let logoutUri =
    "https://" +
    sessionStorage.getItem("login_base_url") +
    "/v3/oevlogin/logout";

  // if mode is "cors", "null" must be an allowed origin on the server side
  // otherwise the request will be blocked by the browser (CORS policy)
  /* let requestOptions = {
    mode: "no-cors",
  }; */

  if (sessionStorage.getItem("after_logout_redirect_uri")) {
    logoutUri +=
      "?Location=" +
      encodeURIComponent(
        sessionStorage.getItem("after_logout_redirect_uri") +
          "?param=" +
          logoutReason
      );
  }

  // doesn't work with mode: "no-cors", as repsonse is opaque
  /* const response = await fetch(logoutUri, requestOptions);
  const redirectLocation = response.headers.get("Location"); 
  window.location.href = redirectLocation;*/

  // as it is not recommended to configure null as allowed origin
  // we do the request in foreground
  window.location.href = logoutUri;
}
