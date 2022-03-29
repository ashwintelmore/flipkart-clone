const express = require("express");
const { getMaxListeners } = require("../../models/user");
const {
    validateSignupRequests,
    isValidateRequests,
    validateSigninRequests
} = require("../../validators/auth");
const router = express.Router();
const {signup , signin, signout} = require("../../controller/admin/auth");
const { requireSignin } = require("../../comman-middleware");


// ,express.json({type: '*/*'})

router.post("/admin/signup", validateSignupRequests,isValidateRequests, signup);
router.post("/admin/signin",express.json({type: '*/*'}),validateSigninRequests,isValidateRequests,signin );
router.post("/admin/signout" , signout)

// router.post("/profile" , requireSignin ,(req , res)=>{
//     res.json({
//         massege:"User profile",
//     })
// })

module.exports = router;