import React from 'react';

export const IdealityLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 115" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      {/* Outer Hexagon */}
      <path d="M50 2L93.3 27V77L50 102L6.7 77V27L50 2Z" />
      
      {/* Internal Structure mimicking refraction */}
      <path d="M50 2V27" className="opacity-50"/>
      <path d="M93.3 27L71.65 39.5" className="opacity-50"/>
      <path d="M93.3 77L71.65 64.5" className="opacity-50"/>
      <path d="M50 102V77" className="opacity-50"/>
      <path d="M6.7 77L28.35 64.5" className="opacity-50"/>
      <path d="M6.7 27L28.35 39.5" className="opacity-50"/>
      
      {/* Central Prism Core */}
      <path d="M50 27L71.65 39.5V64.5L50 77L28.35 64.5V39.5L50 27Z" fill="currentColor" fillOpacity="0.1" strokeWidth="1"/>
      
      {/* Center Vertical Split */}
      <path d="M50 27V77" className="opacity-30"/>
    </g>

    {/* PHIL Text on Bottom Left Face */}
    <text 
      x="22" 
      y="80" 
      fontSize="11" 
      fontFamily="sans-serif" 
      fill="currentColor" 
      transform="rotate(-30, 25, 80)"
      fontWeight="bold"
      letterSpacing="0.05em"
      className="opacity-90 select-none"
    >
      PHIL
    </text>
  </svg>
);