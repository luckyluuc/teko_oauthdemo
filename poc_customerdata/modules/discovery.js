export async function getDiscovery(loginBaseUrl, clientId) {
  const response = await fetch(
    "https://" +
      loginBaseUrl +
      "/v3/oev-oauth/rest/oauth2/authorization-servers/" +
      clientId +
      "/.well-known/openid-configuration"
  );
  const discoveryData = await response.json();
  sessionStorage.setItem("discoveryData", JSON.stringify(discoveryData));
  if (!response.ok) {
    throw new Error(
      response.status +
        " (" +
        response.statusText +
        "): discovery request failed"
    );
  }
  return discoveryData;
}
