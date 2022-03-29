import { act } from "react-dom/test-utils";
import { allCategoryConstant } from "../actions/constants";

const initialState = {
    categoryList :[],
    loding : false,
    error : null
}


const buildCategoryList = ( parentId , categoryList , category)=>{
    //console.log.log(parentId);
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

    let newCategories = [];
    for (const cat of categoryList) {
        if (cat._id == parentId) {
            // //console.log.log(cat.SubCategory);
            // //console.log.log(cat.SubCategory.length);

            const newCategory = {
                _id:category._id,
                name:category.name,
                slug:category.slug,
                parentId : category.parentId,
                SubCategory:[],
            }
        
            newCategories.push({
                ...cat,
                SubCategory: cat.SubCategory.length ? [...cat.SubCategory , newCategory ] : [newCategory],
            })
        } else {
            newCategories.push({
                ...cat,
                SubCategory: cat.SubCategory ? buildCategoryList(parentId , cat.SubCategory , category) : [],
            })
        }

    }
return newCategories;

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
            //console.log.log(updatedCategoryList);
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
        case allCategoryConstant.UPDATE_CATEGOTY_REQUEST:
            state={
                ...state,
                loding:true
            }
            break;
        case allCategoryConstant.UPDATE_CATEGOTY_SUCCESS:
            state={
                ...state,
                loding:false
            }
            break;
        case allCategoryConstant.UPDATE_CATEGOTY_FAILUAR:
            state={
                ...state,
                error:action.payload.error,
                loding:false
            }
            break;
    
        default:
            break;
    }
    return state;
}
