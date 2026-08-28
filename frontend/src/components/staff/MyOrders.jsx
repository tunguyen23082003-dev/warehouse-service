import React, { useState } from 'react';
import { FileText, Play, CheckCircle2, Clock, XCircle } from 'lucide-react';

const MyOrders = () => {
  const [orders, setOrders] = useState([
    { orderId: 'ORD-1001', type: 'IMPORT', status: 'PENDING', itemsCount: 3, createdAt: '2023-10-18T09:00:00Z', notes: 'Nhập hàng đợt 1' },
    { orderId: 'ORD-1002', type: 'EXPORT', status: 'APPROVED', itemsCount: 1, createdAt: '2023-10-17T14:30:00Z', notes: 'Xuất cho chi nhánh Q1' },
    { orderId: 'ORD-1003', type: 'IMPORT', status: 'REJECTED', itemsCount: 5, createdAt: '2023-10-16T10:15:00Z', notes: 'Nhập dư' },
    { orderId: 'ORD-1004', type: 'EXPORT', status: 'FULFILLED', itemsCount: 2, createdAt: '2023-10-15T16:45:00Z', notes: 'Đã giao xong' }
  ]);

  const handleExecute = (orderId) => {
    alert(`Bắt đầu thực hiện phiếu ${orderId}!`);
    setOrders(orders.map(o => o.orderId === orderId ? { ...o, status: 'FULFILLED' } : o));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20"><Clock size={14} /> CHỜ DUYỆT</span>;
      case 'APPROVED':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"><CheckCircle2 size={14} /> ĐÃ DUYỆT</span>;
      case 'REJECTED':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20"><XCircle size={14} /> TỪ CHỐI</span>;
      case 'FULFILLED':
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 size={14} /> HOÀN THÀNH</span>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Phiếu Yêu Cầu Của Tôi</h1>
      </div>

      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã phiếu</th>
                <th>Loại</th>
                <th>Ghi chú</th>
                <th>Số lượng loại SP</th>
                <th>Thời gian tạo</th>
                <th>Trạng thái</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.orderId}>
                  <td className="font-medium text-cyan-500">{order.orderId}</td>
                  <td>
                    <span className={`px-2 py-1 text-xs font-bold rounded-md ${order.type === 'IMPORT' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-orange-500/20 text-orange-400'}`}>
                      {order.type === 'IMPORT' ? 'NHẬP KHO' : 'XUẤT KHO'}
                    </span>
                  </td>
                  <td className="text-slate-300">{order.notes}</td>
                  <td className="text-slate-400">{order.itemsCount} sản phẩm</td>
                  <td className="text-slate-400">{new Date(order.createdAt).toLocaleString('vi-VN')}</td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td className="text-right">
                    {order.status === 'APPROVED' && (
                      <button 
                        onClick={() => handleExecute(order.orderId)}
                        className="flex items-center justify-end gap-2 text-emerald-400 hover:text-emerald-300 transition ml-auto border border-emerald-500/30 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20"
                        title="Thực hiện phiếu"
                      >
                        <Play size={16} /> <span>Thực hiện</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

