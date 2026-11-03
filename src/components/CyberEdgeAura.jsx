import { useMemo, useEffect, useState } from 'react';
import { EdgeAura } from 'edge-aura/react';

/**
 * CyberEdgeAura
 * Wrapper around takuyajodai/edge-aura optimized for Muhammad Zainal Arief's portfolio:
 * - Dynamic theme switching: 'ocean' (cyan/blue) for default, 'aurora' (emerald/cyan) for Hacker Persona
 * - Ambient reactivity: reacts to typing in terminal / contact form
 * - Energy pulse on key actions (copy email, send message, download CV)
 * - Battery-friendly: throttles quiescent rAF loop and tunes geometry on mobile
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
        cornerRadius: isMobile ? 12 : 20,
        band: isMobile ? 42 : 68,
        coreSigmaBase: isMobile ? 1.4 : 1.8,
        coreSigmaVar: 0.5,
        innerSoftBase: 1.3,
        innerSoftVar: 0.4,
        innerSigmaMax: isMobile ? 14 : 18,
        cornerFill: false
      },
      palette: {
        background: 'dark',
        ringAlpha: isHacker ? 0.95 : 0.78,
        pastel: isHacker ? 0.18 : 0.28,
        darkAlphaGamma: 0.55,
        darkChroma: 1.35,
        coreWhiten: 0.22,
        normalize: true,
        interpolation: 'srgb',
        blendMode: 'source-over'
      },
      motion: {
        rotateIdleS: isHacker ? 7 : 11,
        rotateTypingS: 3.2,
        decay: 0.95,
        hueDriftDeg: 12,
        hueDriftPeriodS: 10
      },
      input: {
        tapEnergy: 0.7,
        keyEnergy: 0.8,
        savedPulseEnergy: 0.65
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
        quiescentFps={isMobile ? 15 : 20}
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

