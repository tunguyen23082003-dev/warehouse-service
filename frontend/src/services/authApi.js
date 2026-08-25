import apiClient from './apiClient';

const authApi = {
    login: (data) => apiClient.post('/auth/login', data),
    register: (data) => apiClient.post('/auth/register', data)
};

export default authApi;

