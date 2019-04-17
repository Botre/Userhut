# Userhut

> AaaS

## Installation

### NPM

```bash
npm install --save userhut
```

[npm package link](https://www.npmjs.com/package/userhut)

### CDN

```html
<script src="https://unpkg.com/userhut@latest"></script>
```

## Usage

### Initialize

```javascript
import Userhut from "userhut";
const userhut = new Userhut("your-user-pool-id");
```

### Fetch authenticated user

```javascript
const authenticated = await userhut.getAuthenticated();
```

### Fetch token

```javascript
const token = await userhut.getToken();
```

### Sign out

```javascript
await userhut.signOut();
```

### Open sign in page

```javascript
userhut.openSignInPage({
  redirect: window.location.href
});
```

## Powered by

- Babel 7
- Webpack 4

## License

[MIT](http://opensource.org/licenses/MIT)

## Twitter

[Follow me on Twitter](https://twitter.com/KrolsBjorn)
