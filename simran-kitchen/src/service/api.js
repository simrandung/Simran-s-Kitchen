import axios from 'axios';

const API_URL = 'http://localhost:8000';

 const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout:10000,
    headers: {
        "content-type":"application/json"
    }

})

axiosInstance.interceptors.request.use(
    function(config){
        return config;
    },
    function(error){
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.request.use(
    function(response){
        //Stop
    }
)