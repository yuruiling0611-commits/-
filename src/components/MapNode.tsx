import React, { memo } from 'react';
import { MapPin } from 'lucide-react';
import { TravelNode } from '../types';

interface MapNodeProps {
  node: TravelNode;
  index: number;
  isUnlocked: boolean;
  isActive: boolean;
  isStamped: boolean;
  onNodeClick: (index: number) => void;
}

const MapNode: React.FC<MapNodeProps> = memo(({ 
  node, 
  index, 
  isUnlocked, 
  isActive, 
  isStamped, 
  onNodeClick 
}) => {
  return (
    <div 
      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`} 
      style={{ 
        left: `${node.coordinates.x * 30}px`, 
        top: `${node.coordinates.y * 1.1}%`,
        pointerEvents: isUnlocked ? 'auto' : 'none',
        zIndex: isActive ? 50 : 10
      }}
    >
      <div 
        onClick={() => onNodeClick(index)} 
        className="group relative cursor-pointer flex flex-col items-center"
      >
        {/* 墨晕扩散效果 - 仅在激活时显示 */}
        {isActive && (
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="w-24 h-24 bg-[#1a1a1a] rounded-full opacity-5 blur-2xl animate-ink-bleed"></div>
            <div className="w-16 h-16 bg-[#1a1a1a] rounded-full opacity-10 blur-xl animate-ink-bleed-slow"></div>
          </div>
        )}

        <div className="relative mb-3">
          <div className={`shoujin-font text-3xl transition-all duration-700 ${isActive ? 'text-[#a22121] scale-125' : 'text-[#1a1a1a] opacity-40 group-hover:opacity-100 group-hover:-translate-y-2'}`}>
            {node.location}
          </div>
          {isStamped && (
            <div 
              id={`seal-${index}`}
              className="map-seal top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ 
                transform: `translate(-50%, -50%) rotate(${(index % 3 - 1) * 8}deg)` 
              }}
            >
              游踪
            </div>
          )}
        </div>

        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className={`absolute inset-0 rounded-full bg-[#1a1a1a] transition-all duration-700 ${isActive ? 'scale-110 shadow-xl' : 'scale-50'}`}></div>
          {isActive && <div className="absolute inset-[-4px] rounded-full border-2 border-[#a22121] animate-ping opacity-30"></div>}
          <MapPin className={`w-5 h-5 text-white z-10 transition-transform ${isActive ? 'scale-110' : 'scale-0'}`} />
        </div>
      </div>
    </div>
  );
});

export default MapNode;
