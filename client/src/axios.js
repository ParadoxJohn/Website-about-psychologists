import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://website-about-psychologists.onrender.com',
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log('Authorization header set:', config.headers['Authorization']);
    } else {
        console.log('No token found in localStorage');
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default instance;