export async function tokenRequest(
  authorizationCode,
  redirectUri,
  codeVerifier,
  clientId,
  tokenEndpoint
) {
  let tokenBody = new URLSearchParams();
  tokenBody.append("grant_type", "authorization_code");
  tokenBody.append("code", authorizationCode.trim());
  tokenBody.append("redirect_uri", redirectUri);
  tokenBody.append("code_verifier", codeVerifier);
  tokenBody.append("client_id", clientId);

  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: tokenBody,
  };

  const response = await fetch(tokenEndpoint, requestOptions);

  if (!response.ok) {
    throw new Error(
      response.status +
        " (" +
        response.statusText +
        "): probably authorization code no longer valid. try to refresh token or redo login"
    );
  }

  const tokenData = await response.json();
  return tokenData;
}

export async function tokenRefreshRequest(
  refreshToken,
  clientId,
  tokenEndpoint
) {
  let tokenRefreshBody = new URLSearchParams();
  tokenRefreshBody.append("grant_type", "refresh_token");
  tokenRefreshBody.append("refresh_token", refreshToken);
  tokenRefreshBody.append("client_id", clientId);
  tokenRefreshBody.append("scope", "openid customer");

  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: tokenRefreshBody,
  };

  const response = await fetch(tokenEndpoint, requestOptions);

  if (!response.ok) {
    throw new Error(
      response.status +
        " (" +
        response.statusText +
        "): token refresh failed, you will be logged out"
    );
  }

  const refreshedTokenData = await response.json();
  return refreshedTokenData;
}

export async function tokenRevokeRequest(
  token,
  tokenType,
  clientId,
  revokeEndpoint
) {
  let message;
  if (!token) {
    throw new Error("no " + tokenType + " to be revoked");
  }
  let tokenRevokeBody = new URLSearchParams();
  tokenRevokeBody.append("token", token);
  tokenRevokeBody.append("token_type_hint", tokenType);
  tokenRevokeBody.append("client_id", clientId);

  let requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: tokenRevokeBody,
  };

  const response = await fetch(revokeEndpoint, requestOptions);

  if (response.ok) {
    if (tokenType === "refresh_token") {
      sessionStorage.removeItem("refreshToken");
    } else {
      sessionStorage.removeItem("accessToken");
    }
  }

  message = tokenType + " revoked";
  return message;
}
