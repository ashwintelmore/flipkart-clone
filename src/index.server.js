const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");

const mongoose = require("mongoose");

app = express();

//routes

const userRouter = require("./routes/user");

//envoiroment variable all constant 
env.config();



//Conection to the mongodb database 
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_password}@cluster0.efxnf.mongodb.net/${process.env.MONGO_DB_collection}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,

    }).then(() => {
    console.log("Database connected");
});;


app.use(bodyParser.urlencoded({
    extended: true
}));




app.use("/api", userRouter);



app.listen(process.env.PORT, () => {
    console.log(`server is load on ${process.env.PORT} port`);
});