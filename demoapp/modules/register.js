export function openRegistrationForm(wwwBaseUrl, providerId) {
  let registerUri =
    "https://" + wwwBaseUrl + "/register?provider=" + providerId;
  window.location.href = registerUri;
}
