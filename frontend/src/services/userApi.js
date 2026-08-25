import apiClient from './apiClient';

const userApi = {
    getAll: () => apiClient.get('/users'),
    getById: (id) => apiClient.get(`/users/${id}`),
    create: (data) => apiClient.post('/users', data),
    update: (id, data) => apiClient.put(`/users/${id}`, data),
    delete: (id) => apiClient.delete(`/users/${id}`),
    // Thêm các API khác như đổi mật khẩu, gán role nếu cần
};

export default userApi;

