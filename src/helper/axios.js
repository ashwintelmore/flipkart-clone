import axios from 'axios'
import { api } from '../URLConfig';
import store  from '../store'
import { authConstant } from '../actions/constants';

const token = localStorage.getItem('token');
//console.log.log(token);

const axiosInstance = axios.create({
    baseURL: api,
    headers:{
        'Authorization' : token ? `Bearer ${token}` : '',
    }
});
//console.log.log(axiosInstance);

axiosInstance.interceptors.request.use(req => {
        const {auth} = store.getState();
        console.log(auth);

    console.log(req);
    return req;
  });


axiosInstance.interceptors.response.use(req => {
    console.log(req);
    // You must return the request at the end
    return req;
  }, (err)=>{
      const {status} = err.response;
      if (status===500 || status === 400) {
          localStorage.clear();
          store.dispatch({type: authConstant.LOGOUT_SUCCESS})
          console.log(err.response);
      }
  }) ;

export default axiosInstance;