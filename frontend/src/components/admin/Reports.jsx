import React from 'react';
import { Filter, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'T2', import: 4000, export: 2400 },
  { name: 'T3', import: 3000, export: 1398 },
  { name: 'T4', import: 2000, export: 9800 },
  { name: 'T5', import: 2780, export: 3908 },
  { name: 'T6', import: 1890, export: 4800 },
  { name: 'T7', import: 2390, export: 3800 },
  { name: 'CN', import: 3490, export: 4300 },
];

const Reports = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Báo cáo & Thống kê</h1>
        <button className="btn-primary flex items-center gap-2">
          <Download size={18} /> Xuất báo cáo (Excel)
        </button>
      </div>

      <div className="flex gap-4 mb-6 bg-[#0a1628] p-4 rounded-xl border border-white/5 items-center">
        <Filter size={20} className="text-slate-400" />
        <select className="bg-[#050a14] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500">
          <option value="">Tất cả các kho</option>
          <option value="1">Kho Trung Tâm</option>
          <option value="2">Kho Miền Nam</option>
        </select>
        
        <input type="date" className="bg-[#050a14] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500" />
        <span className="text-slate-400">-</span>
        <input type="date" className="bg-[#050a14] border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-500" />
        
        <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition ml-auto">
          Lọc dữ liệu
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="admin-card lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6 text-white">Lưu lượng Nhập / Xuất (Theo tuần)</h3>
          <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
              <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="import" name="Nhập kho" stroke="#10b981" strokeWidth={3} dot={{r:4}} activeDot={{r: 6}} />
                <Line type="monotone" dataKey="export" name="Xuất kho" stroke="#8b5cf6" strokeWidth={3} dot={{r:4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="admin-card">
          <h3 className="text-lg font-semibold mb-6 text-white">Top SP luân chuyển nhanh</h3>
          <div className="space-y-4">
            {[
              { id: 1, name: 'Tai nghe Bluetooth', vol: 1250 },
              { id: 2, name: 'Màn hình Dell 24"', vol: 890 },
              { id: 3, name: 'Bàn phím cơ', vol: 640 },
              { id: 4, name: 'Chuột không dây', vol: 520 },
              { id: 5, name: 'Cáp sạc Type-C', vol: 410 },
            ].map((prod, index) => (
              <div key={prod.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-white/5">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-amber-500/20 text-amber-500' : index === 1 ? 'bg-slate-300/20 text-slate-300' : index === 2 ? 'bg-orange-700/20 text-orange-500' : 'bg-slate-800 text-slate-500'}`}>
                    {index + 1}
                  </span>
                  <span className="text-slate-300 text-sm font-medium">{prod.name}</span>
                </div>
                <span className="text-cyan-400 font-bold text-sm">{prod.vol}</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Reports;

