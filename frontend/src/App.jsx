import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Lazy load components to improve performance
const LandingPage = React.lazy(() => import('./components/LandingPage'));
const AuthScreen = React.lazy(() => import('./components/AuthScreen'));
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout'));
const ManagerLayout = React.lazy(() => import('./components/manager/ManagerLayout'));
const StaffLayout = React.lazy(() => import('./components/staff/StaffLayout'));
const Dashboard = React.lazy(() => import('./components/admin/Dashboard'));
const UserManagement = React.lazy(() => import('./components/admin/UserManagement'));
const WarehouseManagement = React.lazy(() => import('./components/admin/WarehouseManagement'));
const CatalogManagement = React.lazy(() => import('./components/admin/CatalogManagement'));
const Reports = React.lazy(() => import('./components/admin/Reports'));

// Placeholder components for Manager and Staff since they don't exist yet
const Placeholder = ({ title }) => <div className="p-8 text-white"><h2 className="text-2xl font-bold">{title}</h2><p className="text-slate-400 mt-2">Đang xây dựng...</p></div>;

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-[#050a14]"><div className="text-cyan-500 text-xl font-bold animate-pulse">Đang tải ứng dụng...</div></div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthScreen />} />
              
              {/* ADMIN ROUTES */}
              <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="warehouses" element={<WarehouseManagement />} />
                  <Route path="catalogs" element={<CatalogManagement />} />
                  <Route path="reports" element={<Reports />} />
                </Route>
              </Route>

              {/* MANAGER ROUTES (THU_KHO) */}
              <Route path="/manager" element={<ProtectedRoute allowedRoles={['THU_KHO']} />}>
                <Route element={<ManagerLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="inventory" element={<Placeholder title="Tồn kho" />} />
                  <Route path="orders/pending" element={<Placeholder title="Phiếu chờ duyệt" />} />
                  <Route path="products" element={<Placeholder title="Sản phẩm" />} />
                  <Route path="alerts" element={<Placeholder title="Cảnh báo tồn kho" />} />
                </Route>
              </Route>

              {/* STAFF ROUTES (NHAN_VIEN_KHO) */}
              <Route path="/staff" element={<ProtectedRoute allowedRoles={['NHAN_VIEN_KHO']} />}>
                <Route element={<StaffLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="orders/create" element={<Placeholder title="Tạo phiếu xuất/nhập" />} />
                  <Route path="orders/my" element={<Placeholder title="Phiếu của tôi" />} />
                  <Route path="inventory" element={<Placeholder title="Tồn kho chi nhánh" />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
