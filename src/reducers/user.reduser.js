import { userDataConstant } from "../actions/constants";


const initialState ={
    error : null,
    massege:'',
    loding:false,
    registerPosition : false
};


export default (state= initialState , action)=>{
    //console.log.log(action);
    // //console.log.log( action.payload.data);
    switch (action.type) {
        case userDataConstant.USER_SIGNUP_REQUEST:
            state={
                ...state,
                loding:true
            }
            break;
        case userDataConstant.USER_SIGNUP_SUCCESS:
            state={
                ...state,
                massege : action.payload.massege,
                registerPosition:true,
                loding:false
            }
            break;
        case userDataConstant.USER_SIGNUP_FAILUAR:
            state={
                ...state,
                massege : action.payload.massege,
                registerPosition:false,
            }
            break;
    
        default:
            break;
    }
    return state;

}