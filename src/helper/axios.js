import axios from 'axios'
import { api } from '../URLConfig'

const token = localStorage.getItem('token');
console.log(token);

const axiosInstance = axios.create({
    baseURL: api,
    headers:{
        Authorization : token ? `Bearer ${token}` : '',
    }
});

export default axiosInstance;