/**
 * @author vishal rana
 */
const jwtHandler = require("../jwtHandler");
const resHndlr = require("../responseHandler");
const userMapper = require("./userMapper");
const userConstant = require("./userConstants")
/**
 * Verifing user token
 * @param {string} token jwt authorization token
 * @param {string} userId mongo id of user
 */
async function verifyUserToken(token, userId) {
    return jwtHandler.verifyAdminToken(token).then((result) => {
        if (result && result.id == userId) {
            return true
        } else {
            return false;
        }
    })
}

/**
 * THis function will check if provided token is valid or not
 * @param {*} req , request object to get details
 * @param {*} res , response object to send response to user
 * @param {*} next , next function to be called in case of error or success accordingly.
 */
async function authenticateToken(req, res, next) {
    if (!req.headers.authorization) {
        return resHndlr.sendError(res, userMapper.sendResponse(userConstant.CODE.MISSINGVALUE, userConstant.MESSAGES.tokenNotProvided))
    }

    let tokenStatus = await verifyUserToken(req.headers.authorization, req.params.adminId);
    if (!tokenStatus) {
        return resHndlr.sendError(res, userMapper.sendResponse(userConstant.CODE.FRBDN, userConstant.MESSAGES.UNAUTH))
    } else {
        next();
    }
}

/**
 * THis function will check if provided all values are present for login or not
 * @param {*} req , request object to get details
 * @param {*} res , response object to send response to user
 * @param {*} next , next function to be called in case of error or success accordingly.
 */
function checkLoginValues(req, res, next) {
    let { userName, password } = req.body;

    if (!userName) {
        return resHndlr.sendError(res, userMapper.sendResponse(userConstant.CODE.BADREQ, userConstant.MESSAGES.NAME_CANT_EMPTY))
    } else if (!password) {
        return resHndlr.sendError(res, userMapper.sendResponse(userConstant.CODE.BADREQ, userConstant.MESSAGES.PWD_CANT_EMPTY))
    }

    next();
}


/**
 * THis function will check if provided all values are present for creating a new category
 * @param {*} req , request object to get details
 * @param {*} res , response object to send response to user
 * @param {*} next , next function to be called in case of error or success accordingly.
 */
function checkcategoryValues(req, res, next) {
    let { name } = req.body;

    if (!name) {
        return resHndlr.sendError(res, userMapper.sendResponse(userConstant.CODE.BADREQ, userConstant.MESSAGES.CATEGORYNAMEISREQUIED))
    }

    next();
}

module.exports = {
    authenticateToken, //validating admin token and checking adminId

    checkLoginValues, //checking intial values for login
    
    checkcategoryValues, //checking initial values for creating a new category
}