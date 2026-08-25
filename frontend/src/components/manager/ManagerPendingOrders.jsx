import React, { useState } from 'react';
import { Search, Eye, Check, X as CloseIcon, FileText } from 'lucide-react';

const ManagerPendingOrders = () => {
  const [orders, setOrders] = useState([
    { orderId: 1, orderCode: 'ORD-20231015-01', type: 'EXPORT', status: 'PENDING', createdBy: 'Nhân viên 1', createdAt: '2023-10-15T10:00:00Z', notes: 'Xuất hàng cho đại lý A' },
    { orderId: 2, orderCode: 'ORD-20231015-02', type: 'IMPORT', status: 'PENDING', createdBy: 'Nhân viên 2', createdAt: '2023-10-15T11:30:00Z', notes: 'Nhập hàng từ nhà cung cấp B' }
  ]);
  
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Phiếu Chờ Duyệt</h1>
      </div>

      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Loại</th>
                <th>Người tạo</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId}>
                  <td className="font-medium text-white">{order.orderCode}</td>
                  <td>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${order.type === 'IMPORT' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                      {order.type === 'IMPORT' ? 'NHẬP KHO' : 'XUẤT KHO'}
                    </span>
                  </td>
                  <td>{order.createdBy}</td>
                  <td className="text-slate-400">{new Date(order.createdAt).toLocaleString('vi-VN')}</td>
                  <td>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      CHỜ DUYỆT
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setSelectedOrder(order)} className="p-2 text-cyan-400 hover:bg-cyan-400/10 rounded transition" title="Xem chi tiết">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-emerald-400 hover:bg-emerald-400/10 rounded transition" title="Duyệt phiếu">
                        <Check size={18} />
                      </button>
                      <button className="p-2 text-rose-400 hover:bg-rose-400/10 rounded transition" title="Từ chối">
                        <CloseIcon size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-500">Không có phiếu nào đang chờ duyệt</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a1628] border border-white/10 rounded-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="text-cyan-500" /> Chi tiết phiếu {selectedOrder.orderCode}
              </h3>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-white">
                <CloseIcon size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Loại phiếu</div>
                  <div className="text-white font-medium">{selectedOrder.type === 'IMPORT' ? 'Nhập Kho' : 'Xuất Kho'}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Người tạo</div>
                  <div className="text-white font-medium">{selectedOrder.createdBy}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-slate-400 mb-1">Ghi chú</div>
                  <div className="text-white bg-[#050a14] p-3 rounded-lg border border-slate-700">{selectedOrder.notes || 'Không có ghi chú'}</div>
                </div>
              </div>

              <h4 className="font-bold text-white mb-3">Danh sách sản phẩm</h4>
              <table className="admin-table text-sm">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>SKU</th>
                    <th className="text-right">Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Laptop Dell XPS</td>
                    <td>DELL-XPS</td>
                    <td className="text-right">10</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-[#050a14]">
              <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 text-slate-300 hover:text-white transition">Đóng</button>
              <button className="px-4 py-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition font-medium">Từ chối</button>
              <button className="px-4 py-2 bg-emerald-500 text-white hover:bg-emerald-600 rounded-lg transition font-medium shadow-[0_0_15px_rgba(16,185,129,0.3)]">Duyệt Phiếu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerPendingOrders;

