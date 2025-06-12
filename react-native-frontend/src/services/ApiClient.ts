import axios from 'axios';

const apiClient = axios.create({
    //baseURL: process.env.REACT_APP_API_URL ,
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default apiClient;