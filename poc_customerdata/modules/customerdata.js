export async function getCustomerDataRequest(accessToken) {
  let requestOptions = {
    headers: {
      Authorization: "Bearer " + (accessToken ? accessToken : "noToken"),
      "Content-Type": "application/json",
    },
  };

  let requestUri =
    "https://www-deva.swisspass.ch/public/api/benutzer/v2/benutzer";

  const response = await fetch(requestUri, requestOptions);
  const customerData = await response.json();
  return customerData;
}

export async function saveCustomerDataRequest(accessToken, customerData) {
  let requestBody = JSON.stringify(customerData);
  let requestOptions = {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + (accessToken ? accessToken : "noToken"),
      "Content-Type": "application/json",
    },
    body: requestBody,
  };

  let requestUri =
    "https://www-deva.swisspass.ch/public/api/benutzer/v2/benutzer";

  const response = await fetch(requestUri, requestOptions);
  const updatedCustomerData = await response.json();
  return updatedCustomerData;
}
