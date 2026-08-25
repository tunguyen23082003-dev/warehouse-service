import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const initialUsers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'admin@gmail.com', role: 'ADMIN', warehouse: 'Tất cả', status: 'ACTIVE' },
  { id: 2, name: 'Trần Thủ Kho', email: 'warehousekeeper@gmail.com', role: 'WAREHOUSE_KEEPER', warehouse: 'Kho Trung Tâm', status: 'ACTIVE' },
  { id: 3, name: 'Lê Nhân Viên', email: 'warehousestaff@gmail.com', role: 'WAREHOUSE_STAFF', warehouse: 'Kho Miền Nam', status: 'INACTIVE' },
];

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              {initialUsers.map(user => (
                <tr key={user.id}>
                  <td className="font-medium text-white">{user.name}</td>
                  <td className="text-slate-400">{user.email}</td>
                  <td>
                    <span className="text-cyan-400 font-semibold">{user.role}</span>
                  </td>
                  <td className="text-slate-300">{user.warehouse}</td>
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
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Họ và tên</label>
                <input type="text" className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input type="email" className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Vai trò</label>
                <select className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500">
                  <option value="ADMIN">Quản trị viên (ADMIN)</option>
                  <option value="WAREHOUSE_KEEPER">Thủ kho (WAREHOUSE_KEEPER)</option>
                  <option value="WAREHOUSE_STAFF">Nhân viên kho (WAREHOUSE_STAFF)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Gán Kho phụ trách</label>
                <select className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500">
                  <option value="">-- Chọn kho --</option>
                  <option value="1">Kho Trung Tâm</option>
                  <option value="2">Kho Miền Nam</option>
                  <option value="3">Kho Miền Bắc</option>
                </select>
              </div>
              
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

