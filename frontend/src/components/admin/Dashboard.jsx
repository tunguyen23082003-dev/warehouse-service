import React, { useState, useEffect } from 'react';
import { Package, Users, AlertTriangle, Warehouse, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dashboardApi from '../../services/dashboardApi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardApi.getOverview();
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

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
        <h1 className="page-title">Tổng quan Hệ thống</h1>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1 */}
        <div className="admin-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Warehouse size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">Tổng số kho</p>
            <h3 className="text-2xl font-bold text-white">{stats?.totalWarehouses || 0}</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="admin-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Package size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">Tổng sản phẩm</p>
            <h3 className="text-2xl font-bold text-white">{stats?.totalProducts || 0}</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="admin-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">Người dùng</p>
            <h3 className="text-2xl font-bold text-white">{stats?.totalUsers || 0}</h3>
          </div>
        </div>

        {/* Card 4 */}
        <div className="admin-card flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
            <AlertTriangle size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-sm font-medium">Cảnh báo tồn kho</p>
            <h3 className="text-2xl font-bold text-white">{stats?.totalAlerts || 0}</h3>
          </div>
        </div>

      </div>

      {/* Chart Section */}
      <div className="admin-card">
        <h3 className="text-lg font-semibold mb-6 text-white">Thống kê lượng tồn kho theo từng kho</h3>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={stats?.chartData || []}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }}
                itemStyle={{ color: '#06b6d4' }}
              />
              <Bar dataKey="quantity" fill="#06b6d4" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

