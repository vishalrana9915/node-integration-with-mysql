const STATUS_CODE = {
    ERROR: 0,
    SUCCESS: 1
};
const ACCOUNT_LEVEL = {
    ADMIN: 1,
    NORMAL_USER: 0
};
const LOGIN_TYPE = {
    FB: 0,
    TW: 1
};
const DB_MODEL_REF = {
    ADMINTABLE: process.env.adminTable,
    USERTABLE: process.env.userTable,
    CATEGORYTABLE: process.env.categoryTable,
    SUBCATEGORYTABLE: process.env.subcategoryTable
};

module.exports = Object.freeze({
    APP_NAME: 'Test',
    TOKEN_EXPIRATION_TIME: 24 * 60, // in mins - 60 days
    DB_MODEL_REF: DB_MODEL_REF
});
