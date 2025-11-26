import axios from 'axios';

const apiClient = axios.create({
    //baseURL: process.env.REACT_APP_API_URL ,
    // baseURL: 'http://10.249.69.201:8080', //hotspot
    baseURL: 'http://10.0.0.2:8080',
    // baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default apiClient;