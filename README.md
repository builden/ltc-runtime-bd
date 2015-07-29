# ltc-runtime-bd
runtime sdk

## How to use
```js
var bd = require('ltc-runtime-bd');
bd.init(secretKey);
if (bd.checkPayResult(queryObj)) {
  console.log('check succ');
}
```

## Installation
```sh
npm install --save ltc-runtime-bd
```

## Tests
```sh
npm install
npm test
```