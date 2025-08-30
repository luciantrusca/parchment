import React from 'react';

export default function TextPaneParchment({ text, title, color }: { text: string, title?: string, color?: string }) {
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
    padding: '4em',
    color: color || '#7F3300',
  };

  return (
    <main>
      <div className="relative w-3/4 my-[2em] mx-auto overflow-hidden">
        {/* Base stretched parchment */}
        <div style={{ ...backgroundStyles, position: 'absolute', inset: 0 }} />
        {/* Edge-only noise overlay (non-repeating, no seams) */}
        <div style={edgeOverlayStyles} aria-hidden />
        {/* Content */}
        <div style={{ ...contentStyles, position: 'relative' }}>
          <p className="text-[3em] font-['Pirata_One'] text-center leading-[3em] text-gray-600">{title}</p>
          <p className="w-1/5 mx-auto"></p>
          <p className="text-[2.25em] mt-[.75em] text-justify">{text}</p>
          <p className="w-[calc((100vw_*_5)_/_42)] mt-16 ml-auto"><img className="max-h-5" src="https://i.postimg.cc/4NBYNqCR/22.png"/></p>
          <div className="text-right text-black text-[250%]">Imperator Caesar Flavius Constantinus<br />Pius Felix Invictus Augustus</div>
        </div>
      </div>
    </main>
  );
}
