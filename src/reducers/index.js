

import { combineReducers } from 'redux'
import authReducer from './auth.reducers'
import categoryReduser from './category.reduser';
import userReduser from './user.reduser';
import productReduser from './product.reduce'


const rootReducer =  combineReducers({
    auth : authReducer,
    user:userReduser,
    category : categoryReduser,
    product : productReduser,
})


export default rootReducer;