import { Sender } from "tuai";

class TokenCache {
  constructor() {
    this.token = null;
    this.authenticated = null;
    this.exp = null;
  }
  clear() {
    this.token = null;
    this.authenticated = null;
    this.exp = null;
  }
  isExpired() {
    if (!this.exp) return true;
    return new Date(this.exp * 1000) < new Date();
  }
}

export default function(poolId) {
  const iframeId = "userhut-portal";
  const authenticationBaseUrl = "https://authentication.userhut.com";

  const sender = new Sender({
    querySelectors: [`#${iframeId}`],
    receiverOrigin: authenticationBaseUrl,
    timeout: 25000
  });

  const cache = new TokenCache();

  function initialize() {
    return new Promise(resolve => {
      const iframe = document.createElement("iframe");
      iframe.id = iframeId;
      iframe.style.display = "none";
      iframe.src = `${authenticationBaseUrl}/portal?poolId=${poolId}`;
      iframe.onload = () => {
        resolve();
      };
      document.body.appendChild(iframe);
    });
  }

  async function getToken() {
    let token = cache.token;
    if (!token || cache.isExpired()) {
      token = cache.token = await sender.send("get-token");
    }
    return token;
  }

  async function getAuthenticated() {
    let authenticated = cache.authenticated;
    if (!authenticated || cache.isExpired()) {
      await getToken();
      authenticated = cache.authenticated = await sender.send(
        "get-authenticated"
      );
      cache.exp = authenticated.exp;
    }
    return authenticated;
  }

  async function signOut() {
    await sender.send("sign-out");
    cache.clear();
  }

  function openSignInPage({ redirect = false }) {
    location.href = `${authenticationBaseUrl}/sign-in?poolId=${poolId}&redirect=${redirect}`;
  }

  return {
    initialize,
    getToken,
    getAuthenticated,
    signOut,
    openSignInPage
  };
}
