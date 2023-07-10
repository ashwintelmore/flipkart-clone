
const slug = require("slug");
const Product = require("../models/product");
const Category = require("../models/category")
exports.createProduct = (req , res)=>{


    const {name  , price , quantity , description  ,category , createdBy} = req.body;

// *****************use for only taking pictures from form*************
    let productPictures = [];
    if (req.files.length > 0) {
      productPictures = req.files.map((file) => {
        //   //console.log(img);
        //   //console.log(pro);
        return { img: process.env.API + "/public/" + file.filename };
      });
    }
// *****************use for only taking pictures from form*************
  


    const product = new Product({
        name:name,
        slug: slug(name),
        price,
        quantity, 
        description, 
        productPictures,
        category,
        createdBy:  req.user._id,
    })
    
    //console.log(req.user._id,);

    product.save((err , products)=>{
        if (err) {
           return res.status(400).json({ err })
        }else{
            if (products) {
                res.status(200).json({  product })
            }
        }
    })
}


exports.getProductsBySlug = (req , res)=>{
    const { slug } = req.params;

    Category.findOne({slug:slug}).select('_id').exec((err , category)=>{

        if (err) {
           return res.status(400).json({err})
        }
        if(category){

            Product.find({category : category._id}).exec((err , products)=>{
                if (err) {
                   return res.status(400).json({err})
                }
                if(products){
                    res.status(200).json({
                        products,
                        productsByPrice: {
                            under5k: products.filter((product) => product.price <= 5000),
                            under10k: products.filter(
                                (product) => product.price > 5000 && product.price <= 10000
                            ),
                            under15k: products.filter(
                                (product) => product.price > 10000 && product.price <= 15000
                            ),
                            under20k: products.filter(
                                (product) => product.price > 15000 && product.price <= 20000
                            ),
                            under30k: products.filter(
                                (product) => product.price > 20000 && product.price <= 30000
                            ),
                            },
                        
                    })
                }else{
                    res.status(404).json({
                        massege:"not Found"
                    })
                }
            })
        }else{
            res.status(404).json({
                massege:"not Found"
            })
        }  
    })
}