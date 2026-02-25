import React, { useMemo, useEffect, useRef, memo } from 'react';
import { TravelNode } from '../types';

interface InkTrailProps {
  nodes: TravelNode[];
  unlockedCount: number;
  scrollSpeed: number;
}

const InkTrail: React.FC<InkTrailProps> = memo(({ nodes, unlockedCount, scrollSpeed }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const goldPathRef = useRef<SVGPathElement>(null);

  const pathData = useMemo(() => {
    if (nodes.length < 2) return '';
    return nodes.reduce((acc, node, i) => {
      const x = node.coordinates.x * 30;
      const y = node.coordinates.y * 7; 
      
      if (i === 0) return `M ${x},${y}`;
      
      const prevX = nodes[i - 1].coordinates.x * 30;
      const prevY = nodes[i - 1].coordinates.y * 7;
      
      const cp1x = prevX + (x - prevX) * 0.5;
      const cp1y = prevY;
      const cp2x = prevX + (x - prevX) * 0.5;
      const cp2y = y;
      
      return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;
    }, '');
  }, [nodes]);

  // 云雾位置计算 - 进一步优化
  const cloudPositions = useMemo(() => {
    const positions: { x: number; y: number; scale: number; opacity: number; duration: number; delay: number }[] = [];
    // 降低云雾密度
    for (let i = 0; i < nodes.length - 1; i += 2) {
      const x1 = nodes[i].coordinates.x * 30;
      const y1 = nodes[i].coordinates.y * 7;
      const x2 = nodes[Math.min(i + 2, nodes.length - 1)].coordinates.x * 30;
      const y2 = nodes[Math.min(i + 2, nodes.length - 1)].coordinates.y * 7;
      
      positions.push({
        x: x1 + (x2 - x1) * 0.5 + (Math.random() - 0.5) * 100,
        y: y1 + (y2 - y1) * 0.5 + (Math.random() - 0.5) * 50,
        scale: 1.2 + Math.random() * 1.5,
        opacity: 0.02 + Math.random() * 0.04,
        duration: 25 + Math.random() * 15,
        delay: -Math.random() * 25
      });
    }
    return positions;
  }, [nodes]);

  useEffect(() => {
    const gsap = (window as any).gsap;
    if (pathRef.current && goldPathRef.current && gsap) {
      const length = pathRef.current.getTotalLength();
      const progress = (unlockedCount) / (nodes.length - 1);
      
      gsap.to([pathRef.current, goldPathRef.current], {
        strokeDashoffset: length * (1 - progress),
        duration: 2.0,
        ease: "power2.inOut"
      });
    }
  }, [unlockedCount, nodes.length]);

  useEffect(() => {
    if (pathRef.current && goldPathRef.current) {
      const length = pathRef.current.getTotalLength();
      [pathRef.current, goldPathRef.current].forEach(p => {
        p.style.strokeDasharray = `${length}`;
        p.style.strokeDashoffset = `${length}`;
      });
    }
  }, []);

  // 使用 CSS 变量更新动态样式，避免 React 重新渲染整个 SVG
  useEffect(() => {
    if (svgRef.current) {
      const strokeWidth = Math.max(1.5, 4 - (scrollSpeed / 20));
      const blur = scrollSpeed === 0 ? 2 : 0.5;
      svgRef.current.style.setProperty('--dynamic-stroke-width', `${strokeWidth}`);
      svgRef.current.style.setProperty('--dynamic-blur', `${blur}px`);
    }
  }, [scrollSpeed]);

  return (
    <svg 
      ref={svgRef}
      className="absolute top-0 left-0 pointer-events-none overflow-visible" 
      width="3000" 
      height="800"
      style={{ 
        willChange: 'transform',
        transform: 'translate3d(0,0,0)'
      }}
    >
      <defs>
        <filter id="gold-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feFlood floodColor="#d4af37" floodOpacity="0.4" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="cloud-filter">
          <feGaussianBlur stdDeviation="15" />
        </filter>

        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* 云雾背景 - 简化渲染 */}
      <g className="clouds-layer">
        {cloudPositions.map((pos, i) => (
          <circle 
            key={`cloud-${i}`}
            cx={pos.x}
            cy={pos.y}
            r="70" 
            fill="#e0e0e0" 
            filter="url(#cloud-filter)" 
            opacity={pos.opacity}
            style={{ 
              transform: `scale(${pos.scale})`,
              transformOrigin: `${pos.x}px ${pos.y}px`,
              animation: `cloudFloat ${pos.duration}s ease-in-out infinite`,
              animationDelay: `${pos.delay}s`
            }}
          />
        ))}
      </g>

      {/* 墨迹路径 (主路径) */}
      <path
        ref={pathRef}
        d={pathData}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="var(--dynamic-stroke-width, 3)"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          filter: `blur(var(--dynamic-blur, 2px))`,
          strokeOpacity: 0.6,
          transition: 'stroke-width 0.3s ease, filter 0.5s ease-out'
        }}
      />

      {/* 金丝流光 */}
      <path
        ref={goldPathRef}
        d={pathData}
        fill="none"
        stroke="url(#gold-gradient)"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#gold-glow)"
        className="gold-silk-flow"
        style={{ 
          strokeOpacity: 0.5,
          mixBlendMode: 'screen'
        }}
      />

      {/* 浅影轨迹 (底色) */}
      <path
        d={pathData}
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.0"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.01"
      />
    </svg>
  );
});

export default InkTrail;
