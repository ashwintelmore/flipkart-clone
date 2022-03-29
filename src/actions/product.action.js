import axios from "../helper/axios"
import { addProductConatat } from "./constants";


export const addProduct = (form) =>{
    return async (dispatch) =>{
        dispatch({type:addProductConatat.ADD_PRODUCT_REQUEST})
        const res = await axios.post("/product/create" , form);
        //console.log.log(res);
        
    }
}