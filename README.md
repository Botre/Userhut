# userhut

Userhut JavaScript library

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
await userhut.initialize();
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

## Git hooks

- pre-commit: re-format staged files with Prettier

## Scripts

```bash
# Build for production
npm run build

# Re-format files with Prettier
npm run prettier
```
