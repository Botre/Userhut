# Axios

```javascript
import axios from "axios";
import userhut from "./userhut";

const instance = axios.create();

instance.interceptors.request.use(
  async config => {
    const token = await userhut.getToken();
    config.headers["authorization"] = token;
    return config;
  },
  error => Promise.reject(error)
);
```
