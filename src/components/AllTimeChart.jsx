import React, { useMemo, useRef, useState } from 'react';

function generatePath(points) {
  if (!points.length) return '';
  const [first, ...rest] = points;
  let d = `M ${first.x},${first.y}`;
  for (const p of rest) {
    d += ` L ${p.x},${p.y}`;
  }
  return d;
}

export default function AllTimeChart() {
  const containerRef = useRef(null);
  const [hover, setHover] = useState(null);

  // Fake data for demo purposes
  const values = useMemo(
    () => [100, 110, 120, 130, 140, 160, 150, 170, 180, 210, 200, 230, 260, 240, 280, 300, 320, 340, 360, 380, 420, 450, 470, 500],
    []
  );
  const labels = useMemo(() => Array.from({ length: values.length }, (_, i) => `M${i + 1}`), [values.length]);

  const width = 900;
  const height = 260;
  const pad = 24;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const xScale = (i) => pad + (i / (values.length - 1)) * (width - pad * 2);
  const yScale = (v) => pad + (1 - (v - min) / (max - min || 1)) * (height - pad * 2);

  const points = values.map((v, i) => ({ x: xScale(i), y: yScale(v) }));
  const path = generatePath(points);

  const areaPath = `${path} L ${xScale(values.length - 1)},${height - pad} L ${xScale(0)},${height - pad} Z`;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // find nearest index
    let nearest = 0;
    let best = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - x);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setHover(nearest);
  };

  const handleLeave = () => setHover(null);

  return (
    <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-4 sm:p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-zinc-300">Grafik All-Time</h3>
          <p className="text-xs text-zinc-400">Performa portofolio dari awal</p>
        </div>
        <span className="rounded-md bg-yellow-500/20 px-2 py-1 text-xs font-medium text-yellow-300">Bersih & Halus</span>
      </div>

      <div ref={containerRef} className="relative">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-64 w-full sm:h-72"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleLeave}
        >
          <defs>
            <linearGradient id="areaGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(234,179,8,0.35)" />
              <stop offset="100%" stopColor="rgba(234,179,8,0.05)" />
            </linearGradient>
            <linearGradient id="strokeGold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>

          {/* grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => {
            const y = pad + t * (height - pad * 2);
            return (
              <line key={t} x1={pad} x2={width - pad} y1={y} y2={y} stroke="rgba(63,63,70,0.35)" strokeWidth="1" />
            );
          })}

          {/* area */}
          <path d={areaPath} fill="url(#areaGold)" />
          {/* line */}
          <path d={path} fill="none" stroke="url(#strokeGold)" strokeWidth="2" />

          {/* hover marker */}
          {hover !== null && (
            <g>
              <line
                x1={points[hover].x}
                x2={points[hover].x}
                y1={pad}
                y2={height - pad}
                stroke="rgba(250,204,21,0.25)"
                strokeWidth="1"
              />
              <circle cx={points[hover].x} cy={points[hover].y} r="4" fill="#facc15" stroke="#111827" strokeWidth="2" />
            </g>
          )}
        </svg>

        {hover !== null && (
          <div
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-3 rounded-md border border-zinc-700 bg-zinc-900/90 px-2 py-1 text-xs text-zinc-200 shadow"
            style={{ left: `${(points[hover].x / width) * 100}%`, top: 0 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-yellow-300 font-medium">{labels[hover]}</span>
              <span>Rp {values[hover].toLocaleString('id-ID')}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
