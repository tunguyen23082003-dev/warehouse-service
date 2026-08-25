import React, { useState, useEffect } from 'react';
import { Box, FileText, AlertTriangle, TrendingUp, Loader2 } from 'lucide-react';
// import { managerApi } from '../../services/apiClient'; // We'll assume these exist soon

const ManagerDashboard = () => {
  const [stats, setStats] = useState({
    totalInventory: 15420,
    pendingOrders: 5,
    unresolvedAlerts: 2
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock fetching data for now
    // setLoading(true);
    // setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin text-cyan-500" size={32} /></div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Tổng quan Kho</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="admin-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Box size={24} />
          </div>
          <div>
            <div className="text-slate-400 text-sm">Tổng Tồn Kho (sản phẩm)</div>
            <div className="text-2xl font-bold text-white mt-1">{stats.totalInventory.toLocaleString()}</div>
          </div>
        </div>

        <div className="admin-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
            <FileText size={24} />
          </div>
          <div>
            <div className="text-slate-400 text-sm">Phiếu Chờ Duyệt</div>
            <div className="text-2xl font-bold text-white mt-1">{stats.pendingOrders}</div>
          </div>
        </div>

        <div className="admin-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="text-slate-400 text-sm">Cảnh Báo Chưa Xử Lý</div>
            <div className="text-2xl font-bold text-white mt-1">{stats.unresolvedAlerts}</div>
          </div>
        </div>
      </div>

      {/* Mini Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Phiếu chờ duyệt mới nhất</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-[#050a14] rounded-lg border border-white/5">
              <div className="flex gap-3 items-center">
                <FileText className="text-slate-400" size={20} />
                <div>
                  <div className="font-medium text-white">ORD-20231015-01</div>
                  <div className="text-xs text-slate-400 mt-1">Xuất kho • 10 sản phẩm</div>
                </div>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                PENDING
              </span>
            </div>
            {/* Thêm các item khác nếu cần */}
          </div>
        </div>

        <div className="admin-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Cảnh báo tồn kho</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-[#050a14] rounded-lg border border-white/5">
              <div className="flex gap-3 items-center">
                <AlertTriangle className="text-rose-400" size={20} />
                <div>
                  <div className="font-medium text-white">Laptop Dell XPS - Dưới mức tối thiểu</div>
                  <div className="text-xs text-slate-400 mt-1">Hiện tại: 2 • Tối thiểu: 5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;

