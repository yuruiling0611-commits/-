import React, { useState } from 'react';
import { TravelNode } from '../types';
import { Compass, Map } from 'lucide-react';
import ModernGuideModal from './ModernGuideModal';

interface InfoPanelProps {
  node: TravelNode;
  isOpen: boolean;
  onNext: () => void;
  onClose: () => void;
  onOpenGuide: () => void;
  isLast: boolean;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ node, isOpen, onNext, onClose, onOpenGuide, isLast }) => {
  // 提取背景大字（省份首字）
  const provinceChar = node.province.charAt(0);

  return (
    <div 
      className={`fixed top-[12%] left-0 h-[76vh] w-[33vw] min-w-[480px] bg-[#fdfaf5] shadow-[20px_0_60px_rgba(0,0,0,0.15)] transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1) z-[100] overflow-hidden ripped-right ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
    >
      {/* 纸张纹理叠加 - 强化纹理感 */}
      <div className="absolute inset-0 opacity-60 pointer-events-none ripped-edge mix-blend-multiply"></div>
      
      {/* 装饰性印章字符 - 缩小 */}
      <div className="absolute top-6 right-8 w-10 h-10 border border-[#a22121] text-[#a22121] flex items-center justify-center font-['Ma_Shan_Zheng'] text-sm opacity-30 select-none">游</div>

      {/* 背景衬底大字 - 缩小 */}
      <div className="absolute right-[-5%] bottom-[-5%] text-[20rem] font-['Ma_Shan_Zheng'] text-[#1a1a1a] opacity-[0.02] pointer-events-none select-none">{provinceChar}</div>
      
      {/* 洒金背景效果 */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(rgba(212,175,55,0.4)_1px,transparent:0)] bg-[length:24px:24px]"></div>
      
      <div className="relative p-8 h-full flex flex-row z-10 gap-6">
        
        {/* 左侧：内容主区 */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#8b4513] tracking-[0.3em] opacity-60">
              <Compass className="w-3 h-3" />
              <span>{node.province} · 霞客游踪</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-6 border-b-2 border-[#a22121]/20 pb-2 shrink-0">
            <h2 className="text-3xl shoujin-font text-[#a22121]">
              {node.province} · {node.location}
            </h2>
            
            {/* 现代攻略按键 */}
            <button 
              onClick={onOpenGuide}
              className="flex items-center gap-2 px-3 py-1 border border-[#a22121]/30 text-[#a22121] hover:bg-[#a22121] hover:text-white transition-all rounded-sm group"
            >
              <Map className="w-3 h-3" />
              <span className="shoujin-font text-xs">现代锦囊</span>
            </button>
          </div>
          
          {/* 滚动内容区 */}
          <div className="overflow-y-auto custom-scrollbar flex-1 pr-4 min-h-0 flex flex-row-reverse gap-8">
            {/* 1. 核心介绍 - 竖排 */}
            <div className="flex flex-col h-full shrink-0">
               <div className="shoujin-font text-lg text-[#8b4513]/80 border-b-2 border-[#8b4513]/30 pb-2 mb-4 writing-vertical h-fit">行旅纪实</div>
               <div className="text-[#1a1a1a] leading-[2.2] text-[1.1rem] font-serif writing-vertical h-full max-h-full overflow-x-auto custom-scrollbar-h pr-2">
                 {node.description}
               </div>
            </div>

            {/* 2. 游记原句 & 足迹 - 竖排 */}
            <div className="flex flex-col h-full shrink-0 gap-8">
              {node.adventure && (
                <div className="relative py-8 px-4 bg-[#f4f1ea]/40 border-x border-[#d4af37]/15 h-fit">
                  <div className="absolute -left-2.5 top-4 bg-[#a22121] text-white text-[8px] px-0.5 py-2 tracking-widest shoujin-font writing-vertical">游记原句</div>
                  <div className="brush-font text-2xl text-[#1a1a1a] leading-relaxed writing-vertical italic opacity-85">
                    “{node.adventure}”
                  </div>
                </div>
              )}

              {/* 足迹时间轴 - 竖排 */}
              {node.timeline && node.timeline.length > 0 && (
                <div className="timeline-box-v !border-t !border-l-0 !pt-4 !pl-0 flex flex-col items-start">
                  <div className="timeline-title-v !text-lg !mb-4 writing-vertical">足迹游踪</div>
                  <div className="flex flex-row-reverse gap-4 h-full overflow-x-auto custom-scrollbar-h">
                    {node.timeline.map((point, idx) => (
                      <div key={idx} className="timeline-node-v !text-sm !text-[#555] writing-vertical h-fit relative pt-4 before:!top-0 before:!left-1/2 before:!-translate-x-1/2 before:!w-1.5 before:!h-1.5 before:bg-[#c5a059] before:rounded-full before:absolute">{point}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. 停留时长 & 见闻 - 竖排 */}
            <div className="flex flex-col h-full shrink-0 gap-6 border-r border-[#d4af37]/15 pr-6">
               <div className="flex flex-col gap-2">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#8b4513] opacity-50 font-bold writing-vertical">驻留时长</div>
                  <div className="shoujin-font text-2xl text-[#a22121] writing-vertical">{node.stayDuration || '行旅数日'}</div>
               </div>
               <div className="flex flex-col gap-2">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#8b4513] opacity-50 font-bold writing-vertical">山川见闻</div>
                  <div className="flex flex-col gap-2">
                    {node.observations?.map((obs, i) => (
                      <span key={i} className="text-[10px] bg-[#c5a059]/10 text-[#8b4513] px-1 py-2 rounded-sm border border-[#c5a059]/20 font-medium writing-vertical">{obs}</span>
                    ))}
                  </div>
               </div>
            </div>
          </div>

          {/* 底部按钮区 - 确保在左下方，竖排以模仿古代书写方式 */}
          <div className="mt-auto pt-6 flex justify-start gap-4 shrink-0 z-20">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="relative flex items-center justify-center border border-[#1a1a1a]/40 py-6 px-3 group transition-all hover:bg-[#1a1a1a] hover:text-white active:scale-95 shadow-md bg-white/50 backdrop-blur-sm"
            >
              <span className="shoujin-font text-sm writing-vertical tracking-[0.2em]">
                收卷暂歇
              </span>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#1a1a1a]/40 group-hover:border-white"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#1a1a1a]/40 group-hover:border-white"></div>
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="relative flex items-center justify-center border border-[#9d2919] py-6 px-3 group transition-all hover:bg-[#9d2919] hover:text-white active:scale-95 shadow-lg bg-white/50 backdrop-blur-sm"
            >
              <span className="shoujin-font text-sm writing-vertical tracking-[0.2em]">
                {isLast ? '掩卷合志' : '合印前行'}
              </span>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#9d2919] group-hover:border-white"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#9d2919] group-hover:border-white"></div>
            </button>
          </div>
        </div>

        {/* 右侧：竖排原文区 */}
        <div className="original-quote flex items-start pt-8 writing-vertical text-lg opacity-15 hover:opacity-100 transition-opacity duration-500 select-none shrink-0 border-l border-[#d4af37]/10 pl-6 h-full overflow-y-auto custom-scrollbar">
          {node.historicalContext}
        </div>

      </div>
    </div>
  );
};

export default InfoPanel;