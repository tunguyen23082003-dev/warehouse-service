import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor cho Request: Gắn token vào header
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Đọc token từ localStorage (do AuthContext lưu vào đây)
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor cho Response: Xử lý lỗi 401
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Xóa thông tin đăng nhập
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            
            // Điều hướng về trang đăng nhập
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export default apiClient;

