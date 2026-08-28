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
const ManagerDashboard = React.lazy(() => import('./components/manager/ManagerDashboard'));
const ManagerInventory = React.lazy(() => import('./components/manager/ManagerInventory'));
const ManagerPendingOrders = React.lazy(() => import('./components/manager/ManagerPendingOrders'));
const ManagerAlerts = React.lazy(() => import('./components/manager/ManagerAlerts'));

const StaffLayout = React.lazy(() => import('./components/staff/StaffLayout'));
const CreateOrder = React.lazy(() => import('./components/staff/CreateOrder'));
const MyOrders = React.lazy(() => import('./components/staff/MyOrders'));
const StaffInventory = React.lazy(() => import('./components/staff/StaffInventory'));
const Dashboard = React.lazy(() => import('./components/admin/Dashboard'));
const UserManagement = React.lazy(() => import('./components/admin/UserManagement'));
const WarehouseManagement = React.lazy(() => import('./components/admin/WarehouseManagement'));
const CatalogManagement = React.lazy(() => import('./components/admin/CatalogManagement'));
const Reports = React.lazy(() => import('./components/admin/Reports'));

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
              <Route path="/manager" element={<ProtectedRoute allowedRoles={['THU_KHO', 'MANAGER']} />}>
                <Route element={<ManagerLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<ManagerDashboard />} />
                  <Route path="inventory" element={<ManagerInventory />} />
                  <Route path="orders/pending" element={<ManagerPendingOrders />} />
                  <Route path="alerts" element={<ManagerAlerts />} />
                </Route>
              </Route>

              {/* STAFF ROUTES (NHAN_VIEN_KHO) */}
              <Route path="/staff" element={<ProtectedRoute allowedRoles={['NHAN_VIEN_KHO', 'STAFF']} />}>
                <Route element={<StaffLayout />}>
                  <Route index element={<Navigate to="orders/my" replace />} />
                  <Route path="orders/create" element={<CreateOrder />} />
                  <Route path="orders/my" element={<MyOrders />} />
                  <Route path="inventory" element={<StaffInventory />} />
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
