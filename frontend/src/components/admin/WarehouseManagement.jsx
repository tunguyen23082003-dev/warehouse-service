import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, MapPin } from 'lucide-react';

const initialWarehouses = [
  { id: 1, code: 'WH-CEN', name: 'Kho Trung Tâm', location: 'Quận 10, TP.HCM', capacity: 15000, currentLoad: 8500 },
  { id: 2, code: 'WH-SOU', name: 'Kho Miền Nam', location: 'Bình Dương', capacity: 20000, currentLoad: 12000 },
  { id: 3, code: 'WH-NOR', name: 'Kho Miền Bắc', location: 'Bắc Ninh', capacity: 18000, currentLoad: 9000 },
];

const WarehouseManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Quản lý Kho bãi</h1>
        <button className="btn-primary flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> Thêm kho mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {initialWarehouses.map(wh => (
          <div key={wh.id} className="admin-card hover:border-cyan-500/30 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{wh.name}</h3>
                <span className="text-xs font-mono bg-slate-800 text-cyan-400 px-2 py-1 rounded">{wh.code}</span>
              </div>
              <div className="flex gap-2">
                <button className="text-slate-500 hover:text-emerald-400"><Edit2 size={16} /></button>
                <button className="text-slate-500 hover:text-red-400"><Trash2 size={16} /></button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
              <MapPin size={16} /> {wh.location}
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Sức chứa</span>
                <span className="font-medium text-white">{wh.currentLoad.toLocaleString()} / {wh.capacity.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${wh.currentLoad / wh.capacity > 0.8 ? 'bg-red-500' : 'bg-cyan-500'}`} 
                  style={{ width: `${(wh.currentLoad / wh.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0a1628] border border-white/10 rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Thêm Kho Mới</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Mã kho (Code)</label>
                <input type="text" className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" placeholder="VD: WH-HCM01" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tên kho</label>
                <input type="text" className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Vị trí (Địa chỉ)</label>
                <input type="text" className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Sức chứa tối đa (Capacity)</label>
                <input type="number" className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" required />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-300 hover:text-white transition">Hủy</button>
                <button type="submit" className="btn-primary">Lưu kho</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseManagement;

