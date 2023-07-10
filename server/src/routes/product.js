const express = require("express");
const router = express.Router();
const { requireSignin, adminMiddleWare } = require("../comman-middleware");
const { createProduct , getProductsBySlug} = require("../controller/product");

const multer = require("multer");
const shortId = require("shortid")
const path = require("path");
const { generate } = require("shortid");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname) , 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() +"-" + file.originalname);
    }
  })
   
  const upload = multer({ storage })

// ,express.json({type: '*/*'})
router.post("/product/create",requireSignin,adminMiddleWare, upload.array('productPicture'), createProduct);
router.get("/products/:slug" , getProductsBySlug)




module.exports = router;