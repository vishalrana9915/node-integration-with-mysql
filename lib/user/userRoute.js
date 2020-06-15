/**
 * @author vishal rana
 */

const router = require('express').Router();
const userFacade = require("./userFacade");
const rshndlr = require("../responseHandler")
const userValidator = require("./userValidators");



/**
 * Function to authorize login request for the user
 */
router.route('/login').post([userValidator.checkLoginValues], (req, res) => {
    let { userName, password } = req.body;
    userFacade.login({ userName, password })
        .then((result) => {
            rshndlr.sendSuccess(res, result)
        }).catch((err) => {
            rshndlr.sendError(res, err)
        });
})


/**
 * Creating a new category
 */
router.route('/createCategory/:adminId').post([userValidator.checkcategoryValues, userValidator.authenticateToken], (req, res) => {
    let { name } = req.body;
    userFacade.createCategory(name)
        .then((result) => {
            rshndlr.sendSuccess(res, result)
        }).catch((err) => {
            rshndlr.sendError(res, err)
        });
})

/**
 * Fetch the list of all categories
 */
router.route('/fetchAllCategories/:adminId').get([userValidator.authenticateToken], (req, res) => {
    userFacade.fetchAllCategory()
        .then((result) => {
            rshndlr.sendSuccess(res, result)
        }).catch((err) => {
            rshndlr.sendError(res, err)
        });
})

/**
 * Creating a new SUB category
 */
router.route('/createSubCategory/:adminId/:categoryId').post([userValidator.authenticateToken], (req, res) => {
    let { name } = req.body;
    let { adminId, categoryId } = req.params;
    userFacade.createSubCategory(name, categoryId)
        .then((result) => {
            rshndlr.sendSuccess(res, result)
        }).catch((err) => {
            rshndlr.sendError(res, err)
        });
})


/**
 * Fetch the list of all categories
 */
router.route('/fetchAllSubCategories/:adminId').get([userValidator.authenticateToken], (req, res) => {
    let { category } = req.query;

    userFacade.fetchAllSubCategory(category)
        .then((result) => {
            rshndlr.sendSuccess(res, result)
        }).catch((err) => {
            rshndlr.sendError(res, err)
        });
})


module.exports = router;