import React from 'react';

export default function TextPaneParchment({ text, title, color, className }: { text: string, title?: string, color?: string, className?: string }) {
  const backgroundStyles: React.CSSProperties = {
    backgroundColor: '#fffef0',
    boxShadow: '2px 3px 20px black, 0 0 125px #8f5922 inset',
    backgroundImage: 'linear-gradient(#fff9df, #fff3bf)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    gridArea: '1 / 1',
  };

  const edgeOverlayStyles: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    backgroundImage: "url('/textures/parchment-edge-noise.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    mixBlendMode: 'multiply',
    opacity: 0.18, // tweak to taste
  };

  const contentStyles: React.CSSProperties = {
    gridArea: '1 / 1',
    position: 'relative',
    padding: '2em',
    color: color || '#7F3300',
  };

  return (
    <main>
      <div className="relative mx-auto overflow-hidden">
        {/* Base stretched parchment */}
        <div style={{ ...backgroundStyles, position: 'absolute', inset: 0 }} />
        {/* Edge-only noise overlay (non-repeating, no seams) */}
        <div style={edgeOverlayStyles} aria-hidden />
        {/* Content */}
        <div style={{ ...contentStyles, position: 'relative' }} className="space-y-[0.75em]">
          {title && <p className="text-[2em] font-['Pirata_One'] text-center text-gray-600">{title}</p>}
          <p className="text-[1em] text-justify">{text}</p>
        </div>
      </div>
    </main>
  );
}
