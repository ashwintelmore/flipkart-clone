const jwt = require("jsonwebtoken");
// const { use } = require("../routes/category");


exports.requireSignin =  (req, res , next)=>{

    //console.log(req.headers.authorization);
    if(req.headers.authorization){   
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token);
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user;
        //console.log(user);
    }else{
        res.status(400).json({
            massege:"authorization required"
        })    
    }
    
    next();
    
}

exports.userMiddleWare = (req , res , next)=>{
    // //console.log(req.user.role);
    if (req.user.role !== "user") {
        return res.status(400).json({
            massege:"User access denied" // प्रवेश नाकारला
        })
    }
    next();
}

exports.adminMiddleWare = (req , res , next)=>{
    //console.log(req.user);
    if (req.user.role !== "admin") {
        return res.status(400).json({
            massege:"Admin access denied" // प्रवेश नाकारला
        })
    }
    next();
}