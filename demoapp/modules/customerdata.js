export function jumpToCustomerdata(
  loginBaseUrl,
  wwwBaseUrl,
  ssoTicket,
  providerId
) {
  let sessionBase = "https://" + loginBaseUrl;
  let targetApp =
    "https://" + wwwBaseUrl + "/kunde/profile?provider=" + providerId;
  let newSsoSession =
    "/v3/oevlogin/check-login?sso_ticket=" +
    encodeURIComponent(ssoTicket) +
    "&Location=" +
    encodeURIComponent(targetApp);
  let accountSsoUrl =
    sessionBase +
    "/v3/oevlogin/logout?Location=" +
    encodeURIComponent(newSsoSession);
  sessionStorage.removeItem("logged_in");
  sessionStorage.removeItem("code");
  window.location.href = accountSsoUrl;
}
