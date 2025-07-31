//
// PUBLIC_INTERFACE
// Reusable ocean/beachy icons (SVG/Emoji)

import React from "react";

// PUBLIC_INTERFACE
export function SurfboardIcon({ size = 24, color="#017ea2" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="16" rx="6" ry="13" fill={color} />
      <rect x="15" y="3" width="2" height="26" fill="#fff" fillOpacity="0.4"/>
    </svg>
  );
}

// PUBLIC_INTERFACE
export function WaveIcon({ size = 24, color = "#1de9b6" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M3 22c3-5 7-6 13-6s10 2 13 6" stroke={color} strokeWidth="3" fill="none" />
      <path d="M14 30c4-3 8-2 9 0" stroke={color} strokeWidth="2" fill="none" opacity="0.6"/>
    </svg>
  );
}

// PUBLIC_INTERFACE
export function SurfSunIcon({ size = 20, color="#f1e9d1"}) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="7" fill={color} />
      <g stroke="#017ea2" strokeWidth="1.5">
        <line x1="16" y1="3" x2="16" y2="0"/>
        <line x1="16" y1="32" x2="16" y2="29"/>
        <line x1="3" y1="16" x2="0" y2="16"/>
        <line x1="32" y1="16" x2="29" y2="16"/>
      </g>
    </svg>
  );
}

// Other icons can be added as needed using similar patterns.
