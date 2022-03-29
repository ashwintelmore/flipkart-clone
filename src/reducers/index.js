
import { combineReducers } from 'redux'
import categoryReduser from './category.reduser';
import productReduser from './product.reduser'

const rootReducer =  combineReducers({
    category : categoryReduser,
    product : productReduser,
})


export default rootReducer;