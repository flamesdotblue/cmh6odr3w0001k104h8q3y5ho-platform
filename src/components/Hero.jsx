import Spline from '@splinetool/react-spline';
import { Wallet } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full" style={{ height: '44vh', minHeight: 260 }}>
      <div className="absolute inset-0">
        <Spline style={{ width: '100%', height: '100%' }} scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black" />

      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-6">
        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-3 py-2 border border-white/10">
          <Wallet className="w-5 h-5 text-white/90" />
          <span className="text-sm text-white/80">Money Tracker</span>
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Track, Save, Grow</h1>
        <p className="mt-1 text-sm text-white/70">Your finances, streamlined for mobile.</p>
      </div>
    </section>
  );
}
