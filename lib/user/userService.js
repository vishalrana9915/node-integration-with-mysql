/**
 * @author vishal rana
 */
const userDao = require("./userDao")
const userConstant = require("./userConstants");
const userMapper = require("./userMapper")
const appUtil = require('../appUtils')
const jwtHandler = require("../jwtHandler")
/**
 * This function will create a new category to the database
 * @param {string} name, category name
 */
function createCategory(name) {
    return userDao.createCategory(name)
        .then((result) => {
            return userMapper.sendResponse(userConstant.CODE.Success, userConstant.MESSAGES.Success)
        }).catch((err) => {
            return userMapper.sendResponse(userConstant.CODE.MISSINGVALUE, userConstant.MESSAGES.ERROR)
        });
}

/**
 * Function to compare login request body
 * @param {*} obj , admin object to compare data 
 */
function login(obj) {
    return userDao.getUserDetails(obj.userName)
        .then(async (result) => {
            if (result.length == 0)
                return userMapper.sendResponse(userConstant.CODE.MISSINGVALUE, userConstant.MESSAGES.ERRORFETCHUSERRECORD)
            let userRecord = result[0];
            let userPassword = userRecord.password;
            let isMAtch = await appUtil.verifyPassword(obj.password, userPassword)
            if (!isMAtch) {
                return userMapper.sendResponse(userConstant.CODE.BADREQ, userConstant.MESSAGES.MISMATCHPASS)
            } else {
                //generate token
                let obj = {
                    id: userRecord.id,
                    active: userRecord.active,
                    username: userRecord.username
                }
                return new Promise((resolve, reject) => {
                    jwtHandler.genAdminToken(obj)
                        .then((result_token) => {
                            resolve(userMapper.sendResponse(userConstant.CODE.Success, userConstant.MESSAGES.Success, result_token))
                        }).catch((err) => {
                            return userMapper.sendResponse(userConstant.CODE.MISSINGVALUE, userConstant.MESSAGES.ERRORFETCHUSERRECORD)
                        });
                })
            }
        }).catch((err) => {
            console.log({ err });
            return userMapper.sendResponse(userConstant.CODE.MISSINGVALUE, userConstant.MESSAGES.ERRORFETCHUSERRECORD)
        });
}

/**
 * This function will fetch all categies that are added in the database by the admin
 */
function fetchAllCategory() {
    return userDao.fetchAllCategory()
        .then((result) => {
            return userMapper.sendResponse(userConstant.CODE.Success, userConstant.MESSAGES.Success, result)
        }).catch((err) => {
            return userMapper.sendResponse(userConstant.CODE.MISSINGVALUE, userConstant.MESSAGES.ERROR)
        });
}


/**
 * This function will create a new subcategory to the database
 * @param {string} name, subcategory name
 * @param {string} categoryId, category for the refrence
 */
function createSubCategory(name, categoryId) {
    console.log({ name, categoryId })
    return userDao.fetchCategoryFromId(categoryId)
        .then((result) => {
            if (result.length == 0) {
                //unable to fetch category details
                return userMapper.sendResponse(userConstant.CODE.MISSINGVALUE, userConstant.MESSAGES.CATEGORYINVALID)
            } else {
                return userDao.createSubCategory(name, categoryId)
                    .then(_ => {
                        return userMapper.sendResponse(userConstant.CODE.Success, userConstant.MESSAGES.Success)
                    }).catch(_ => {
                        return userMapper.sendResponse(userConstant.CODE.MISSINGVALUE, userConstant.MESSAGES.ERROR)
                    });
            }
        }).catch((err) => {
            console.log({ err });
            return userMapper.sendResponse(userConstant.CODE.MISSINGVALUE, userConstant.MESSAGES.ERROR)
        });
}


/**
 * This function will fetch all subcategies that are added in the database by the admin
 * @param {string}, adding filter for particular category
 */
function fetchAllSubCategory(categoryId) {
    return userDao.fetchAllSubCategory(categoryId)
        .then((result) => {
            return userMapper.sendResponse(userConstant.CODE.Success, userConstant.MESSAGES.Success, result)
        }).catch((err) => {
            console.log({ err })
            return userMapper.sendResponse(userConstant.CODE.MISSINGVALUE, userConstant.MESSAGES.ERROR)
        });
}

module.exports = {
    createCategory, //creating a new category to the database

    login, //function to login using username and password

    fetchAllCategory, //fetch all categories from database

    createSubCategory, //admin creating a new subcategory

    fetchAllSubCategory, //fetch all sub categories 
}