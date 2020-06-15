/**
 * @author vishal rana
 */


const MESSAGES = {
  NAME_CANT_EMPTY: "Username is empty or invalid.",
  PWD_CANT_EMPTY: "Password is empty or invalid.",
  UNAUTH: "Unauthorize access",
  tokenNotProvided: "Please provide token for authorization",
  Success: "Success",
  ERRORFETCHUSERRECORD: 'Error fetching user details',
  MISMATCHPASS: "Please check the password and try again.",
  ERROR: "Please try again after sometime.",
  CATEGORYINVALID: "Category invalid.",
  CATEGORYNAMEISREQUIED: "Category name can't be blank"
};


const CODE = {
  FRBDN: 403,
  INTRNLSRVR: 500,
  Success: 200,
  BADREQ: 404,
  MISSINGVALUE: 400
}
module.exports = {
  MESSAGES: MESSAGES,
  CODE: CODE
};
