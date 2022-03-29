import reactDom from "react-dom";
import axios from "../helper/axios";
import { allCategoryConstant } from "./constants";

const allCategoryData = (data) =>{

    return async (dispatch) =>{

        dispatch({type : allCategoryConstant.ALL_CATEGORY_REQUEST});
        const res = await axios.get('/categories/getCategory');
        // //console.log.log(res.data.categoryList);
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
        // //console.log.log(form);
        try {
            dispatch({type : allCategoryConstant.ADD_CATEGORY_ITEM_REQUEST});
            const res = await axios.post('/categories/create' , form);
            
            //console.log.log(res.data.category);
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
        } catch (error) {
            console.log(error);
        }
    
    }
}

export const updateCategories = (form) =>{

    return async (dispatch) =>{
        //console.log.log(form);
        dispatch({type:allCategoryConstant.UPDATE_CATEGOTY_REQUEST});
        const res = await axios.post('/categories/update' , form);
        
        if(res.status === 201){
            dispatch({type:allCategoryConstant.UPDATE_CATEGOTY_SUCCESS});
            dispatch(allCategoryData());
            return true;
        }else{
            const {error} = res.data;
            dispatch({
                type:allCategoryConstant.UPDATE_CATEGOTY_FAILUAR,
                payload:{
                    error
                }
            });
            
        }
    }
}

export const deleteCategories = (ids) =>{

    return async (dispatch) =>{
        // //console.log.log(form);

        const res = await axios.post('/categories/delete' , {
            payload : {
                ids
            }
            }
        );
        if (res.status == 201) {
            return true
        } else {
            return false
        }
    }
}


export {
    allCategoryData
}