import axios from '../helper/axios'
import { userDataConstant } from './constants';

export const userSignup = (user) =>{

    return( async (dispatch)=>{
        
        // //console.log.log(user);
        dispatch({type:userDataConstant.USER_SIGNUP_REQUEST})
        const res = await axios.post(`/admin/signup` , {//axios work like postman appliction
            ...user
        });
        
        //console.log.log(res.data.error);

       
        if (res.status === 201) {
            dispatch({
                type:userDataConstant.USER_SIGNUP_SUCCESS,
                payload:{
                    massege : res.data.massege
                }
            })
        }else{
            if (res.status === 400) {
                //console.log.log(res.status);
                dispatch({
                    type:userDataConstant.USER_SIGNUP_FAILUAR,
                    payload:{
                        massege : res.data.massege
                    }
                })
            }
        }
    }
    )
}