import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const categories = [
  { id: 1, name: 'Điện tử', description: 'Các thiết bị điện tử, linh kiện' },
  { id: 2, name: 'Gia dụng', description: 'Đồ dùng gia đình' },
  { id: 3, name: 'Thực phẩm', description: 'Đồ ăn, thức uống đóng gói' },
];

const suppliers = [
  { id: 1, code: 'SUP-01', name: 'Công ty TNHH Samsung', email: 'contact@samsung.vn', phone: '0283123456' },
  { id: 2, code: 'SUP-02', name: 'Nhà phân phối Đại Phát', email: 'daiphat@gmail.com', phone: '0909123456' },
];

const CatalogManagement = () => {
  const [activeTab, setActiveTab] = useState('category');

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Quản lý Danh mục</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Thêm {activeTab === 'category' ? 'Loại hàng' : 'Nhà cung cấp'}
        </button>
      </div>

      <div className="flex gap-4 mb-6 border-b border-white/10 pb-2">
        <button 
          className={`px-4 py-2 font-medium transition ${activeTab === 'category' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}
          onClick={() => setActiveTab('category')}
        >
          Loại hàng (Categories)
        </button>
        <button 
          className={`px-4 py-2 font-medium transition ${activeTab === 'supplier' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-slate-400 hover:text-white'}`}
          onClick={() => setActiveTab('supplier')}
        >
          Nhà cung cấp (Suppliers)
        </button>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          {activeTab === 'category' ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên loại hàng</th>
                  <th>Mô tả</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.id}>
                    <td className="text-slate-400">#{cat.id}</td>
                    <td className="font-medium text-white">{cat.name}</td>
                    <td className="text-slate-300">{cat.description}</td>
                    <td>
                      <div className="flex gap-3">
                        <button className="text-slate-400 hover:text-emerald-400"><Edit2 size={18} /></button>
                        <button className="text-slate-400 hover:text-red-400"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã NCC</th>
                  <th>Tên nhà cung cấp</th>
                  <th>Email</th>
                  <th>Điện thoại</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map(sup => (
                  <tr key={sup.id}>
                    <td><span className="bg-slate-800 text-cyan-400 px-2 py-1 rounded text-xs font-mono">{sup.code}</span></td>
                    <td className="font-medium text-white">{sup.name}</td>
                    <td className="text-slate-300">{sup.email}</td>
                    <td className="text-slate-300">{sup.phone}</td>
                    <td>
                      <div className="flex gap-3">
                        <button className="text-slate-400 hover:text-emerald-400"><Edit2 size={18} /></button>
                        <button className="text-slate-400 hover:text-red-400"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogManagement;

