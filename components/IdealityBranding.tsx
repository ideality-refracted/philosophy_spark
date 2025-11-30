import React from 'react';
import { IdealityLogo } from './IdealityLogo';

export const IdealityBranding: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 select-none opacity-80 hover:opacity-100 transition-opacity duration-500 group">
      {/* Logo Icon */}
      <div className="relative w-16 h-16 text-slate-500 group-hover:text-spark-gold/80 transition-colors duration-500">
        <IdealityLogo className="w-full h-full drop-shadow-2xl" />
      </div>

      {/* Brand Text */}
      <div className="text-center space-y-1">
        <h3 className="font-sans text-xl font-normal tracking-wide text-slate-300 group-hover:text-white transition-colors duration-300">
          Ideality Refracted
        </h3>
        <p className="font-serif text-base tracking-[0.3em] text-slate-500 group-hover:text-spark-gold transition-colors duration-300">
          理 想 折 射
        </p>
      </div>
    </div>
  );
};