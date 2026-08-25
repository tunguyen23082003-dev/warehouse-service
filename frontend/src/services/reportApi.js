import apiClient from './apiClient';

const reportApi = {
    getImportExport: (params) => apiClient.get('/reports/import-export', { params }), // from, to, warehouseId
    getTopProducts: () => apiClient.get('/reports/top-products'),
};

export default reportApi;

