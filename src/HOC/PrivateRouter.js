import React from 'react'
import { Redirect, Route } from 'react-router'

// export default function PrivateRouter({component : Component , ...rest}) {
//     return (
//        <Route {...rest}  Component = {(props)=>{
//            const token = window.localStorage.getItem('token');

//            if(token){
//                return <Component {...props} />
//            }else{
//                return <Redirect to={"/signin"} />
//            }
//        }} />
    // )
// }

const PrivateRouter = ({component: Component, ...rest}) => {
    return <Route {...rest} component={(props) => {
        const token = window.localStorage.getItem('token');
        if(token){
            return <Component {...props} />
        }else{
            return <Redirect to={`/signin`} />
        }
    }} />
}

export default PrivateRouter;
