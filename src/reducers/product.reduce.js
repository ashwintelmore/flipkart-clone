import { productConstant } from "../actions/constants";

const initialState = {
    products : [],
}
export default (state = initialState , action)=>{

    switch (action.type) {
        case productConstant.GET_ALL_PRODUCT_SUCCESS:
            state={
                ...state,
                products : action.payload.products
            }
            break;
    
        default:
            break;
    }

    return state;
}