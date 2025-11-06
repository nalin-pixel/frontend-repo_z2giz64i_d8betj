import React, { useMemo, useState } from 'react';

function toPolar(cx, cy, r, angle) {
  const a = (angle - 90) * (Math.PI / 180);
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function Arc({ cx, cy, r, start, end, color, onHover, isActive }) {
  const startPt = toPolar(cx, cy, r, start);
  const endPt = toPolar(cx, cy, r, end);
  const largeArc = end - start > 180 ? 1 : 0;
  const d = [
    `M ${startPt.x} ${startPt.y}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${endPt.x} ${endPt.y}`,
  ].join(' ');
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeOpacity={isActive ? 0.95 : 0.75}
      strokeWidth={isActive ? 26 : 22}
      onMouseEnter={onHover}
      onMouseLeave={() => onHover(null)}
      style={{ transition: 'all 200ms ease' }}
    />
  );
}

export default function AssetAllocationPie() {
  const [active, setActive] = useState(null);
  const cx = 150;
  const cy = 150;
  const r = 85;

  const data = useMemo(
    () => [
      { label: 'Saham', value: 45, color: '#facc15' },
      { label: 'Obligasi', value: 25, color: '#a3e635' },
      { label: 'Reksa Dana', value: 15, color: '#38bdf8' },
      { label: 'Kas', value: 10, color: '#f472b6' },
      { label: 'Lainnya', value: 5, color: '#c4b5fd' },
    ],
    []
  );

  const total = data.reduce((a, b) => a + b.value, 0);
  let angle = 0;
  const segments = data.map((d, i) => {
    const start = angle;
    const sweep = (d.value / total) * 360;
    angle += sweep;
    return { ...d, index: i, start, end: start + sweep };
  });

  const activeItem = active !== null ? segments[active] : null;

  return (
    <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/60 p-4 sm:p-5 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-zinc-300">Alokasi Aset</h3>
          <p className="text-xs text-zinc-400">Komposisi portofolio saat ini</p>
        </div>
        <span className="rounded-md bg-yellow-500/20 px-2 py-1 text-xs font-medium text-yellow-300">Interaktif</span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 300 300" className="h-64 w-64">
            {segments.map((s, i) => (
              <Arc
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                start={s.start}
                end={s.end}
                color={s.color}
                onHover={() => setActive(i)}
                isActive={active === i}
              />
            ))}
            {/* center circle for donut effect */}
            <circle cx={cx} cy={cy} r={58} fill="#09090b" stroke="#27272a" strokeWidth="1" />

            {/* center label */}
            <text x={cx} y={cy - 6} textAnchor="middle" className="fill-yellow-300" fontSize="16" fontWeight="600">
              {activeItem ? `${activeItem.value}%` : `${total}%`}
            </text>
            <text x={cx} y={cy + 14} textAnchor="middle" className="fill-zinc-400" fontSize="10">
              {activeItem ? activeItem.label : 'Total'}
            </text>
          </svg>
        </div>

        <div className="flex flex-col justify-center gap-3">
          {segments.map((s, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
                active === i ? 'border-yellow-500/40 bg-yellow-500/5' : 'border-zinc-800/60 bg-zinc-900/40'
              }`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="flex items-center gap-3">
                <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-sm text-zinc-200">{s.label}</span>
              </div>
              <span className="text-sm font-medium text-zinc-100">{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
