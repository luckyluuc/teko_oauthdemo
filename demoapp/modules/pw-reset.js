export function openPasswordResetForm(loginBaseUrl, providerId) {
  let passwordResetUri =
    "https://" + loginBaseUrl + "/v3/pw-reset?provider=" + providerId;
  window.location.href = passwordResetUri;
}
