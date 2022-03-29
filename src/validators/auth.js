const {check ,validationResult} = require('express-validator')

exports.validateSignupRequests = [
    check('firstName').notEmpty().withMessage('Fisrt name Required'),
    check('lastName').notEmpty().withMessage('Last name Required'),
    check('hash_password').isLength({
        min: 6
    }).withMessage('Password must be at least 6 character long'),
    check('email').isEmail().withMessage('Not valid email id'),
];


exports.validateSigninRequests = [
    check('email').notEmpty().withMessage('email Required'),
    check('password').isLength({
        min: 6
    }).withMessage('Password must be at least 6 character long'),
];


exports.isValidateRequests = (req , res ,next)=> {
    //console.log(req.body);
    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res.status(400).json({ errors: errors.array()[0].msg})
    };
    next();

};
