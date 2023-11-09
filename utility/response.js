const responseCode = require("./responseCode");
// const appMessages = require("../lang");
// const constant = require("./constant")

function sendSuccessResponse(req, res, data, httpCode = responseCode.OK, message) {
    console.log('message: ', message);
    if (!data && message) {
        data = {
            message: message
        };
    } else if (data && message) {
        data.message = message;
    }
    let responseData = {};
    let headers = {};
    data = data || {};
    console.log('data: ', data);
    responseData.data = data;
    if (data.pagination) {
        responseData = data;
        // responseData.total = data.count;
        // responseData.pageCount = Math.ceil(data.count / data.limit);
        // headers["x-total"] = data.count;
        // headers["x-total-pages"] = Math.ceil(data.count / data.limit);
    }
    if (!data.noCode) {
        responseData.statusCode = 200;
    } responseData.message = data.message || "";
    console.log('responseData: ', responseData);

    res.status(httpCode).set(headers).send(responseData);
}

function sendFailResponse(req, res, httpCode = responseCode.BAD_REQUEST, message, data) {
    if (!data && message) {
        data = {
            statusCode: httpCode,
            message: message
        };
    } else if (data && message) {
        data.message = message;
    }
    if (data) {
        data.data = {};
    }
    res.status(httpCode).send(data);
}



module.exports = {
    sendSuccessResponse,
    sendFailResponse
    // getMessage
};