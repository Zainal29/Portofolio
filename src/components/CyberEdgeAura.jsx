import { useEffect, useState } from 'react';

/**
 * CyberEdgeAura
 * Ultra-high-performance, hardware-accelerated ambient cyber aura:
 * - Pure CSS / SVG GPU-accelerated vignette & edge illumination (Zero WebGL / Canvas overhead)
 * - Glitch-free, responsive perimeter frame with subtle corner HUD brackets
 * - Dynamic color shifting: Electric Blue/Sky (default) <-> Cyber Emerald/Cyan (Hacker persona)
 * - Reactive pulse wave on typing or contact form interactions
 */
export default function CyberEdgeAura({
  isHacker = false,
  isTyping = false,
  pulseTrigger = 0,
  enabled = true
}) {
  const [pulsing, setPulsing] = useState(false);

  useEffect(() => {
    if (pulseTrigger > 0) {
      const pulseOn = setTimeout(() => setPulsing(true), 0);
      const pulseOff = setTimeout(() => setPulsing(false), 900);
      return () => {
        clearTimeout(pulseOn);
        clearTimeout(pulseOff);
      };
    }
  }, [pulseTrigger]);

  if (!enabled) return null;

  return (
    <div
      className={`cyber-edge-aura-container fixed inset-0 pointer-events-none z-30 overflow-hidden transition-all duration-700 ${
        isHacker ? 'theme-hacker' : 'theme-default'
      } ${isTyping ? 'is-typing' : ''} ${pulsing ? 'is-pulsing' : ''}`}
      aria-hidden="true"
    >
      {/* Precision Solid Cyber Hairline Inner Rim Frame (No Heavy Gradients) */}
      <div className="aura-frame-hairline" />

      {/* 3. Corner HUD Brackets & Metadata */}
      {/* Top Left */}
      <div className="aura-corner aura-corner-tl">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="aura-bracket-svg">
          <path d="M1 21V1H21" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="aura-corner-tag">MZA.DEV // SYS-01</span>
      </div>

      {/* Top Right */}
      <div className="aura-corner aura-corner-tr">
        <span className="aura-corner-tag">PKL // READY</span>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="aura-bracket-svg">
          <path d="M21 21V1H1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Bottom Left */}
      <div className="aura-corner aura-corner-bl">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="aura-bracket-svg">
          <path d="M1 1V21H21" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span className="aura-corner-tag">SMKN 1 BANGSRI</span>
      </div>

      {/* Bottom Right */}
      <div className="aura-corner aura-corner-br">
        <span className="aura-corner-tag">STATUS: 200 OK</span>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="aura-bracket-svg">
          <path d="M21 1V21H1" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}
