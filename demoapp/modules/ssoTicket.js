export async function getSsoTicket(loginBaseUrl, clientId, accessToken) {
  let requestOptions = {
    headers: {
      Authorization: "Bearer " + (accessToken ? accessToken : "noToken"),
    },
  };

  let requestUri =
    "https://" +
    loginBaseUrl +
    "/v3/oev-oauth/rest/oauth2/authorization-servers/" +
    clientId +
    "/resources/sso_ticket";

  const response = await fetch(requestUri, requestOptions);

  if (!response.ok) {
    throw new Error(
      response.status +
        " (" +
        response.statusText +
        "): probably no valid access token found"
    );
  }

  const ssoTicketData = await response.json();
  return ssoTicketData;
}
