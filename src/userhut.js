import { Sender } from "tuai";

export default function(poolId) {
  const id = "userhut-portal";
  const origin = "https://authentication.userhut.com";
  const sender = new Sender({
    querySelectors: [`#${id}`],
    receiverOrigin: origin,
    timeout: 25000
  });
  const cache = {
    token: null,
    authenticated: null,
    exp: null
  };
  function clearCache() {
    cache.token = null;
    cache.authenticated = null;
    cache.exp = null;
  }
  function isCacheExpired() {
    if (!cache.exp) return true;
    return new Date(cache.exp * 1000) < new Date();
  }
  function initialize() {
    return new Promise(resolve => {
      // Create iframe
      const iframe = document.createElement("iframe");
      iframe.id = id;
      iframe.style.display = "none";
      iframe.src = `${origin}/portal?poolId=${poolId}`;
      iframe.onload = () => {
        resolve();
      };
      document.body.appendChild(iframe);
    });
  }
  async function getToken() {
    let token = cache.token;
    if (!token || isCacheExpired()) {
      token = await sender.send("get-token");
      if (token) {
        cache.token = token;
      }
    }
    return token;
  }
  async function getAuthenticated() {
    let authenticated = cache.authenticated;
    if (!authenticated || isCacheExpired()) {
      await getToken();
      authenticated = await sender.send("get-authenticated");
      if (authenticated) {
        cache.authenticated = authenticated;
        cache.exp = authenticated.exp;
      }
    }
    return authenticated;
  }
  async function signOut() {
    await sender.send("sign-out");
    clearCache();
  }
  function openSignInPage({ redirect = false }) {
    location.href = `${origin}/sign-in?poolId=${poolId}&redirect=${redirect}`;
  }
  return {
    initialize,
    getToken,
    getAuthenticated,
    signOut,
    openSignInPage
  };
}
