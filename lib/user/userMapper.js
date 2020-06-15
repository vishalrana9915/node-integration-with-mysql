/**
 * @author vishal rana
 */
function sendResponse(code, message, result) {
    if (result) {
        return {
            responseCode: code,
            responseMessage: message,
            responseData: result
        }
    } else {
        return {
            responseCode: code,
            responseMessage: message,
        }
    }
}

module.exports = {
    sendResponse, //send response for result
}