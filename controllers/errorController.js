//handle errors for if the resource is not found or if there is an internal error
//and sends a static error file corresponding to the error which is in views
const httpStatus = require("http-status-codes");

exports.respondNoResourceFound = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.sendFile(`./views/${errorCode}.html`, {
        root: "./"
    });
};

exports.respondInternalError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${error.stack}`)
    res.status(errorCode);
    res.sendFile(`./views/${errorCode}.html`, {
        root: "./"
    });
};