const express = require("express");
const router = express.Router();
const { createCategory, getCategory, updateCategory, deleteCategories } = require("../controller/category");
const { requireSignin, adminMiddleWare } = require("../comman-middleware");



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
router.post("/categories/create",requireSignin,adminMiddleWare, upload.single('categoryImage'), createCategory);
router.get("/categories/getCategory",getCategory);
router.post("/categories/update", upload.array('categoryImage'), updateCategory);
router.post("/categories/delete",  deleteCategories);





module.exports = router;