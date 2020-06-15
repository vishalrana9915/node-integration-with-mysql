/**
 * @author vishal rana
 */

const userService = require("./userService");

/**
 * This function will create a new category to the database
 * @param {string} name, category name
 */
function createCategory(name) {
    return userService.createCategory(name);
}

/**
 * Function to compare login request body
 * @param {*} obj , admin object to compare data 
 */
function login(obj) {
    return userService.login(obj);
}

/**
 * This function will fetch all categies that are added in the database by the admin
 */
function fetchAllCategory() {
    return userService.fetchAllCategory()
}

/**
 * This function will create a new subcategory to the database
 * @param {string} name, subcategory name
 * @param {string} categoryId, category for the refrence
 */
function createSubCategory(name, categoryId) {
    return userService.createSubCategory(name, categoryId);
}


/**
 * This function will fetch all subcategies that are added in the database by the admin
 * @param {string}, adding filter for particular category
 */
function fetchAllSubCategory(categoryId) {
    return userService.fetchAllSubCategory(categoryId)
}

module.exports = {
    createCategory, //creating a new category to the database

    login, //function to login using username and password

    fetchAllCategory, //fetch all categories from database

    createSubCategory, //admin creating a new subcategory

    fetchAllSubCategory, //admin fetch all subcategories
}