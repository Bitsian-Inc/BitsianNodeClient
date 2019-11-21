const Promise = require('promise');
var request = require('request');

const generateSignature = require('./authentication.js');
const constants = require('./constant.js');

module.exports = function (path, method, body) {

    try {

        var nonce = new Date().getTime();

        var signature = generateSignature(nonce, method, path, body);

        console.log(signature);

        var headers = {
            "accept": "application/json;charset=UTF-8",
            "BITSIAN-API-KEY": constants.API_KEY,
            "BITSIAN-TIMESTAMP": nonce,
            "BITSIAN-API-SIGN": signature,
            "BITSIAN-PASSPHRASE": constants.PASS_PHRASE,
        };

        var options;

        if (body == null) {

            options = {

                // url: 'http://localhost:3120'+ path,
                url: constants.BASE_URL + path,
                method: method,
                headers: headers
            };

        } else {

            options = {

                // url: 'http://localhost:3120'+ path,
                url: constants.BASE_URL + path,
                method: method,
                headers: headers,
                body: body,
                json: true
            };
        }


        return new Promise(function (resolve, reject) {

            request(options, function (error, response, body) {

                if (error) {
                    console.log(error);
                    reject(error);
                }

                if (!error) {

                    resolve(body);
                }
            });
        });

    } catch (e) {
        console.log("Exception", e);
    }


};
