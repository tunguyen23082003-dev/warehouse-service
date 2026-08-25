import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Edit2, Loader2, Plus } from 'lucide-react';
// import { inventoryApi } from '../../services/apiClient';

const ManagerInventory = () => {
  const [inventory, setInventory] = useState([
    { inventoryId: 1, product: { productName: 'Laptop Dell XPS', sku: 'DELL-XPS' }, quantity: 45, binLocation: 'A1-01', lastUpdated: '2023-10-15T10:30:00Z' },
    { inventoryId: 2, product: { productName: 'MacBook Pro M3', sku: 'MAC-M3' }, quantity: 12, binLocation: 'A1-02', lastUpdated: '2023-10-14T09:15:00Z' }
  ]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [binFilter, setBinFilter] = useState('');

  const filteredInventory = inventory.filter(item => 
    item.product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    item.binLocation.toLowerCase().includes(binFilter.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Quản lý Tồn Kho</h1>
        <button className="btn-primary flex items-center gap-2">
          <Edit2 size={18} /> Điều chỉnh thủ công
        </button>
      </div>

      <div className="admin-card">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050a14] border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="relative md:w-64">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Lọc theo vị trí (Bin)..." 
              value={binFilter}
              onChange={(e) => setBinFilter(e.target.value)}
              className="w-full bg-[#050a14] border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng</th>
                <th>Vị trí (Bin)</th>
                <th>Cập nhật lần cuối</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredInventory.map(item => (
                <tr key={item.inventoryId}>
                  <td><span className="text-cyan-400">{item.product.sku}</span></td>
                  <td className="font-medium text-white">{item.product.productName}</td>
                  <td>
                    <span className="px-2 py-1 rounded bg-slate-800 text-white border border-slate-700">
                      {item.quantity}
                    </span>
                  </td>
                  <td>{item.binLocation}</td>
                  <td className="text-slate-400">{new Date(item.lastUpdated).toLocaleString('vi-VN')}</td>
                  <td className="text-right">
                    <button className="p-2 text-slate-400 hover:text-cyan-400 transition" title="Điều chỉnh">
                      <Edit2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInventory.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">Không tìm thấy dữ liệu tồn kho</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerInventory;

