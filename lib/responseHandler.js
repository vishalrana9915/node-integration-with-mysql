"use strict";

//========================== Load Modules Start ===========================

//========================== Load Internal Module =========================

// Load exceptions
var constants = require("./constants");
var excep = require("./customExceptions");
var APIResponse = require("./model/APIResponse");

//========================== Load Modules End =============================

function hndlError(err, req, res, next) {
    // unhandled error
    sendError(res, err);
}

function sendError(res, err) {
    // if error doesn't has sc than it is an unhandled error,
    // log error, and throw intrnl server error
    // if (!err.errorCode) {
    //     console.error(err, "unhandled error");
    //     err = excep.intrnlSrvrErr(err);
    // }
    // var result = new APIResponse(constants.STATUS_CODE.ERROR, err);
    _sendResponse(res, err);
}

function sendSuccessWithMsg(res, msg) {
    var rslt = { message: msg };
    var result = new APIResponse(constants.STATUS_CODE.SUCCESS, rslt);
    _sendResponse(res, result);
}

function sendSuccess(res, rslt) {
    // var result = new APIResponse(constants.STATUS_CODE.SUCCESS, rslt);
    _sendResponse(res, rslt);
}

//========================== Exposed Action Start ==========================

module.exports = {
    hndlError, sendError, sendSuccess, sendSuccessWithMsg
};

//========================== Exposed Action End ==========================

function _sendResponse(res, rslt) {
    // send status code 200
    return res.send(rslt);
}
