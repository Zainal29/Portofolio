import { useMemo, useEffect, useState } from 'react';
import { EdgeAura } from 'edge-aura/react';

/**
 * CyberEdgeAura
 * Wrapper around takuyajodai/edge-aura optimized for Muhammad Zainal Arief's portfolio:
 * - Slim, subtle ambient glow (toned down band and alpha so it never distracts or lags)
 * - Dynamic theme switching: 'ocean' (cyan/blue) for default, 'aurora' (emerald/cyan) for Hacker Persona
 * - Battery & GPU friendly: throttled quiescent rAF loop (8-10 fps when idle)
 */
export default function CyberEdgeAura({
  isHacker = false,
  isTyping = false,
  pulseTrigger = 0,
  enabled = true
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Stabilize options to avoid unnecessary engine reconfigurations
  const auraOptions = useMemo(() => {
    return {
      geometry: {
        inset: 2,
        cornerRadius: isMobile ? 8 : 14,
        band: isMobile ? 16 : 24, // Slim, elegant neon rim (previously 42/68)
        coreSigmaBase: isMobile ? 0.75 : 0.95,
        coreSigmaVar: 0.25,
        innerSoftBase: 0.7,
        innerSoftVar: 0.25,
        innerSigmaMax: isMobile ? 6 : 9,
        cornerFill: false
      },
      palette: {
        background: 'dark',
        ringAlpha: isHacker ? 0.45 : 0.30, // Subtle luminescence (previously 0.78-0.95)
        pastel: isHacker ? 0.25 : 0.36,
        darkAlphaGamma: 0.7,
        darkChroma: 1.1,
        coreWhiten: 0.12,
        normalize: true,
        interpolation: 'srgb',
        blendMode: 'source-over'
      },
      motion: {
        rotateIdleS: isHacker ? 10 : 16,
        rotateTypingS: 4.5,
        decay: 0.8,
        hueDriftDeg: 6,
        hueDriftPeriodS: 16
      },
      input: {
        tapEnergy: 0.35,
        keyEnergy: 0.4,
        savedPulseEnergy: 0.35
      }
    };
  }, [isMobile, isHacker]);

  if (!enabled) return null;

  return (
    <div
      className="cyber-edge-aura-wrapper pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden="true"
    >
      <EdgeAura
        palette={isHacker ? 'aurora' : 'ocean'}
        state={isTyping ? 'typing' : 'idle'}
        savedAt={pulseTrigger}
        options={auraOptions}
        quiescentFps={isMobile ? 8 : 10} // 8-10 fps idle to eliminate GPU lag
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 40
        }}
      />
    </div>
  );
}
