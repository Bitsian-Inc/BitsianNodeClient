module.exports = Object.freeze({

 GET : 'GET',

 POST : 'POST',

 BALANCE_ENDPOINT : "/balance",

 ORDER_DETAILS : "/orders",

 ORDER_CANCEL : "/cancel",

 EXCHANGE_ENDPOINT : "/exchange",

 CURRENCY_ENDPOINT : "/currency",

 PRODUCT_ENDPOINT : "/product",

 BASE_URL : "https://api.bitsian.io/api",

 API_KEY : process.env.BITSIAN_API_KEY,

 SECRET_KEY : process.env.BITSIAN_SECRET_KEY,

 PASS_PHRASE : process.env.BITSIAN_PASSPHRASE,

 WEBSOCKET_END_POINT : "wss://api.bitsian.io/bitsian-feed",

 WEBSOCKET_PATH : "/bitsian-feed",

 AUTHENTICATION_CHANNEL : "/v1/auth",

 ERROR : "Error"

});
