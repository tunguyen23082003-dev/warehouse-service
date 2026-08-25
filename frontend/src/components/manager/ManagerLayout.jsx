import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, FileText, AlertTriangle, Box, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../admin/AdminLayout.css'; // Reuse CSS

const ManagerLayout = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Box className="text-emerald-400" size={28} />
          <span>Thủ Kho</span>
        </div>
        <nav className="sidebar-nav">
          {/* Using Dashboard for general stats if needed, or Tồn Kho */}
          <NavLink to="/manager/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/manager/inventory" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Box size={20} />
            <span>Tồn kho</span>
          </NavLink>
          <NavLink to="/manager/orders/pending" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <FileText size={20} />
            <span>Phiếu chờ duyệt</span>
          </NavLink>
          <NavLink to="/manager/products" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Package size={20} />
            <span>Sản phẩm</span>
          </NavLink>
          <NavLink to="/manager/alerts" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <AlertTriangle size={20} />
            <span>Cảnh báo</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div className="topbar-left">
            <span className="text-slate-300 font-medium">Chi nhánh: {user?.warehouseName || 'Không xác định'}</span>
          </div>
          <div className="topbar-right">
            <div className="user-profile">
              <div className="avatar">{user?.fullName?.charAt(0) || 'U'}</div>
              <div className="user-info">
                <span className="user-name">{user?.fullName || 'User'}</span>
                <span className="user-role">Thủ Kho</span>
              </div>
            </div>
            <button onClick={handleLogout} className="logout-btn" title="Đăng xuất">
              <LogOut size={20} />
            </button>
          </div>
        </header>
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ManagerLayout;

