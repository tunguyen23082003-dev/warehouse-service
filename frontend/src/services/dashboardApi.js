import apiClient from './apiClient';

const dashboardApi = {
    getOverview: () => apiClient.get('/dashboard/overview'), // Endpoint gộp theo thiết kế Phần 4
};

export default dashboardApi;

