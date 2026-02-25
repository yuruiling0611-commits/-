import React from 'react';
import { X, MapPin, Calendar, Info } from 'lucide-react';
import { TravelNode } from '../types';

interface ModernGuideModalProps {
  node: TravelNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModernGuideModal: React.FC<ModernGuideModalProps> = ({ node, isOpen, onClose }) => {
  const guide = node.modernGuide;

  return (
    <div 
      className={`fixed top-[12%] h-[76vh] w-[30vw] min-w-[400px] bg-[#fdfaf5] shadow-[20px_0_60px_rgba(0,0,0,0.1)] transition-all duration-700 cubic-bezier(0.23,_1,_0.32,_1) z-[110] overflow-hidden border-r border-[#d4af37]/20 ripped-right ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
      style={{ left: 'clamp(480px, 33vw, 33vw)' }}
    >
      {/* 纸张纹理叠加 */}
      <div className="absolute inset-0 opacity-40 pointer-events-none ripped-edge mix-blend-multiply"></div>
      
      {/* Header */}
      <div className="relative p-6 border-b border-[#d4af37]/20 flex justify-between items-center bg-[#f4f1ea]/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-[#a22121] text-[#a22121] flex items-center justify-center font-['Ma_Shan_Zheng'] text-xl">
            今
          </div>
          <div>
            <h3 className="shoujin-font text-2xl text-[#a22121]">{node.location} · 现代游踪</h3>
            <p className="text-[10px] text-[#8b4513] opacity-60 tracking-[0.2em] uppercase">Modern Travel Guide</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-[#a22121]/10 rounded-full transition-colors text-[#a22121]"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      {/* Body */}
      <div className="relative p-8 h-[calc(100%-88px)] overflow-y-auto custom-scrollbar space-y-8">
        {/* Highlights */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 shoujin-font text-lg text-[#8b4513]">
            <MapPin className="w-4 h-4" />
            <span>必游胜迹</span>
          </div>
          <div className="space-y-2">
            {guide?.highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-3 bg-[#f4f1ea]/60 border border-[#d4af37]/10 rounded-sm">
                <div className="w-1.5 h-1.5 bg-[#a22121] rounded-full"></div>
                <span className="text-sm font-serif text-[#1a1a1a]">{item}</span>
              </div>
            ))}
          </div>
        </section>
        
        {/* Best Time */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 shoujin-font text-lg text-[#8b4513]">
            <Calendar className="w-4 h-4" />
            <span>最佳时节</span>
          </div>
          <div className="p-4 bg-[#f4f1ea]/60 border border-[#d4af37]/10 rounded-sm flex flex-col gap-2">
            <span className="brush-font text-2xl text-[#a22121]">{guide?.bestTime}</span>
            <p className="text-xs font-serif text-[#555]">此时山川明丽，气候宜人，最宜寻幽访胜。</p>
          </div>
        </section>
        
        {/* Tips */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 shoujin-font text-lg text-[#8b4513]">
            <Info className="w-4 h-4" />
            <span>行旅锦囊</span>
          </div>
          <div className="p-5 bg-[#a22121]/5 border-l-4 border-[#a22121] rounded-r-sm">
            <p className="text-sm font-serif leading-relaxed text-[#444] italic">
              “{guide?.tips}”
            </p>
          </div>
        </section>
      </div>
      
      {/* Footer Decoration */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#a22121] via-[#d4af37] to-[#a22121] opacity-30"></div>
    </div>
  );
};

export default ModernGuideModal;
