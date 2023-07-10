const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    slug: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: {
        type: Number
    },
    productPictures: [{
        img: {
            type: String
        }
    }],
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,//liking 
            ref: 'User',
            required: true
        },
        review: String
    }],

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedAt: Date,


}, {
    timestamps: true
});

module.exports = new mongoose.model("Product", productSchema);