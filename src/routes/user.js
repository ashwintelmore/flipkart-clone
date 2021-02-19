const express = require("express");
const router = express.Router();
const User = require('../models/user')


router.post("/singin", (req, res) => {
    
    res.status(200).json({
        massege: "ok",
    })

});

router.post("/data" , (req , res)=>{
    res.status(200).json({
        massege:req.body.firstName,
    });
})

router.post("/signup", (req, res) => {

    User.findOne({email: req.body.email})
    .exec((err, user)=> {
        console.log(err);
        console.log(user);
        if(user) return res.status(400).json({
                massege: user
        });
        

        const {firstName  ,lastName,email,hash_password} = req.body;

        const _user = new User({
            // firstName :req.body,
            // lastName:req.body,
            // email:req.body,
            // hash_password:req.body,
            // userName:req.body,

            firstName, 
            lastName,
            email,
            hash_password,
            userName: Math.random().tostring
        });
        console.log(_user);
        
        _user.save((err , data)=>{
            console.log(data);
            if(err){
                console.log(err);
                return res.json({
                    massege:'Somthing went wrong'
                })
            }else{
                return res.json({
                    massege:data
                })
            }
        })
        
    });
});


module.exports = router;