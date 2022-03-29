const User = require('../../models/user');
const env = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { cookie } = require('express-validator');
const shortId = require("shortid");


exports.signup =  (req, res) => {

    User.findOne({email: req.body.email})
    .exec( async (err , user)=> {
        //console.log(err);
        //console.log(user);
        if(user) return res.status(400).json({
                massege: "admin already exist"
        });
        

        const { 
            firstName,
            lastName,
            email, 
            password
        } = req.body;

        const hash_password = await bcrypt.hash(password , 10);
        
            const _user = new User({
            role:"admin",
            firstName,
            lastName,
            email,
            hash_password,
            userName:shortId.generate(),
            });


        _user.save((err , data)=>{
            //console.log(data);
            if(err){
                //console.log(err);
                return res.status(400).json({
                    massege:'Somthing went wrong'
                })
            }else{
                return res.status(201).json({
                    massege:"Successfully Registered as an Admin"
                })
            }
        })
        
    });
};


exports.signin = (req , res)=>{
    User.findOne({email:req.body.email}).exec( async (err , user)=>{
        if (err) {
            res.status(400).json({ err });
        }else{

            if (user) {
                //console.log(req.body.password);
                //console.log(user);
                // const isPassword = await user.authenticate(req.body.password);
                // let isPassword;
                //  bcrypt.compare(req.body.password, user.hash_password , function(err , result){
                //     isPassword = result
                //     //console.log(err);
                //     //console.log(result);
                //     //console.log("Above" , result);
                // });


                // //console.log('hash_password' ,user.hash_password);
                // //console.log('isPassword' ,isPassword);
                //console.log(user.authenticate(req.body.password));


                

                if ( user.authenticate(req.body.password) && user.role==="admin") {
                    //console.log("isPassword && user.role===");
                    const token = jwt.sign({_id:user._id , role:user.role} , process.env.JWT_SECRET , {expiresIn:'1d'});
                    //console.log(user.role);
                    //console.log(token);
                    res.cookie('token' , token, {expiresIn : '1d'})
                    const {_id , firstName ,userName ,lastName,email,password , role, contactNumber ,profilePicture,fullName} = user;

                    res.status(200).json({
                        token,
                        user :{
                            _id,
                            firstName ,
                            userName ,
                            lastName,
                            email,
                            password,
                            role,
                            contactNumber ,
                            profilePicture,
                            fullName
                        }
                    })
                }else{
                    res.status(400).json({
                        massege:" Invalid Password/UserName"
                    })
                }
            }else{
                res.status(400).json({
                    massege:"U r not an admin yet please Signup with y r eamil id"
                })
            }



        }
    })
}

exports.signout  = (req , res)=>{
    res.clearCookie('token');
    res.status(200).json({
        massege:"Signout Successfully..."
    })
}


// exports.requireSignin =  (req, res , next)=>{

//     const token = req.headers.authorization.split(" ")[1];
//     //console.log(token);
//     const decoded = jwt.verify(token, process.env.JWT_SECRET)
//     // //console.log(decoded);
//     next();
// }