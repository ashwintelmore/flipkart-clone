import axios from "../helper/axios"
import { getProductPageConstant } from "./constants";


export const ProductList  = (slug) =>{
    return async dispatch =>{
        dispatch({ type:getProductPageConstant.GET_PRODUCT_BY_SLUG_REQUEST,})
        const res = await axios.get(`/products/${slug}`)
        console.log(res);
        if (res.status === 200) {
            dispatch({
                type:getProductPageConstant.GET_PRODUCT_BY_SLUG_SUCCESS,
                payload:res.data
            })
        }else{
            // if (res.status === 404){
            //     dispatch({
            //         type:getProductPageConstant.GET_PRODUCT_BY_SLUG_SUCCESS,
            //         payload:res.data.massege
            //     })
            // }
        }
    }
}
