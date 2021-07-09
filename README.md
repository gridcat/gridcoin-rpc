# gridcoin-rpc – Promise based Gridcoin RPC client

TS library for the interactions with gridcoin RPC api

  [![NPM Version][npm-image]][npm-url]
  [![CI build][cci-image]][cci-url]
  [![SNYK report][snyk-image]][snyk-url]
  [![semantic-release][semantic-image]][semantic-url]
  [![Commitzen Friendly][commitzen-image]][commitzen-url]

![](https://gateway.pinata.cloud/ipfs/QmVgrTvACHHdzzTDJouBEKY5Fs31gq9HdER6oY5joqpgr5)

This library is intended to be the simple proxy for those who want to use JS/TS to tinker with Gridcoin RPC library. 
Library won't do validation by itself, it relies on the RPC validation. It will just help you with a typings.

## Installation

```bash
npm install gridcoin-rpc
```

## Usage

```javascript
const { GridcoinRPC } = require('gridcoin-rpc');

const rpc = new GridcoinRPC({
  port: 6553,
  host: '127.0.0.1',
  username: 'username',
  password: 'very-strong-password',
});

async main = () => {
  // Get wallet info
  try {
    const walletInfo = await rpc.getWalletInfo();
    console.log(JSON.stringify(res, null, 2))
  } catch (e) {
    console.log(err.message)
  }
}

main();


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

## Documentation
[API documentation](https://gridcat.github.io/gridcoin-rpc/)

## Donate
*GRC*: SJVaQcJriv7N8Py8eWjNUtWPTPBtDZashD

## Follow me
[keybase](https://keybase.io/gridcat)

[steemit](https://steemit.com/@gridcat/)

[npm-image]: https://img.shields.io/npm/v/gridcoin-rpc.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/gridcoin-rpc
[cci-image]: https://img.shields.io/circleci/project/github/gridcat/gridcoin-rpc/master.svg?style=flat-square
[cci-url]: https://circleci.com/gh/gridcat/workflows/gridcoin-rpc/tree/master
[snyk-image]: https://img.shields.io/snyk/vulnerabilities/github/gridcat/gridcoin-rpc.svg?style=flat-square
[snyk-url]: https://snyk.io/test/github/gridcat/gridcoin-rpc
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-url]: https://github.com/semantic-release/semantic-release
[commitzen-image]: https://img.shields.io/badge/commitzen-friendly-brightgreen.svg
[commitzen-url]: https://commitzen.github.io/cz-cli
