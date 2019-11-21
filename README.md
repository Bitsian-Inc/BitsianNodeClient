# bitsian - node client

 > A full-featured Bitsian API client for Node.js

- [x] Supports all documented v1.1 endpoints


## Installation
    
    npm i bitsian-client


## Getting started

Clients for both the [REST API](https://docs.bitsian.com/#rest) and
[streaming WebSocket API](https://docs.bitsian.com/#websocket) are included.
Private endpoints as indicated in the API docs require authentication with an API
key and secret key.

Add API key, secret key and passPhrase in the environment variables.

```javascript
const bitsianClient = require("bitsian-client");

let client = new bitsianClient();
```
You can learn about the API responses of each endpoint [by reading our
documentation](http://docs.bitsian.com/).

## Methods for Exchange Data
For Exchange data methods, No permission needed for API key.

* Get all the exchanges in bitsian
```javascript
client.getExchanges();
```
* Get all the bitsian supported currencies
```javascript
client.getCurrencies();
```
* Get the exchange products list
```javascript
client.getProducts(2);
```

## Methods for Account
API key need 'balance' permission.
* Get the balance info (filtered by exchange as well as currency)
```javascript
client.getBalance();
```

## Methods for Order
API key need 'trade' permission for order methods.
* Get all the orders (open / completed)
```javascript
client.getOrders('open');
```
* Get an order info
```javascript
client.getOrder('c5a28f8f-6860-4b12-a005-930f3781e195');
```
* Create an order
```javascript
var createOrderDto = {

    orderSide:"buy",
    currencyPair:"LTC-USD",
    quantity:0.1,
    price:62.89,
    orderType:"market",
    exchangeId:4

};
client.createOrder(createOrderDto);
```
* Cancel a particular order
```javascript
client.cancelOrder('c5a28f8f-6860-4b12-a005-930f3781e195');
```

## Websocket Client

Once authenticated successful with API keys, subscription of pairs can initiated for getting real time updates.

```javascript

client.onConnected('kraken', 'btc', 'usd');

```

