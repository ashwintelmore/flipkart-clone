const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cosr = require("cors");
app = express();

//routes
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin/auth");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const initialDataRouter = require("./routes/admin/initiaData");
const { join } = require("path");




//envoiroment variable all constant 
env.config();




// ****************del*************************
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json())

app.use(express.json());
// app.post("/data", express.json({type: '*/*'}) , (req , res)=>{
    // const res_data = JSON.parse(req.body);
    // res.json(req.body);
    // //console.log(req.body);
    // //console.log(res_data);
    // res.send("ok");
    // res.status(200).json({
        //     massege:req.body,
        // });
    // })
// ****************del*************************
        

//Conection to the mongodb database 
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_password}@cluster0.efxnf.mongodb.net/${process.env.MONGO_DB_collection}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,

    }).then(() => {
    //console.log("Database connected");
});;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
       next();
 });
app.use(cosr());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRouter);
app.use("/api", adminRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", initialDataRouter);



app.listen(process.env.PORT, () => {
    //console.log(`server is load on ${process.env.PORT} port`);
});