import axios from "../helper/axios";
import { allCategoryConstant } from "./constants";

export const allCategoryData = (data) =>{

    return async (dispatch) =>{

        dispatch({type : allCategoryConstant.ALL_CATEGORY_REQUEST});
        const res = await axios.get('/categories/getCategory');
        console.log(res.data.categoryList);
        if (res.status === 200) {
            dispatch({
                type : allCategoryConstant.ALL_CATEGORY_SUCCESS,
                payload:{
                    categoryList : res.data.categoryList
                }
            })
        }else{
            dispatch({
                type : allCategoryConstant.ALL_CATEGORY_FAILUAR,
                payload:{
                    error: res.data.error
                }
            })
        }
    }
}


export const createCategoryItem = (form) =>{

    return async (dispatch) =>{
        console.log(form);
        dispatch({type : allCategoryConstant.ADD_CATEGORY_ITEM_REQUEST});
        const res = await axios.post('/categories/create' , form);
        
        console.log(res.data.category);
        if (res.status === 200) {
            dispatch({
                type : allCategoryConstant.ADD_CATEGORY_ITEM_SUCCESS,
                payload:{
                    categoryList : res.data.category
                }
            })
        }else{
            dispatch({
                type : allCategoryConstant.ADD_CATEGORY_ITEM_FAILUAR,
                payload:{
                    error: res.data.error
                }
            })
        }
    }
}


