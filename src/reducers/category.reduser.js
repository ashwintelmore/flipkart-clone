import { act } from "react-dom/test-utils";
import { allCategoryConstant } from "../actions/constants";

const initialState = {
    categoryList :[],
    loding : false,
    error : null
}


const buildCategoryList = ( parentId , categoryList , category)=>{
    console.log(parentId);
    if (parentId == undefined) {
        return [
            ...categoryList,
            {
                _id:category._id,
                name:category.name,
                slug:category.slug,
                SubCategory:[],
            }
        ]
    }

    let newCategory = [];
    for (const cat of categoryList) {
        if (cat._id == parentId) {
            console.log(cat.SubCategory);
            console.log(cat.SubCategory.length);
            newCategory.push({
                ...cat,
                SubCategory: cat.SubCategory ? buildCategoryList(parentId , [...cat.SubCategory , {
                    _id:category._id,
                    name:category.name,
                    slug:category.slug,
                    parentId : category.parentId,
                    SubCategory:category.SubCategory,

                }], category) : [],
            })
        } else {
            newCategory.push({
                ...cat,
                SubCategory: cat.SubCategory ? buildCategoryList(parentId , cat.SubCategory , category) : [],
            })
        }

    }
return newCategory;

}

export default (state = initialState , action)=>{

    switch (action.type) {
        case allCategoryConstant.ALL_CATEGORY_REQUEST:
            state={
                ...state,
                loding:true
            }
            break;
        case allCategoryConstant.ALL_CATEGORY_SUCCESS:
            state={
                ...state,
                loding:false,
                categoryList : action.payload.categoryList
            }
            break;
        case allCategoryConstant.ALL_CATEGORY_FAILUAR:
            state={
                ...initialState
            }
            break;

        case allCategoryConstant.ADD_CATEGORY_ITEM_REQUEST:
            state={
                ...state,
                loding : true
            }
            break;
        case allCategoryConstant.ADD_CATEGORY_ITEM_SUCCESS:
            const category = action.payload.categoryList;
            const updatedCategoryList = buildCategoryList(category.parentId , state.categoryList , category);
            console.log(updatedCategoryList);
            state={
                ...state,
                categoryList: updatedCategoryList,
                loding : false
            }
            break;
        case allCategoryConstant.ADD_CATEGORY_ITEM_FAILUAR:
            state={
                ...initialState
            }
            break;
    
        default:
            break;
    }
    return state;
}
