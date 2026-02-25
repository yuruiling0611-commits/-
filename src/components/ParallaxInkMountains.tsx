import React, { useMemo } from 'react';

interface ParallaxInkMountainsProps {
  scrollLeft: number;
}

const ParallaxInkMountains: React.FC<ParallaxInkMountainsProps> = ({ scrollLeft }) => {
  // 预定义三层山影，每层有不同的位移速度
  const layers = useMemo(() => [
    {
      id: 'far',
      speed: 0.1,
      opacity: 0.05,
      blur: 4,
      y: '20%',
      height: '40vh',
      count: 4,
      color: '#1a1a1a'
    },
    {
      id: 'mid',
      speed: 0.25,
      opacity: 0.08,
      blur: 2,
      y: '40%',
      height: '35vh',
      count: 5,
      color: '#2a2a2a'
    },
    {
      id: 'near',
      speed: 0.45,
      opacity: 0.12,
      blur: 0,
      y: '60%',
      height: '30vh',
      count: 6,
      color: '#000000'
    }
  ], []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {layers.map((layer) => (
        <div 
          key={layer.id}
          className="absolute w-[5000px] h-full transition-transform duration-100 ease-out"
          style={{ 
            transform: `translate3d(${-scrollLeft * layer.speed}px, 0, 0)`,
            willChange: 'transform'
          }}
        >
          {Array.from({ length: layer.count }).map((_, i) => (
            <div 
              key={i}
              className="absolute bottom-0"
              style={{
                left: `${i * (100 / layer.count) + (Math.random() * 5)}%`,
                width: '40%',
                height: layer.height,
                opacity: layer.opacity,
                filter: `blur(${layer.blur}px)`,
                background: `linear-gradient(to top, ${layer.color} 0%, transparent 100%)`,
                maskImage: 'radial-gradient(ellipse at center bottom, black 0%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center bottom, black 0%, transparent 70%)',
                transform: `translateY(${layer.y}) scaleX(${1.5 + Math.random()})`,
                transformOrigin: 'bottom center'
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ParallaxInkMountains;
