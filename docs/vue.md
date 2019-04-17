# Vue

## 1. Install the library

```bash
npm install --save userhut
```

## 2. Create userhut.js file in /src

```javascript
import Userhut from "userhut";
const userhut = new Userhut("your-pool-id");
export default userhut;
```

## 3. Initialize the library in main.js

### Simple

```javascript
import userhut from "./userhut";
userhut.initialize();
```

### With Vuex

```javascript
userhut
  .initialize()
  .then(async () => {
    try {
      const authenticated = await userhut.getAuthenticated();
      if (!authenticated) {
        userhut.openSignInPage({
          redirect: window.location.href
        });
      } else {
        store.commit("setAuthenticating", {
          authenticating: false
        });
        store.commit("setAuthenticated", {
          authenticated
        });
      }
    } catch (error) {
      userhut.openSignInPage({
        redirect: window.location.href
      });
    }
  })
  .catch(error => {
    console.error(error);
  });
```

#### Example store

```javascript
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authenticating: false,
    authenticated: null
  },
  mutations: {
    setAuthenticating(state, { authenticating }) {
      state.authenticating = authenticating;
    },
    setAuthenticated(state, { authenticated }) {
      state.authenticated = authenticated;
    }
  },
  actions: {}
});
```
