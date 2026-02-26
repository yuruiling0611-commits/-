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
  const [isHistoricalActive, setIsHistoricalActive] = React.useState(false);

  // 当地点切换时，重置史籍激活状态
  React.useEffect(() => {
    setIsHistoricalActive(false);
  }, [node.id]);

  // 提取背景大字（省份首字）
  const provinceChar = node.province.charAt(0);

  return (
    <div 
      className={`fixed top-[12%] left-0 h-[76vh] w-[33vw] min-w-[480px] bg-[#fdfaf5] shadow-[20px_0_60px_rgba(0,0,0,0.15)] transition-all duration-700 cubic-bezier(0.23, 1, 0.32, 1) z-[100] overflow-hidden ripped-right ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}
    >
      {/* 纸张纹理叠加 - 强化纹理感 */}
      <div className="absolute inset-0 opacity-60 pointer-events-none ripped-edge mix-blend-multiply"></div>
      
      {/* 装饰性印章字符 - 点击切换史籍记载颜色 */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setIsHistoricalActive(!isHistoricalActive);
        }}
        className={`absolute top-6 right-10 w-12 h-12 border-2 border-[#a22121] text-[#a22121] flex items-center justify-center font-['Ma_Shan_Zheng'] text-xl transition-all duration-300 select-none z-[110] ${isHistoricalActive ? 'bg-[#a22121] text-white opacity-100 shadow-lg scale-110' : 'bg-transparent opacity-40 hover:opacity-100'}`}
      >
        游
      </button>

      {/* 背景衬底大字 - 缩小 */}
      <div className="absolute right-[-5%] bottom-[-5%] text-[20rem] font-['Ma_Shan_Zheng'] text-[#1a1a1a] opacity-[0.02] pointer-events-none select-none">{provinceChar}</div>
      
      {/* 洒金背景效果 */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(rgba(212,175,55,0.4)_1px,transparent:0)] bg-[length:24px:24px]"></div>
      
      <div className="relative p-8 h-full flex flex-row z-10 gap-6">
        
        {/* 内容主区 */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#8b4513] tracking-[0.3em] opacity-60">
              <Compass className="w-3 h-3" />
              <span>{node.province} · 霞客游踪</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-6 border-b-2 border-[#a22121]/20 pb-4 shrink-0">
            <h2 className="text-4xl shoujin-font text-[#a22121] tracking-widest">
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
          
          {/* 滚动内容区 - 唯一的纵向滚动 */}
          <div className="overflow-y-auto custom-scrollbar flex-1 pr-4 space-y-6 min-h-0">
            {/* 1. 核心介绍 - 横向排版，书法字体 */}
            <div className="relative">
               <div className="shoujin-font text-xl text-[#8b4513] border-l-4 border-[#a22121] pl-4 mb-4 tracking-[0.2em]">行旅纪实</div>
               <div className="py-1">
                 <p className="shoujin-font text-[#1a1a1a] leading-[1.8] text-justify text-[1.4rem] tracking-widest">
                   {node.description}
                 </p>
               </div>
            </div>

            {/* 2. 停留时长 & 见闻 - 极简紧凑布局 */}
            <div className="grid grid-cols-2 gap-2 py-2 border-y border-[#d4af37]/15">
               <div className="flex flex-col gap-0.5">
                  <div className="text-[9px] uppercase tracking-[0.1em] text-[#8b4513] opacity-40 font-bold">驻留时长</div>
                  <div className="calligraphy-font text-xl text-[#a22121] leading-none">{node.stayDuration || '行旅数日'}</div>
               </div>
               <div className="flex flex-col gap-0.5">
                  <div className="text-[9px] uppercase tracking-[0.1em] text-[#8b4513] opacity-40 font-bold">山川见闻</div>
                  <div className="flex flex-wrap gap-1">
                    {node.observations?.map((obs, i) => (
                      <span key={i} className="text-[9px] bg-[#c5a059]/5 text-[#8b4513] px-1.5 py-0 rounded-sm border border-[#c5a059]/10 font-medium">{obs}</span>
                    ))}
                  </div>
               </div>
            </div>

            {/* 3.游记原句 - 使用更易辨识的书法字体 */}
            {node.adventure && (
              <div className="relative py-6 px-8 bg-[#f4f1ea]/60 border border-[#d4af37]/20 shadow-inner overflow-hidden">
                <div className="absolute -top-2 left-4 bg-[#a22121] text-white text-[9px] px-2 py-0.5 tracking-[0.2em] shoujin-font">游记原句</div>
                <div className="calligraphy-font text-2xl text-[#1a1a1a] leading-relaxed text-center opacity-90">
                  “{node.adventure}”
                </div>
              </div>
            )}

            {/* 5. 时间轴模块 */}
            {node.timeline && node.timeline.length > 0 && (
              <div className="timeline-box !mt-6 !pl-6 !border-l-2 !border-[#d4af37]/30">
                <div className="timeline-title !text-xl !mb-4 !text-[#a22121]">足迹 · 游踪</div>
                <div className="space-y-3">
                  {node.timeline.map((point, idx) => (
                    <div key={idx} className="timeline-node !text-[1rem] !text-[#444] !pl-2 before:!left-[-27px] before:!w-2 before:!h-2 before:!bg-[#a22121]">{point}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 底部按钮区 - 横向排列（按钮内部文字保持垂直书写）在左下角 */}
          <div className="mt-auto pt-4 flex flex-row items-end gap-4 shrink-0 z-20">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="relative flex items-center justify-center border border-[#1a1a1a]/40 py-4 px-2.5 group transition-all hover:bg-[#1a1a1a] hover:text-white active:scale-95 shadow-md bg-white/50 backdrop-blur-sm"
            >
              <span className="shoujin-font text-base writing-vertical tracking-[0.2em]">
                收卷暂歇
              </span>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#1a1a1a]/40 group-hover:border-white"></div>
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#1a1a1a]/40 group-hover:border-white"></div>
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="relative flex items-center justify-center border border-[#9d2919] py-4 px-2.5 group transition-all hover:bg-[#9d2919] hover:text-white active:scale-95 shadow-lg bg-white/50 backdrop-blur-sm"
            >
              <span className="shoujin-font text-base writing-vertical tracking-[0.2em]">
                {isLast ? '掩卷合志' : '合印前行'}
              </span>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#9d2919] group-hover:border-white"></div>
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#9d2919] group-hover:border-white"></div>
            </button>
          </div>
        </div>

        {/* 右侧：史籍记载 - 恢复纵向排列，点击“游”变色 */}
        <div className="shrink-0 flex flex-col items-center pt-16 border-l border-[#d4af37]/30 pl-6 h-full w-24 bg-[#fdfaf5]/40">
          <div className="shoujin-font text-sm mb-8 text-[#a22121] opacity-60 writing-vertical tracking-[0.4em] select-none">史籍记载</div>
          <div className="flex-1 overflow-y-auto custom-scrollbar w-full flex justify-center">
            <div 
              className={`writing-vertical calligraphy-font text-3xl leading-[1.8] tracking-[0.2em] transition-all duration-700 ${isHistoricalActive ? 'text-[#1a1a1a] opacity-100' : 'text-[#ccc] opacity-30'}`}
              style={{ height: 'max-content', minHeight: '100%' }}
            >
              {node.historicalContext}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InfoPanel;