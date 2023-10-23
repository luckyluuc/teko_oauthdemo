export async function userinfoRequest(accessToken, userinfoEndpoint) {
  let requestOptions = {
    headers: {
      Authorization: "Bearer " + (accessToken ? accessToken : "noToken"),
    },
  };

  const response = await fetch(userinfoEndpoint, requestOptions);
  if (!response.ok) {
    throw new Error(
      response.status +
        " (" +
        response.statusText +
        "): no valid access token found"
    );
  }

  const userinfoData = await response.json();

  return userinfoData;
}
