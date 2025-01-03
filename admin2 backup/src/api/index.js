import axios from 'axios';
import { toast } from 'react-toastify';

const authRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000
});

authRequest.interceptors.request.use(
    (config) => {
        const token = localStorage?.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

authRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.error('Response error:', error.response.data);
            console.error('Status code:', error.response.status);
            console.error('Headers:', error.response.headers);
            if (error.response.status === 401) {
                console.error('Unauthorized access - redirecting to login');
            }
            else if (error.response.status >= 500) {
                toast.error('Server is currently down. Please try again later.', {
                    position: "bottom-center",
                    autoClose: 3000,
                    closeOnClick: true,
                    hideProgressBar: true
                })
            }

        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error in request setup:', error.message);
        }

        return Promise.reject(error);
    }
);

export default authRequest;

