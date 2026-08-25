import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

const ManagerAlerts = () => {
  const [alerts, setAlerts] = useState([
    { alertId: 1, alertType: 'LOW_STOCK', product: { productName: 'Laptop Dell XPS', sku: 'DELL-XPS' }, message: 'Số lượng tồn kho (2) dưới mức tối thiểu (5)', status: 'UNRESOLVED', createdAt: '2023-10-15T08:00:00Z' },
    { alertId: 2, alertType: 'OUT_OF_STOCK', product: { productName: 'Bàn phím cơ Keychron', sku: 'KEY-K8' }, message: 'Sản phẩm đã hết hàng', status: 'UNRESOLVED', createdAt: '2023-10-14T15:20:00Z' }
  ]);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Cảnh Báo Tồn Kho</h1>
      </div>

      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Loại cảnh báo</th>
                <th>Sản phẩm (SKU)</th>
                <th>Nội dung</th>
                <th>Thời gian</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map(alert => (
                <tr key={alert.alertId}>
                  <td>
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={16} className={alert.alertType === 'OUT_OF_STOCK' ? 'text-rose-500' : 'text-amber-500'} />
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${alert.alertType === 'OUT_OF_STOCK' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                        {alert.alertType === 'OUT_OF_STOCK' ? 'HẾT HÀNG' : 'SẮP HẾT'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="font-medium text-white">{alert.product.productName}</div>
                    <div className="text-sm text-cyan-500">{alert.product.sku}</div>
                  </td>
                  <td className="text-slate-300">{alert.message}</td>
                  <td className="text-slate-400">{new Date(alert.createdAt).toLocaleString('vi-VN')}</td>
                  <td className="text-right">
                    <button className="flex items-center justify-end gap-2 text-emerald-400 hover:text-emerald-300 transition ml-auto border border-emerald-500/30 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20" title="Đánh dấu đã xử lý">
                      <CheckCircle2 size={16} /> <span>Đã xử lý</span>
                    </button>
                  </td>
                </tr>
              ))}
              {alerts.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <CheckCircle2 size={48} className="text-emerald-500 mb-3 opacity-50" />
                      <p>Không có cảnh báo nào chưa xử lý</p>
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

export default ManagerAlerts;

