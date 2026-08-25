import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authApi from '../services/authApi';
import './AuthScreen.css';

const AuthScreen = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [showPassword, setShowPassword] = useState(false);
  
  // Form States
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    confirmPassword: '',
    role: 'staff'
  });

  // Validation States
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  // Validation Logic
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    if (name === 'email') {
      if (!validateEmail(value)) {
        setErrors((prev) => ({ ...prev, email: 'Email không đúng định dạng' }));
      } else {
        setErrors((prev) => ({ ...prev, email: null }));
      }
    }

    if (name === 'password') {
      if (value.length < 6) {
        setErrors((prev) => ({ ...prev, password: 'Mật khẩu phải có ít nhất 6 ký tự' }));
      } else {
        setErrors((prev) => ({ ...prev, password: null }));
      }
    }
    
    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Mật khẩu xác nhận không khớp' }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: null }));
      }
    }
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (errors.email || errors.password || (activeTab === 'register' && errors.confirmPassword)) {
      showToast('Vui lòng kiểm tra lại thông tin!', 'error');
      return;
    }

    if (!formData.email || !formData.password) {
      showToast('Vui lòng điền đầy đủ thông tin bắt buộc!', 'error');
      return;
    }

    try {
      if (activeTab === 'login') {
        const payload = { username: formData.email, password: formData.password };
        const response = await authApi.login(payload);
        
        if (response.data.success) {
          const { role } = response.data.data;
          // Use AuthContext to save user and token
          login(response.data.data);
          
          showToast('Đăng nhập thành công! Đang chuyển hướng...', 'success');
          
          // Role-based routing
          setTimeout(() => {
            if (role === 'ROLE_ADMIN' || role === 'ADMIN') {
              navigate('/admin/dashboard');
            } else if (role === 'ROLE_THU_KHO' || role === 'THU_KHO') {
              navigate('/manager/dashboard');
            } else {
              navigate('/staff/dashboard');
            }
          }, 1000);
        }
      } else {
        const payload = {
          email: formData.email,
          password: formData.password,
          name: formData.fullName || formData.email.split('@')[0],
          role: 'NHAN_VIEN_KHO' // Default role for public registration
        };
        const response = await authApi.register(payload);
        if (response.data.success) {
          showToast('Đăng ký tài khoản thành công! Vui lòng đăng nhập.', 'success');
          setActiveTab('login');
        }
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!', 'error');
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification ${toast.type}`}>
          {toast.message}
        </div>
      )}

      {/* Left Panel: Visual Branding */}
      <div className="auth-left">
        <div className="auth-left-overlay">
          <div className="auth-brand">
            <div className="brand-logo">📦</div>
            <h1 className="brand-name">Hệ thống kho thông minh</h1>
            <p className="brand-slogan">Optimizing Logic. Mastering Motion.</p>
          </div>
        </div>
      </div>

      {/* Right Panel: Form Area */}
      <div className="auth-right">
        <button 
          onClick={() => navigate('/')}
          style={{ position: 'absolute', top: '2rem', right: '2rem', zIndex: 50, padding: '8px 16px', borderRadius: '20px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.3s' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
        >
          ✕ Đóng
        </button>
        {/* Background Blobs for Glassmorphism effect */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>

        <div className="auth-form-container">
          
          {/* Animated Welcome Title */}
          <h2 className="welcome-title">
            {"Welcome Smart Warehouse".split("").map((char, index) => (
              <span key={index} style={{ animationDelay: `${index * 0.05}s` }}>
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>

          {/* Tabs */}
          <div className="auth-tabs">
            <button 
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Đăng nhập
            </button>
            <button 
              className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Đăng ký
            </button>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
            
            {/* REGISTER ONLY FIELDS */}
            {activeTab === 'register' && (
              <>
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    placeholder="Nhập họ và tên" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    autoComplete="off"
                  />
                </div>
                
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Nhập số điện thoại" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    autoComplete="off"
                  />
                </div>
              </>
            )}

            {/* COMMON FIELDS: Email */}
            <div className="form-group">
              <label>Email / Tên đăng nhập</label>
              <div className="input-with-icon">
                <span className="icon">@</span>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error' : ''}
                  autoComplete="off"
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* COMMON FIELDS: Password */}
            <div className="form-group">
              <label>Mật khẩu</label>
              <div className="input-with-icon">
                <span className="icon">🔒</span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password" 
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'input-error' : ''}
                  autoComplete="new-password"
                />
                <span 
                  className="icon-right cursor-pointer" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️‍🗨️' : '👁️'}
                </span>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {/* REGISTER ONLY FIELDS: Confirm Password & Role */}
            {activeTab === 'register' && (
              <>
                <div className="form-group">
                  <label>Xác nhận mật khẩu</label>
                  <input 
                    type="password" 
                    name="confirmPassword" 
                    placeholder="Nhập lại mật khẩu"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? 'input-error' : ''}
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>

                <div className="form-group">
                  <label>Vai trò (Role)</label>
                  <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="manager">Thủ kho</option>
                    <option value="staff">Nhân viên kho</option>
                  </select>
                </div>
              </>
            )}

            {/* LOGIN ONLY FIELDS: Remember Me & Forgot Password */}
            {activeTab === 'login' && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" /> Ghi nhớ đăng nhập
                </label>
                <a href="#" className="forgot-password">Quên mật khẩu?</a>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="primary-btn">
              {activeTab === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;

