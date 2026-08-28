import React, { useState } from 'react';
import { Box, Search } from 'lucide-react';

const StaffInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [inventory] = useState([
    { inventoryId: 1, product: { productName: 'Laptop Dell XPS', sku: 'DELL-XPS' }, quantity: 15, binLocation: 'A1-01', lastUpdated: '2023-10-18T10:00:00Z' },
    { inventoryId: 2, product: { productName: 'Bàn phím cơ Keychron', sku: 'KEY-K8' }, quantity: 45, binLocation: 'B2-12', lastUpdated: '2023-10-17T08:30:00Z' },
    { inventoryId: 3, product: { productName: 'Chuột Logitech G Pro', sku: 'LOGI-GPRO' }, quantity: 0, binLocation: 'C3-05', lastUpdated: '2023-10-16T14:15:00Z' },
    { inventoryId: 4, product: { productName: 'Màn hình LG 27inch', sku: 'LG-27UL' }, quantity: 8, binLocation: 'A2-04', lastUpdated: '2023-10-18T09:20:00Z' }
  ]);

  const filtered = inventory.filter(item => 
    item.product.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.binLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tồn Kho (Chi Nhánh)</h1>
      </div>

      <div className="admin-card">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Tìm theo tên, SKU, Vị trí..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050a14] border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-cyan-500"
            />
            <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
          </div>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã SKU</th>
                <th>Tên sản phẩm</th>
                <th>Số lượng tồn</th>
                <th>Vị trí (Bin)</th>
                <th>Cập nhật lần cuối</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.inventoryId}>
                  <td className="font-medium text-cyan-500">{item.product.sku}</td>
                  <td className="text-white font-medium">{item.product.productName}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${item.quantity === 0 ? 'bg-rose-500/10 text-rose-500' : item.quantity < 10 ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="text-slate-300 font-mono">{item.binLocation}</td>
                  <td className="text-slate-400">{new Date(item.lastUpdated).toLocaleString('vi-VN')}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Box size={48} className="text-slate-600 mb-3 opacity-50" />
                      <p>Không tìm thấy sản phẩm nào</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StaffInventory;

