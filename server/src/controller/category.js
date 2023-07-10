const shortid = require("shortid");
const slug = require("slug");
const Categories = require("../models/category");


function createSubCategory(categories , parentId = null){
    const categoryList = [];
    let catogory 
    if (parentId==null) {
        catogory = categories.filter((cat)=> (cat.parentId == undefined))
    } else {
        catogory = categories.filter((cat)=> (cat.parentId == parentId))
    }

    for (let cat of catogory) {
        categoryList.push({
            _id :cat. _id,
            name:cat.name,
            slug:cat.slug,
            parentId:cat.parentId,
            type: cat.type,
            SubCategory : createSubCategory(categories , cat._id)
        });
    }

    return categoryList;
} 


exports.createCategory =  (req, res) => {

    const categoryObj = {
        name: req.body.name,
        slug: `${slug(req.body.name)}-${shortid.generate()}`
    }

    // //console.log(req.file);
    // //console.log(req.file.filename);

    if (req.file) {
        categoryObj.categoryImage = process.env.API + "/public/" + req.file.filename;
      }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
      }

      const cat = new Categories(categoryObj);
      
      cat.save((err , category)=>{
          
          if (err) {
              res.status(400).json({
                  err
              })
          }else{
              if (category) {
                  res.status(200).json({
                    category
                  })
              }
          }
      })

}


exports.getCategory = (req , res)=>{
    Categories.find({}).exec((err , category) => {

        if (err) {
            res.status(400).json({
                err
            })
        }else{
            if (category) {
                // //console.log(category);
                const categoryList = createSubCategory(category);
                // //console.log(categoryList);
                res.status(200).json({
                    categoryList
                })
            }
        }
    })
}


exports.updateCategory = async (req , res) =>{
    const {_id , name , parentId , type} = req.body;
    // console.log(req);
    console.log(req.body);
    // (name instanceof Array) it is returns the bolean value .it is only check 'name' is an object of any array
    // little more confused here (name instanceof Array)

    // *****************************NOTE****************
        // I want to know how the data is coming i want to clear that 
        // inside the category.action.js updataCategory funtion
    // *****************************NOTE****************
    const updatedCategories = [];
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
               name:  name[i],
               type: type[i],
            }
            if(parentId[i] !== ""){
                category.parentId = parentId[i];
            }
            const updatedCategory = await Categories.findOneAndUpdate({_id : _id[i]} , category , {new : true});
            updatedCategories.push(updatedCategory);
        }
        return res.status(201).json({updatedCategories});
    } else {
        const category = {
            name: name,
            type: type,
        }
        if(parentId !== ""){
            category.parentId = parentId;
        }
        const updatedCategory = await Categories.findOneAndUpdate({_id : _id} , category , {new : true});
        res.status(201).json({ updatedCategories : updatedCategory})
    }
}

exports.deleteCategories = async (req , res)=>{
    const { ids } = req.body.payload;
    console.log(ids);
    let deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
        const deletedCategory = await Categories.findOneAndDelete({_id : ids[i]._id});
        deletedCategories.push(deletedCategory);
    }

    if (deletedCategories.length == ids.length) {
        res.status(201).json({massege: "Succussefully Deleted"});
    } else {
        res.status(400).json({massege: "Something went wrong"});
    }
}