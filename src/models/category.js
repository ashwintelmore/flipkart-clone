const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
    name:{
        type : String,
        require : true,
        unique: true,
        trim:true
        },
    slug:{
        type : String,
        require : true,
        unique: true,
        index: true,
        trim: true
        },
    type:{
        type: String
    },
    categoryImage : {
        type:String
    },
    parentId: {
        type: String,
        }
    },{timestamps:true}
);

const Categorie = new mongoose.model("Categorie" , categorySchema);

Categorie.createIndexes();

module.exports = Categorie;