import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, MapPin, Loader2 } from 'lucide-react';
import warehouseApi from '../../services/warehouseApi';

const WarehouseManagement = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    warehouseCode: '',
    warehouseName: '',
    location: '',
    capacity: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const response = await warehouseApi.getAll();
      if (response.data.success) {
        setWarehouses(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch warehouses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const response = await warehouseApi.update(editingId, formData);
        if (response.data.success) {
          setWarehouses(warehouses.map(wh => wh.warehouseId === editingId ? response.data.data : wh));
        }
      } else {
        const response = await warehouseApi.create(formData);
        if (response.data.success) {
          setWarehouses([...warehouses, response.data.data]);
        }
      }
      setIsModalOpen(false);
      setFormData({ warehouseCode: '', warehouseName: '', location: '', capacity: '' });
      setEditingId(null);
    } catch (error) {
      console.error("Operation failed", error);
    }
  };

  const handleEdit = (wh) => {
    setFormData({
      warehouseCode: wh.warehouseCode,
      warehouseName: wh.warehouseName,
      location: wh.location,
      capacity: wh.capacity
    });
    setEditingId(wh.warehouseId);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa kho này?")) {
      try {
        await warehouseApi.delete(id);
        setWarehouses(warehouses.filter(wh => wh.warehouseId !== id));
      } catch (error) {
        console.error("Delete failed", error);
      }
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
        <h1 className="page-title">Quản lý Kho bãi</h1>
        <button className="btn-primary flex items-center gap-2" onClick={() => {
          setFormData({ warehouseCode: '', warehouseName: '', location: '', capacity: '' });
          setEditingId(null);
          setIsModalOpen(true);
        }}>
          <Plus size={18} /> Thêm kho mới
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {warehouses.map(wh => {
          // Dummy data for currentLoad as it might not be fully calculated yet
          const currentLoad = wh.capacity ? Math.floor(wh.capacity * 0.4) : 0; 
          const cap = wh.capacity || 1;
          const ratio = currentLoad / cap;

          return (
            <div key={wh.warehouseId} className="admin-card hover:border-cyan-500/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{wh.warehouseName}</h3>
                  <span className="text-xs font-mono bg-slate-800 text-cyan-400 px-2 py-1 rounded">{wh.warehouseCode}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(wh)} className="text-slate-500 hover:text-emerald-400"><Edit2 size={16} /></button>
                  <button onClick={() => handleDelete(wh.warehouseId)} className="text-slate-500 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
                <MapPin size={16} /> {wh.location}
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Sức chứa</span>
                  <span className="font-medium text-white">{currentLoad.toLocaleString()} / {cap.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${ratio > 0.8 ? 'bg-red-500' : 'bg-cyan-500'}`} 
                    style={{ width: `${Math.min(ratio * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0a1628] border border-white/10 rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">{editingId ? 'Sửa Kho' : 'Thêm Kho Mới'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Mã kho (Code)</label>
                <input type="text" name="warehouseCode" value={formData.warehouseCode} onChange={handleChange} className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" placeholder="VD: WH-HCM01" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Tên kho</label>
                <input type="text" name="warehouseName" value={formData.warehouseName} onChange={handleChange} className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Vị trí (Địa chỉ)</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Sức chứa tối đa (Capacity)</label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500" required />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-300 hover:text-white transition">Hủy</button>
                <button type="submit" className="btn-primary">{editingId ? 'Cập nhật' : 'Lưu kho'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseManagement;
