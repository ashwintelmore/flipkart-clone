const User = require('../models/user');
const env = require("dotenv");
const jwt = require('jsonwebtoken');
const shortId = require("shortid");


exports.signup = (req, res) => {

    User.findOne({
            email: req.body.email
        })
        .exec((err, user) => {
            //console.log(err);
            //console.log(user);
            if (user) {
                return res.status(400).json({
                    massege: "user already exist"
                });
            } else {
                const {
                    firstName,
                    // userName,
                    lastName,
                    email,
                    hash_password
                } = req.body;

                const _user = new User({
                    firstName,
                    lastName,
                    email,
                    hash_password,
                    userName:shortId.generate(),
                });
                _user.save((err, data) => {
                    if (err) {
                        //console.log(err);
                        return res.json({
                            massege: 'Somthing went wrong'
                        })
                    } else {
                        return res.json({
                            massege: data
                        })
                    }
                })
            }

        });
};


exports.signin = (req, res) => {

    //console.log(req.body.userName);

    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(400).json({
                err
            });
        } else {

            if (user) {
                if (user.authenticate(req.body.password)) {
                    const token = jwt.sign({
                        _id: user._id , role:user.role
                    }, process.env.JWT_SECRET, {
                        expiresIn: '1d'
                    });
                    const {
                        _id,
                        role,
                        firstName,
                        lastName,
                        email,
                        userName,
                        password,
                        contactNumber,
                        profilePicture,
                        fullName
                    } = user;

                    res.status(200).json({
                        token,
                        user: {
                            _id,
                            firstName,
                            userName,
                            lastName,
                            email,
                            password,
                            role,
                            contactNumber,
                            profilePicture,
                            fullName
                        }
                    })
                } else {
                    res.status(200).json({
                        massege: "Password is wrong"
                    })
                }
            } else {
                res.status(200).json({
                    massege: "Not found"
                })
            }
        }
    })
}