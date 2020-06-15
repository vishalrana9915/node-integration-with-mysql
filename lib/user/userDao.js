/**
 * @author vishal rana
 */
const dbInstance = require("../config");
const constant = require("../constants")
const appUtil = require("../appUtils")
function checkDefaultadmin() {
    dbInstance.dbConfig.query(`SELECT id FROM ${constant.DB_MODEL_REF.ADMINTABLE} WHERE active=true`, async (err, rows) => {
        if (err) {
            console.log("Error while query db")
            process.exit(0);
        } else {
            if (rows.length == 0) {
                let name = process.env.adminName;
                let password = await appUtil.generateSaltAndHashForPassword(process.env.adminPass)
                let obj = {
                    username: name,
                    password,
                    active: true
                }
                console.log(`INSERT INTO ${constant.DB_MODEL_REF.ADMINTABLE} SET ?`)
                dbInstance.dbConfig.query(`INSERT INTO ${constant.DB_MODEL_REF.ADMINTABLE} SET ?`, obj, (err_inner, rows_inner) => {
                    console.log({ err_inner, rows_inner })
                })
            } else {
                console.log("Admin already created..")
            }
        }
    })

}


/**
 * This function will create a new category to the database
 * @param {string} name, category name
 */
function createCategory(name) {
    let obj = {
        name,
        active: true
    }
    return new Promise((resolve, reject) => {
        dbInstance.dbConfig.query(`INSERT INTO ${constant.DB_MODEL_REF.CATEGORYTABLE} SET ?`, obj, (err, data) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        })

    })
}

/**
 * Function to fetch user details from the username
 * @param {string} userName , username to match admin record
 */
function getUserDetails(userName) {
    return new Promise((resolve, reject) => {
        dbInstance.dbConfig.query(`SELECT * FROM ${constant.DB_MODEL_REF.ADMINTABLE} WHERE username='${userName}'`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })

    })
}


/**
 * This function will fetch all categies that are added in the database by the admin
 */
function fetchAllCategory() {
    return new Promise((resolve, reject) => {
        dbInstance.dbConfig.query(`SELECT * FROM ${constant.DB_MODEL_REF.CATEGORYTABLE}`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })

    })
}

/**
 * db query to fetch category from id
 * @param {string} id , unique id to fetch category details
 */
function fetchCategoryFromId(id) {
    return new Promise((resolve, reject) => {
        dbInstance.dbConfig.query(`SELECT * FROM ${constant.DB_MODEL_REF.CATEGORYTABLE} WHERE id=${id}`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })

    })
}

/**
 * This function will create a new subcategory to the database
 * @param {string} name, subcategory name
 * @param {string} categoryId, category for the refrence
 */
function createSubCategory(name, categoryId) {
    let obj = {
        name,
        active: true,
        cat_id: categoryId
    }
    return new Promise((resolve, reject) => {
        dbInstance.dbConfig.query(`INSERT INTO ${constant.DB_MODEL_REF.SUBCATEGORYTABLE} SET ?`, obj, (err, data) => {
            if (err) {
                reject(false);
            } else {
                resolve(true);
            }
        })

    })
}


/**
 * db query to fetch category from id
 * @param {string} id , unique id to fetch category details
 */
function fetchAllSubCategory(id) {
    let query;
    if (!id) {
        query = `SELECT * FROM ${constant.DB_MODEL_REF.SUBCATEGORYTABLE}`
    } else
        query = `SELECT * FROM ${constant.DB_MODEL_REF.SUBCATEGORYTABLE} WHERE cat_id=${id}`
    return new Promise((resolve, reject) => {
        dbInstance.dbConfig.query(query, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        })

    })
}



setTimeout(checkDefaultadmin, 2000)

module.exports = {
    createCategory, //creating a new category to the database

    getUserDetails, //function to fetch user details from username

    fetchAllCategory, //fetch all categories from database

    fetchCategoryFromId, //fetch category details from category id

    createSubCategory, //admin creating a new subcategory

    fetchAllSubCategory, //fetch all sub categories 
}