# WalletCore.io API JavaScript Wrapper

This is a JavaScript wrapper for the WalletCore API, allowing easy integration of cryptocurrency operations into your Node.js applications.

## Installation

1. Clone this repository or download the `WalletCoreAPI.js` file.
2. Place the `WalletCoreAPI.js` file in your project directory.

## Usage

1. Import the WalletCoreAPI class:

```javascript
const WalletCoreAPI = require('./WalletCoreAPI');
```

2. Create an instance of the API and set up your credentials:

```javascript
const api = new WalletCoreAPI();
api.setup('your_private_key', 'your_public_key');
```

3. Use the API methods:

```javascript
// Get a callback address
const callbackAddress = await api.getCallbackAddress('BTC');

// Create a withdrawal
const withdrawal = await api.createWithdrawal(0.1, 'BTC', 'btc_address_here');

// Get transaction history
const history = await api.getHistory();
```

## Available Methods

* __getCallbackAddress(currency, ipnUrl = ''):__ Get a callback address for receiving payments.
* __createWithdrawal(amount, currency, address, ipnUrl = ''):__ Create a withdrawal to a specified address.
* __getHistory(currency = 'ALL'):__ Get transaction history for a specific currency or all currencies.

## Error Handling

All methods return a Promise. Use try/catch blocks or .catch() to handle any errors:

```javascript
try {
    const result = await api.getCallbackAddress('BTC');
    console.log(result);
} catch (error) {
    console.error('Error:', error);
}
```

## Security

This wrapper uses HMAC SHA-512 for request signing. Make sure to keep your private key secure and never expose it in client-side code.
