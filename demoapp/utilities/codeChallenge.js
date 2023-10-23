// to check if verifier and code challenge match: https://example-app.com/pkce
// code from:
// https://docs.cotter.app/sdk-reference/api-for-other-mobile-apps/api-for-mobile-apps#step-1-create-a-code-verifier
// https://developer.okta.com/blog/2019/05/01/is-the-oauth-implicit-flow-dead

function generateCodeVerifier() {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).slice(-2)).join(
    ""
  );
}

function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
}

function base64urlencode(str) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generateCodeChallengeFromVerifier(v) {
  let hashed = await sha256(v);
  return base64urlencode(hashed);
}

export async function getCodeChallenge() {
  if (!sessionStorage.getItem("codeVerifier")) {
    sessionStorage.setItem("codeVerifier", generateCodeVerifier());
  }
  return await generateCodeChallengeFromVerifier(
    sessionStorage.getItem("codeVerifier")
  );
}
