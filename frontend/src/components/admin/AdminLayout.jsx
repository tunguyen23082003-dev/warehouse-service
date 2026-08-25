import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Warehouse, Tags, BarChart3, Bell, Search, Box, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
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
          <Box className="text-cyan-400" size={28} />
          <span>SmartKho Admin</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/users" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Users size={20} />
            <span>Người dùng</span>
          </NavLink>
          <NavLink to="/admin/warehouses" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Warehouse size={20} />
            <span>Quản lý Kho</span>
          </NavLink>
          <NavLink to="/admin/catalogs" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Tags size={20} />
            <span>Danh mục</span>
          </NavLink>
          <NavLink to="/admin/reports" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <BarChart3 size={20} />
            <span>Báo cáo</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <div className="flex items-center gap-2 bg-slate-900/50 border border-white/10 px-4 py-2 rounded-lg">
              <Search size={18} className="text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="bg-transparent border-none text-white focus:outline-none w-64 text-sm"
              />
            </div>
          </div>
          
          <div className="topbar-right">
            <Bell size={20} className="topbar-icon" />
            
            <div className="user-profile">
              <div className="avatar">{user?.fullName?.charAt(0) || 'A'}</div>
              <div className="user-info">
                <span className="user-name">{user?.fullName || 'Admin'}</span>
                <span className="user-role">Quản trị viên</span>
              </div>
            </div>
            
            <button className="logout-btn" onClick={handleLogout} title="Đăng xuất"><LogOut size={20} /></button>
          </div>
        </header>

        {/* Page Content area (will render nested routes here) */}
        <div className="admin-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

