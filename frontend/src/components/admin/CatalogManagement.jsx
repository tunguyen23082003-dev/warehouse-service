import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import categoryApi from '../../services/categoryApi';
import supplierApi from '../../services/supplierApi';

const CatalogManagement = () => {
  const [activeTab, setActiveTab] = useState('category');
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'category') {
          const res = await categoryApi.getAll();
          if (res.data.success) setCategories(res.data.data);
        } else {
          const res = await supplierApi.getAll();
          if (res.data.success) setSuppliers(res.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch catalog data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

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
          {loading ? (
            <div className="flex justify-center p-8"><Loader2 className="animate-spin text-cyan-500" size={32} /></div>
          ) : activeTab === 'category' ? (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Mã loại</th>
                  <th>Tên loại hàng</th>
                  <th>Mô tả</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat.categoryId}>
                    <td className="text-slate-400">#{cat.categoryId}</td>
                    <td className="font-mono text-cyan-400">{cat.categoryCode}</td>
                    <td className="font-medium text-white">{cat.categoryName}</td>
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
                  <tr key={sup.supplierId}>
                    <td><span className="bg-slate-800 text-cyan-400 px-2 py-1 rounded text-xs font-mono">{sup.supplierCode}</span></td>
                    <td className="font-medium text-white">{sup.supplierName}</td>
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

