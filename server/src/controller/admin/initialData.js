const Categories =require("../../models/category")
const Products =require("../../models/product")



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




exports.initialData = async (req , res) => {
    // It is also use for geting data from mongoose database
    // select function use for geting the only some data from existing database
    const categoryList = await Categories.find({}).exec();
    const products = await Products.find({})
        .select("_id name price quantity slug description productPictures category")// No space
        .populate({path : "category" , select:"_id name"})
        .exec();

    //console.log(categoryList);

    res.status(200).json({
        categoryList : createSubCategory(categoryList),
        products
    })


}