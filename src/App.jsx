import React from 'react';
import Hero3D from './components/Hero3D';
import SummaryCards from './components/SummaryCards';
import AllTimeChart from './components/AllTimeChart';
import AssetAllocationPie from './components/AssetAllocationPie';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-inter">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b border-zinc-900/80 bg-zinc-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-yellow-400 to-yellow-200 shadow-[0_0_24px_rgba(234,179,8,0.6)]" />
              <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-sm font-semibold tracking-wide text-transparent">
                AURUM
              </span>
            </div>
            <div className="text-xs text-zinc-400">Dark · Minimal · Premium</div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-10">
        <Hero3D />
        <SummaryCards />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AllTimeChart />
          </div>
          <div>
            <AssetAllocationPie />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-zinc-900/80">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Aurum — Portofolio investasi pribadi. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
