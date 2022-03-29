import axios from "../helper/axios"
import { allCategoryConstant, productConstant } from "./constants";


export const getAllInitialData = ()=>{
    return async (dispatch) => {
        dispatch({type:allCategoryConstant.ADD_CATEGORY_ITEM_REQUEST})
        const res = await axios.post("/initialdata");

        if (res.status===200) {
            const {categoryList , products } = res.data
            dispatch({
                type : allCategoryConstant.ALL_CATEGORY_SUCCESS,
                payload:{ categoryList }
            });
            dispatch({
                type:productConstant.GET_ALL_PRODUCT_SUCCESS,
                payload:{products}
            })
        }

        //console.log.log(res);
    }
}