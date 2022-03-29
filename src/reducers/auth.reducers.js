import { authConstant } from "../actions/constants"

const initialState = {
    token: null,
    user: {
        email: '',
        firstName: '',
        fullName: '',
        lastName: '',
        role: '',
        userName: '',
        _id: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
}

export default (state = initialState , action)=>{

    // console.log.log(action);
    
    switch(action.type){
        case authConstant.LOGIN_REQUEST:
            state={
                ...state,
                authenticating:true,
            }
             break;
        case authConstant.LOGIN_SUCCESS:
            state={
                ...state,
                token:action.payload.token,
                user:action.payload.user,
                authenticate:true,
                authenticating:false
            }
             break;
        case authConstant.LOGIN_FAILUAR:
            state={
                ...state,
                error:action.payload.error,
                loading:false,
            }
             break;
        case authConstant.LOGOUT_REQUEST:
            state={
                ...state,
                loading:true
            }
             break;
        case authConstant.LOGOUT_SUCCESS:
            state={
                ...initialState
            }
             break;
        case authConstant.LOGOUT_FAILUAR:
            state={
                ...state,
                error:action.payload.error
            }
             break;

    }
    return state;
}