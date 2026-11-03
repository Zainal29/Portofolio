import { useEffect, useRef } from 'react';

// In case the custom element is not yet registered via index.html, load it via script tag
if (typeof window !== 'undefined' && !customElements.get('ascii-art')) {
  const existingScript = document.querySelector('script[data-ascii-magic]');
  if (!existingScript) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = '/ascii-magic-art/runtime/ascii.js';
    script.setAttribute('data-ascii-magic', 'true');
    document.head.appendChild(script);
  }
}

/**
 * AsciiArt React Wrapper for ascii-magic-art
 * 
 * Supports:
 * - piece: slug name from ascii-magic-art (e.g. "matrix-rain", "spinning-torus", "code-editor")
 * - size: font size in px (default 12)
 * - speed: playback multiplier (default 1)
 * - look: "dots", "ascii", "dense", "numbers", "binary", "letters", "blocks", "squares", "lines", "dither"
 * - mono: boolean, single color rendering using currentColor or custom CSS color
 * - bg: background color string
 * - still: boolean, freeze on first frame
 * - all: boolean, redraw all lines & text in the selected look
 * - contrast: 0 - 100
 * - dotSize: 25 - 120
 * - density: 40 - 250
 * - color: CSS color string
 */
export function AsciiArt({
  piece = 'matrix-rain',
  size = 12,
  speed = 1,
  look,
  chars,
  mono = false,
  bg = 'transparent',
  still = false,
  all = false,
  contrast,
  dotSize,
  density,
  steps,
  color,
  className = '',
  style = {},
  ...rest
}) {
  const elRef = useRef(null);

  // Trigger restart if element is connected and attributes change dynamically
  useEffect(() => {
    const el = elRef.current;
    if (!el || !el.isConnected) return;
    
    if (typeof el.start === 'function') {
      el.start();
    }
  }, [piece, size, speed, look, chars, mono, bg, still, all, contrast, dotSize, density, steps, color]);

  const combinedStyle = {
    display: 'inline-block',
    lineHeight: 1,
    ...(color ? { color, '--ascii-ink': color } : {}),
    ...style,
  };

  return (
    <ascii-art
      ref={elRef}
      piece={piece}
      size={size}
      speed={speed}
      look={look || undefined}
      chars={chars || undefined}
      mono={mono ? '' : undefined}
      bg={bg}
      still={still ? '' : undefined}
      all={all ? '' : undefined}
      contrast={contrast !== undefined ? contrast : undefined}
      dot-size={dotSize !== undefined ? dotSize : undefined}
      density={density !== undefined ? density : undefined}
      steps={steps !== undefined ? steps : undefined}
      class={className}
      style={combinedStyle}
      {...rest}
    />
  );
}

export default AsciiArt;
