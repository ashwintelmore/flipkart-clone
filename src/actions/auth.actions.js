// import axios from "axios";
import { authConstant } from "./constants";
import axios from '../helper/axios'


export const Login = (user)=>{
    return async (dispatch)=>{
        
        dispatch({type: authConstant.LOGIN_REQUEST,});
        const res = await axios.post( `/admin/signin `, {
            ...user  //Sending user data to node server for checking is user foud or not
        });

        //console.log.log(res);
        //console.log.log(res.status);
        if (res.status === 200) {
            const {token , user} = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload:{
                    token , user
                }
            });
        }else{
            if (res.status === 400) {
                dispatch({
                    type: authConstant.LOGIN_FAILUAR,
                    payload:{
                        error:res.data.error
                    }
                });
            }
        }
      
    }
};

    // ***************** IPM note ************
    // WHy we not returning only object like this bcoz then we cat not use post request
    // axios for here is async and await funda so that why using this this type of code
    // return {
    //     type: authConstant.LOGIN_REQUEST,
    //     payload:{
    //         ...user
    //     }
       // ***************** IPM note ************
    // }


export const isUserLogined =()=>{
    return async (dispatch)=>{
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse( localStorage.getItem('user'));
            dispatch({
                type: authConstant.LOGIN_SUCCESS,
                payload:{
                    token , user
                }
            })
        }
    }
}
export const userLogout =()=>{
    return async (dispatch)=>{

        dispatch({type: authConstant.LOGOUT_REQUEST})
        const res = await axios.post("/admin/signout");

        //console.log.log(res);
        if (res.status === 200) {
            localStorage.clear();
            dispatch({
                type: authConstant.LOGOUT_SUCCESS,
            })
        }else{
            dispatch({
                type: authConstant.LOGOUT_FAILUAR,
                payload:{
                    error:res.data.error
                }
            })
        }


       
           
    }
}