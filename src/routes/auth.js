const express = require("express");
// const {
//     getMaxListeners,
//     validate
// } = require("../models/user");


const {
    validateSignupRequests,
    isValidateRequests,
    validateSigninRequests
} = require("../validators/auth");
const router = express.Router();
const {
    signup,
    signin
} = require("../controller/auth");


// ,express.json({type: '*/*'})
                                            //u can say entered data by user is valid
                                            //I will change isValidateRequests to isValidateData     
router.post("/signup",express.json({type: '*/*'}), validateSignupRequests, isValidateRequests, signup);
router.post("/signin",express.json({type: '*/*'}), validateSigninRequests, isValidateRequests, signin);



module.exports = router;