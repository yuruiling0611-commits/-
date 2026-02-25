import React, { useMemo, memo } from 'react';

interface ParallaxMountainsProps {
  scrollLeft: number;
}

const ParallaxMountains: React.FC<ParallaxMountainsProps> = memo(({ scrollLeft }) => {
  const layers = useMemo(() => [
    {
      id: 'far',
      speed: 0.1,
      opacity: 0.03,
      blur: 4,
      y: 100,
      scale: 1.5,
      color: '#1a1a1a',
      count: 5
    },
    {
      id: 'mid',
      speed: 0.25,
      opacity: 0.05,
      blur: 2,
      y: 250,
      scale: 1.2,
      color: '#333333',
      count: 8
    },
    {
      id: 'near',
      speed: 0.4,
      opacity: 0.08,
      blur: 0,
      y: 450,
      scale: 1.0,
      color: '#000000',
      count: 12
    }
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {layers.map((layer) => (
        <div 
          key={layer.id}
          className="absolute top-0 left-0 w-[5000px] h-full transition-transform duration-75 ease-out"
          style={{ 
            transform: `translateX(${-scrollLeft * layer.speed}px)`,
            willChange: 'transform'
          }}
        >
          {Array.from({ length: layer.count }).map((_, i) => {
            const x = i * (4000 / layer.count) + (Math.random() * 200);
            const height = 200 + Math.random() * 300;
            const width = 400 + Math.random() * 600;
            
            return (
              <div 
                key={`${layer.id}-${i}`}
                className="absolute"
                style={{
                  left: `${x}px`,
                  top: `${layer.y + (Math.random() * 50)}px`,
                  width: `${width}px`,
                  height: `${height}px`,
                  opacity: layer.opacity,
                  filter: `blur(${layer.blur}px)`,
                  transform: `scale(${layer.scale})`,
                  background: `radial-gradient(ellipse at center bottom, ${layer.color} 0%, transparent 70%)`,
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)',
                  borderRadius: '50% 50% 0 0'
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
});

export default ParallaxMountains;
