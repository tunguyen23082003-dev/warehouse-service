import React, { useState } from 'react';
import { Plus, Trash2, Save, FileText } from 'lucide-react';

const CreateOrder = () => {
  const [orderType, setOrderType] = useState('IMPORT');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState([
    { id: 1, productSku: '', quantity: 1 }
  ]);

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), productSku: '', quantity: 1 }]);
  };

  const handleRemoveItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleChangeItem = (id, field, value) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting order:", { orderType, notes, items });
    alert("Đã gửi yêu cầu tạo phiếu thành công! Đang chờ duyệt.");
    // Reset form
    setItems([{ id: Date.now(), productSku: '', quantity: 1 }]);
    setNotes('');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tạo Phiếu Nhập/Xuất Kho</h1>
      </div>

      <div className="admin-card max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Loại phiếu</label>
              <select 
                value={orderType}
                onChange={(e) => setOrderType(e.target.value)}
                className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="IMPORT">Nhập Kho (IMPORT)</option>
                <option value="EXPORT">Xuất Kho (EXPORT)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Ghi chú</label>
              <input 
                type="text" 
                placeholder="Nhập lý do hoặc ghi chú..." 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#050a14] border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="text-cyan-500" size={20} />
                Danh sách sản phẩm
              </h3>
              <button 
                type="button" 
                onClick={handleAddItem}
                className="btn-primary flex items-center gap-2 px-3 py-1.5 text-sm"
              >
                <Plus size={16} /> Thêm dòng
              </button>
            </div>

            <div className="bg-[#050a14] border border-slate-700 rounded-lg overflow-hidden">
              <table className="admin-table w-full">
                <thead className="bg-[#0a1628]">
                  <tr>
                    <th className="w-16 text-center">STT</th>
                    <th>Mã sản phẩm (SKU)</th>
                    <th className="w-48">Số lượng</th>
                    <th className="w-16 text-center">Xóa</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={item.id} className="border-t border-slate-700/50">
                      <td className="text-center text-slate-500">{index + 1}</td>
                      <td>
                        <input 
                          type="text" 
                          placeholder="Nhập SKU..." 
                          value={item.productSku}
                          onChange={(e) => handleChangeItem(item.id, 'productSku', e.target.value)}
                          className="w-full bg-transparent border-b border-transparent focus:border-cyan-500 focus:outline-none px-2 py-1 text-white placeholder-slate-600 transition"
                          required
                        />
                      </td>
                      <td>
                        <input 
                          type="number" 
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleChangeItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                          className="w-full bg-transparent border-b border-transparent focus:border-cyan-500 focus:outline-none px-2 py-1 text-white transition"
                          required
                        />
                      </td>
                      <td className="text-center">
                        <button 
                          type="button" 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-slate-500 hover:text-rose-500 transition p-1"
                          disabled={items.length === 1}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-700/50">
            <button type="submit" className="btn-primary flex items-center gap-2 px-6 py-2.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Save size={18} /> Tạo phiếu yêu cầu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;

