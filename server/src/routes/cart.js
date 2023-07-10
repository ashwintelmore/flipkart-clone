const express = require("express");
const {
    validateSignupRequests,
    isValidateRequests,
    validateSigninRequests
} = require("../validators/auth");
const router = express.Router();

// const { createCategory, getCategory } = require("../controller/category");
const { requireSignin, userMiddleWare } = require("../comman-middleware/index");
const { addItemtocart } = require("../controller/cart");


// ,express.json({type: '*/*'})
router.post("/user/cart/addItemtocart",requireSignin,userMiddleWare,addItemtocart);





module.exports = router;