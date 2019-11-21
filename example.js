const bitsianClient = require('./src/bitsianclient.js');

let client = new bitsianClient();

// connected websocket

client.onConnected('kraken', 'btc', 'usd');

// connected Rest API

client.getCurrencies();

client.getProducts(5);

client.getExchanges();

client.getBalance(1,1);

client.getOrders('open');

client.getOrder('e73a984f-6811-4afb-863b-97904b3174ec');

var createOrderDto = {

    orderSide:"buy",
    currencyPair:"LTC-USD",
    quantity:0.1,
    price:62.89,
    orderType:"market",
    exchangeId:4

};

client.createOrder(createOrderDto);

client.cancelOrder('6231ba3f-0336-4768-b458-1bf2a1c403d0');