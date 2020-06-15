'use strict';

//=================================== Load Modules start ===================================

//=================================== Load external modules=================================
const mysql = require('mysql');
const chalk = require('chalk');
const config = require('./env/development');
let connectionInstance;
//=================================== Load Modules end =====================================
connectionInstance = mysql.createConnection({
    host: config.dbConfig.host,
    user: config.dbConfig.user,
    password: config.dbConfig.password,
    database: config.dbConfig.dbName,
    // debug:true
});

connectionInstance.connect(function (err) {
    if (err) {
        console.log({ err });
        process.exit(1);
    };
    console.log(chalk.green("*************** Database connection done ***************"));
});

module.exports = connectionInstance;
