import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import userApi from '../../services/userApi';
import warehouseApi from '../../services/warehouseApi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'WAREHOUSE_STAFF',
    warehouseId: '',
    status: 'ACTIVE'
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, whRes] = await Promise.all([
        userApi.getAll(),
        warehouseApi.getAll()
      ]);
      if (usersRes.data.success) setUsers(usersRes.data.data);
      if (whRes.data.success) setWarehouses(whRes.data.data);
    } catch (error) {
      console.error("Failed to load user management data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (payload.role === 'ADMIN') {
        payload.warehouseId = null; 
      } else if (!payload.warehouseId) {
        alert("Vui lòng chọn kho cho nhân viên.");
        return;
      }
      
      const response = await userApi.create(payload);
      if (response.data.success) {
        setUsers([...users, response.data.data]);
        setIsModalOpen(false);
        setFormData({ name: '', email: '', password: '', role: 'WAREHOUSE_STAFF', warehouseId: '', status: 'ACTIVE' });
      }
    } catch (error) {
      console.error("Failed to create user", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="animate-spin text-cyan-500" size={48} />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Quản lý Người Dùng</h1>
        <button className="btn-primary flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Thêm người dùng mới
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Vai trò (Role)</th>
                <th>Kho phụ trách</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.userId}>
                  <td className="font-medium text-white">{user.fullName || user.username}</td>
                  <td className="text-slate-400">{user.email}</td>
                  <td>
                    <span className="text-cyan-400 font-semibold">{user.role?.roleName || 'N/A'}</span>
                  </td>
                  <td className="text-slate-300">{user.warehouse?.warehouseName || 'Tất cả'}</td>
                  <td>
                    <span className={`badge ${user.status === 'ACTIVE' ? 'badge-active' : 'badge-inactive'}`}>
                      {user.status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa'}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-3">
                      <button className="text-slate-400 hover:text-emerald-400 transition" title="Sửa"><Edit2 size={18} /></button>
                      <button className="text-slate-400 hover:text-red-400 transition" title="Xóa"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0a1628] border border-white/10 rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Thêm người dùng</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Họ và tên / Username</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" required autoComplete="new-password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" required autoComplete="new-password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Mật khẩu</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" required autoComplete="new-password" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Vai trò</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500">
                  <option value="ADMIN">Quản trị viên (ADMIN)</option>
                  <option value="THU_KHO">Thủ kho (THU_KHO)</option>
                  <option value="NHAN_VIEN_KHO">Nhân viên kho (NHAN_VIEN_KHO)</option>
                </select>
              </div>
              
              {formData.role !== 'ADMIN' && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Gán Kho phụ trách</label>
                  <select name="warehouseId" value={formData.warehouseId} onChange={handleChange} className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500">
                    <option value="">-- Chọn kho --</option>
                    {warehouses.map(wh => (
                      <option key={wh.warehouseId} value={wh.warehouseId}>{wh.warehouseName}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-300 hover:text-white transition">Hủy</button>
                <button type="submit" className="btn-primary">Lưu người dùng</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
