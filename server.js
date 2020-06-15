//Import Config
require('dotenv').config();
const config = require('./lib/config');
var chalk = require('chalk')
console.log("");
console.log(chalk.green("//************************* Node test  **************************//"));
console.log("");
// load external modules
const express = require("express");

// init express app
const app = express();

// set server home directory
app.locals.rootDir = __dirname;


// config express
config.expressConfig(app, config.cfg.environment);


// attach the routes to the app

require("./lib/route")(app);


// start server 
app.listen(config.cfg.port, () => {
    console.log(chalk.yellow(`************Express server listening on ${config.cfg.port}, in ${config.cfg.TAG} mode**************`));
});
