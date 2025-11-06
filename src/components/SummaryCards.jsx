import React from 'react';
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';

const StatCard = ({ label, value, sublabel, trend = 'up' }) => {
  const isUp = trend === 'up';
  return (
    <div className="group relative rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-4 sm:p-5 shadow-lg ring-1 ring-black/0 transition-colors hover:border-zinc-700">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-500/0 via-yellow-500/0 to-yellow-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-10" />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-400">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
          {sublabel && <p className="mt-1 text-xs text-zinc-400">{sublabel}</p>}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
          isUp ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
        }`}>
          {isUp ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
        </div>
      </div>
    </div>
  );
};

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Nilai Portofolio" value="Rp 1.245.500.000" sublabel="+Rp 12.450 hari ini" trend="up" />
      <StatCard label="Imbal Hasil Harian" value="+1,21%" sublabel="vs kemarin" trend="up" />
      <StatCard label="Imbal Hasil Tahunan" value="+12,8%" sublabel="YTD" trend="up" />
      <div className="relative rounded-xl border border-zinc-800/60 bg-gradient-to-br from-yellow-500/10 to-yellow-700/10 p-4 sm:p-5 shadow-lg">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-yellow-400">Premium</p>
            <p className="mt-1 text-2xl font-semibold text-yellow-300">Status Emas</p>
            <p className="mt-1 text-xs text-zinc-300">Akses analitik lanjutan & notifikasi pintar</p>
          </div>
          <div className="rounded-lg bg-yellow-500/20 p-2 text-yellow-300">
            <Sparkles size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
