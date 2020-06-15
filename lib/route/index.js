
// Load user routes
const usrRouter = require('../user/userRoute');
// Load video routes
const responseHandler = require('../responseHandler');


//========================== Load Modules End ==============================================

//========================== Export Module Start ====== ========================

module.exports = function (app) {

    // Attach User Routes

    app.use('/v1/api/admin', usrRouter);

    // Attach ErrorHandler to Handle All Errors
    app.use(responseHandler.hndlError);

};
