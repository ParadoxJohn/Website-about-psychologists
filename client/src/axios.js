import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://website-about-psychologists.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default instance;