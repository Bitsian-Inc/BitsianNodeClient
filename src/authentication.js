const crypto = require("crypto");
const constants =  require('./constant.js');

module.exports = function (nonce, method, path, body) {

    if (body !== null) {

        body = JSON.stringify(body);

    }else {

        body = "";
    }

    const preHash = nonce + method + path + body;

    const hmac = crypto.createHmac('SHA256', constants.SECRET_KEY);
    hmac.update(preHash, 'utf8');
    return hmac.digest('base64');
};
