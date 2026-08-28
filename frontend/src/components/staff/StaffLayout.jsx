import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Box, FilePlus, FileText, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import '../admin/AdminLayout.css'; // Reuse CSS

const StaffLayout = () => {
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
          <Box className="text-violet-400" size={28} />
          <span>Nhân Viên Kho</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/staff/orders/create" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <FilePlus size={20} />
            <span>Tạo phiếu xuất/nhập</span>
          </NavLink>
          <NavLink to="/staff/orders/my" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <FileText size={20} />
            <span>Phiếu của tôi</span>
          </NavLink>
          <NavLink to="/staff/inventory" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Box size={20} />
            <span>Tồn kho (Chi nhánh)</span>
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
                <span className="user-role">Nhân Viên Kho</span>
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

export default StaffLayout;

