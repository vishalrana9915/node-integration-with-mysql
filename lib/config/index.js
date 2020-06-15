const _ = require("lodash");
const dbConfig = require("./dbConfig");
const expressConfig = require("./expressConfig");
var envConfig = {};
var cfg = {};
var environment = process.env.NODE_ENV || 'dev';
//ENV Config
switch (environment) {
    case 'dev' :
    case 'development' :
        envConfig = require('./env/development');
        break;
    case 'prod' :
    case 'production' :
        envConfig = require('./env/production');
        break;
    case 'stag' :
    case 'staging' :
        envConfig = require('./env/staging');
        break;

}

var defaultConfig = {
    environment: "development",
    ip: 'localhost',
    port: process.env.PORT,
    protocol : 'http',
    TAG: "development"
};
//Create Final Config JSON by extending env from default
var cfg = _.extend(defaultConfig, envConfig);

//Export config module
module.exports = {
    cfg,
    dbConfig,
    expressConfig
};
