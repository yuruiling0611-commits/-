import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';

interface TongluZhengModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: string;
  matchedLocations: string[];
  entryCount: number;
}

const TongluZhengModal: React.FC<TongluZhengModalProps> = ({ 
  isOpen, 
  onClose, 
  quote, 
  matchedLocations,
  entryCount
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsRevealed(true), 500);
      return () => clearTimeout(timer);
    } else {
      setIsRevealed(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[6000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
      >
        <motion.div 
          initial={{ scale: 0.8, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-xl bg-[#a22121] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center border-2 border-[#d4af37]/50"
        >
          {/* Silk/Paper Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/silk.png')]"></div>
          
          {/* Golden Decorative Border */}
          <div className="absolute inset-4 border border-[#d4af37]/60 pointer-events-none"></div>
          <div className="absolute inset-6 border-2 border-[#d4af37]/30 pointer-events-none"></div>
          
          {/* Golden Corner Patterns */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#d4af37] opacity-80"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#d4af37] opacity-80"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#d4af37] opacity-80"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#d4af37] opacity-80"></div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-[#d4af37] opacity-60 hover:opacity-100 transition-opacity z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="relative p-10 md:p-14 flex flex-col items-center w-full text-center">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="shoujin-font text-2xl text-[#d4af37] mb-2 tracking-[0.6em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            >
              万里同路证
            </motion.div>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="w-32 h-px bg-[#d4af37]/40 mb-10"
            ></motion.div>

            {/* Main Quote from Xu Xiake */}
            <div className="flex flex-row-reverse items-center justify-center gap-6 mb-12 min-h-[250px] max-h-[40vh]">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="shoujin-font text-2xl md:text-3xl leading-[2.2] text-[#f8e3a1] writing-vertical tracking-[0.3em] overflow-y-auto custom-scrollbar pr-2"
              >
                {quote}
              </motion.div>
              
              {/* Matched Locations */}
              {matchedLocations.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="flex flex-col items-center gap-4 border-l border-[#d4af37]/20 pl-6"
                >
                  <div className="shoujin-font text-[10px] text-[#d4af37] opacity-60 writing-vertical tracking-widest mb-2">同游之地</div>
                  <div className="flex flex-col gap-2">
                    {matchedLocations.map((loc, i) => (
                      <div key={i} className="shoujin-font text-base text-[#d4af37] writing-vertical border border-[#d4af37]/30 px-1 py-2 rounded-sm bg-black/10">
                        {loc}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Core Message */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="relative py-6 px-10 border-y border-[#d4af37]/30 bg-black/5"
            >
              <div className="shoujin-font text-xl md:text-2xl text-[#f8e3a1] tracking-[0.4em] drop-shadow-md">
                跨越四百年，尔我皆同路。
              </div>
              <Sparkles className="absolute -top-2 -left-2 w-4 h-4 text-[#d4af37]" />
              <Sparkles className="absolute -bottom-2 -right-2 w-4 h-4 text-[#d4af37]" />
            </motion.div>

            {/* Footer / Seal */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="mt-10 flex flex-col items-center gap-4"
            >
              <div className="shoujin-font text-xs text-[#d4af37] opacity-60 tracking-widest">
                第 {entryCount} 篇 · 墨迹回响
              </div>
              <button 
                onClick={onClose}
                className="w-14 h-14 border-2 border-[#d4af37] rounded-sm flex items-center justify-center text-[#d4af37] shoujin-font text-[10px] rotate-[-15deg] bg-black/20 shadow-inner hover:bg-[#d4af37] hover:text-[#a22121] transition-all active:scale-90"
              >
                万里<br/>同路
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TongluZhengModal;
