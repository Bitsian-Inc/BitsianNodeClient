const getResponse = require('./private_call.js');
const generateSignature = require('./authentication.js');
const constants =  require('./constant.js');
const Stomp = require('stompjs');


class BitsianClient {

    getBalance(exchangeId, currencyId) {

        getResponse(constants.BALANCE_ENDPOINT + '?exchangeId=' + exchangeId + '&currencyId=' + currencyId, constants.GET, null).then(function (data) {
            console.log(data);
        });
    }

    getCurrencies() {

        getResponse(constants.CURRENCY_ENDPOINT, constants.GET, null).then(function (data) {
            console.log(data);
        });
    }

    getProducts(exchange) {

        getResponse(constants.PRODUCT_ENDPOINT +'?exchangeId=' + exchange, constants.GET, null).then(function (data) {
            console.log(data);
        });
    }

    getExchanges() {

        getResponse(constants.EXCHANGE_ENDPOINT, constants.GET, null).then(function (data) {
            console.log(data);
        });
    }

    getOrders(resolution) {

        getResponse(constants.ORDER_DETAILS + '?resolution='+ resolution , constants.GET, null).then(function (data) {
            console.log(data);
        });
    }

    getOrder(orderId) {

        getResponse( constants.ORDER_DETAILS + '/' + orderId, constants.GET, null).then(function (data) {
            console.log(data);
        });
    }

    createOrder(createOrderDto) {

        getResponse(constants.ORDER_DETAILS, constants.POST, createOrderDto).then(function (data) {
            console.log(data);
        });
    }

    cancelOrder(orderId) {

        getResponse(constants.ORDER_DETAILS + '/' + orderId + constants.ORDER_CANCEL, constants.POST, null).then(function (data) {
            console.log(data);
        });
    }

    onConnected(exchange, baseCurrency, quoteCurrency) {

        var client = Stomp.overWS(constants.WEBSOCKET_END_POINT);

        client.connect("", "", function (data) {

            console.log("connected " + Date.now());

            authenticateSubscription();

        }, function (error) {
            console.log("Not connected ", error);
        });

        function authenticateSubscription() {

            const nonce = new Date().getTime();

            const signature = generateSignature(nonce,  constants.GET, constants.WEBSOCKET_PATH, null);

            console.log(signature);

            let headers = {
                'BITSIAN-API-KEY': constants.API_KEY,
                'BITSIAN-TIMESTAMP': nonce,
                'BITSIAN-API-SIGN': signature,
                'BITSIAN-PASSPHRASE': constants.PASS_PHRASE

            };

            client.subscribe(constants.AUTHENTICATION_CHANNEL, function (message) {

                console.log("\n" + new Date() + "----- " + message.body);

                if (!message.body.includes(constants.ERROR)) {

                    // Subscribe individual exchange order book
                    exchangeOrderBook("productbest", exchange, baseCurrency, quoteCurrency);

                    // Subscribe individual exchange trade tape
                    exchangeTradeTape("tradetape", exchange, baseCurrency, quoteCurrency);

                    // Subscribe aggregated order book
                    aggregatedOrderBook("productbest", baseCurrency, quoteCurrency);

                    // Subscribe aggregated trade tape
                    aggregatedTradeTape("tradetape", baseCurrency, quoteCurrency);
                }

            }, headers);


            function exchangeOrderBook(feedType, exchange, baseCurrency, quoteCurrency) {

                let channel = '/v1/' + feedType + '/' + exchange + '/' + baseCurrency + '/' + quoteCurrency;

                var subscription = client.subscribe(channel, function (message) {
                    console.log("\n" + new Date() + "----- " + message.body);
                });

                // If you want to unsubcsribe product pair use below comment
                // subscription.unsubscribe();
            }


            function exchangeTradeTape(feedType, exchange, baseCurrency, quoteCurrency) {

                let channel = '/v1/' + feedType + '/' + exchange + '/' + baseCurrency + '/' + quoteCurrency;

                var subscription = client.subscribe(channel, function (message) {
                    console.log("\n" + new Date() + "----- " + message.body);
                });

                // If you want to unsubcsribe product pair use below comment
                // subscription.unsubscribe();
            }

            function aggregatedOrderBook(feedType, baseCurrency, quoteCurrency) {

                let channel = '/v1/' + feedType + '/' + baseCurrency + '/' + quoteCurrency;

                var subscription = client.subscribe(channel, function (message) {
                    console.log("\n" + new Date() + "----- " + message.body);
                });

                // If you want to unsubcsribe product pair use below comment
                // subscription.unsubscribe();
            }


            function aggregatedTradeTape(feedType, baseCurrency, quoteCurrency) {

                let channel = '/v1/' + feedType + '/' + baseCurrency + '/' + quoteCurrency;

                var subscription = client.subscribe(channel, function (message) {
                    console.log("\n" + new Date() + "----- " + message.body);
                });

                // If you want to unsubcsribe product pair use below comment
                // subscription.unsubscribe();
            }
        }

    }
}

module.exports = BitsianClient;