# gridcoin-rpc – Promise based Gridcoin RPC client

A JavaScript library for the interactions with gridcoin wallet

### Installation

```bash
npm install gridcoin-rpc
```

### Usage

```javascript
const { GridcoinRPC } = require('gridcoin-rpc');

const rpc = new GridcoinRPC({
  port: 6553,
  host: '127.0.0.1',
  username: 'username',
  password: 'very-strong-password',
});

// Test connection
rpc.testConnection()
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch(err => console.log('!', err.message));

// Get wallet info
rpc.getWalletInfo()
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch(err => console.log(err.message));

// {
//   "walletversion": 60000,
//   "balance": 121.12304127,
//   "newmint": 0,
//   "stake": 0,
//   "keypoololdest": 1508531912,
//   "keypoolsize": 101,
//   "unlocked_until": 0
// }

```

### Documentation
[API documentation](https://gridcat.github.io/gridcoin-rpc/)

#### External links

- [tutorial](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c)
- [boilerplate](https://github.com/alexjoverm/typescript-library-starter)