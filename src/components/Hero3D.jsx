import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero3D() {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-zinc-950 to-zinc-900 border border-zinc-800/60 shadow-2xl">
      <div className="h-[420px] w-full">
        <Spline
          scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Subtle gradient overlay for readability - does not block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/20 to-transparent" />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full p-6 sm:p-10">
          <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white drop-shadow-md">
            Portofolio Investasi Pribadi
          </h1>
          <p className="mt-2 text-sm sm:text-base text-zinc-300 max-w-2xl">
            Tampilan minimalis dengan nuansa gelap dan aksen emas. Pantau nilai portofolio, performa jangka panjang, dan alokasi aset Anda.
          </p>
        </div>
      </div>
    </section>
  );
}
