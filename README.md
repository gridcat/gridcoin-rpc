# gridcoin-rpc – Promise based Gridcoin RPC client

A JavaScript library for the interactions with gridcoin wallet

  [![NPM Version][npm-image]][npm-url]
  [![CI build][cci-image]][cci-url]
  [![SNYK report][snyk-image]][snyk-url]

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

### Donate
*GRC*: SJVaQcJriv7N8Py8eWjNUtWPTPBtDZashD
*BTC*: 12sUqF4mBiocqRPPPCyUsrTL6gf3AG2oTz
*XLM*: GDGOYINLUKGWDKRGZDDWE3UZLXBDN23KVCPCOAHXO4RB2DR3V7PQ7ENP

### Follow me
[keybase](https://keybase.io/gridcat)
[steemit](https://steemit.com/@gridcat/)

#### External links

- [tutorial](https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c)
- [boilerplate](https://github.com/alexjoverm/typescript-library-starter)

[npm-image]: https://img.shields.io/npm/v/gridcoin-rpc.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/gridcoin-rpc
[cci-image]: https://img.shields.io/circleci/project/github/gridcat/gridcoin-rpc/master.svg?style=flat-square
[cci-url]: https://circleci.com/gh/gridcat/workflows/gridcoin-rpc/tree/master
[snyk-image]: https://img.shields.io/snyk/vulnerabilities/github/gridcat/gridcoin-rpc.svg?style=flat-square
[snyk-url]: https://snyk.io/test/github/gridcat/gridcoin-rpc