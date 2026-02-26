import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, History, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EchoEntry } from '../types';
import { TRAVEL_DATA } from '../constants';
import TongluZhengModal from './TongluZhengModal';

interface EchoesViewProps {
  onBack: () => void;
}

const XU_XIAKE_QUOTES = [
  "大丈夫当朝碧海而暮苍梧，岂能与儿女守床榻耶？",
  "五岳归来不看山，黄山归来不看岳。",
  "薄海内外无如徽之黄山。",
  "金沙江，实长江之正源也。",
  "汉之张骞，唐之玄奘，元之耶律楚材，皆受命前往。我一介布衣，孤身万里，亦不负此生。",
  "入山之处，有石梁飞瀑，其长丈余，阔不盈尺。",
  "攀绝壁，手足并用。至巅峰，云海在脚底翻涌，万峰如岛。"
];

const EchoesView: React.FC<EchoesViewProps> = ({ onBack }) => {
  const [prologueStage, setPrologueStage] = useState(0); // 0: none, 1: first sentence, 2: second sentence, 3: fade out
  const [showInput, setShowInput] = useState(false);
  const [content, setContent] = useState('');
  const [history, setHistory] = useState<EchoEntry[]>([]);
  const [certificates, setCertificates] = useState<{ quote: string; matchedLocations: string[]; entryCount: number }[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showCertGallery, setShowCertGallery] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [inkFlowers, setInkFlowers] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  
  const handleDeleteEntry = (id: string) => {
    const updatedHistory = history.filter(entry => entry.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('echoes_history', JSON.stringify(updatedHistory));
  };

  // Certificate State
  const [showCertificate, setShowCertificate] = useState(false);
  const [currentCertificateData, setCurrentCertificateData] = useState<{
    quote: string;
    matchedLocations: string[];
    entryCount: number;
  } | null>(null);

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('echoes_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    // Load certificates from localStorage
    const savedCerts = localStorage.getItem('echoes_certificates');
    if (savedCerts) {
      try {
        setCertificates(JSON.parse(savedCerts));
      } catch (e) {
        console.error("Failed to parse certificates", e);
      }
    }

    // Start prologue animation: sentence by sentence
    const timer1 = setTimeout(() => {
      setPrologueStage(1);
      const timer2 = setTimeout(() => {
        setPrologueStage(2);
        const timer3 = setTimeout(() => {
          setPrologueStage(3); // Fade out stage
          const timer4 = setTimeout(() => {
            setShowInput(true);
          }, 2500);
        }, 2500);
      }, 2000);
    }, 1000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  const createInkFlower = (x: number, y: number) => {
    const id = Date.now() + Math.random();
    const size = 50 + Math.random() * 150;
    setInkFlowers(prev => [...prev, { id, x, y, size }]);
    setTimeout(() => {
      setInkFlowers(prev => prev.filter(f => f.id !== id));
    }, 3000);
  };

  const findMatchedLocations = (text: string) => {
    const matched: string[] = [];
    TRAVEL_DATA.forEach(node => {
      if (text.includes(node.location) || text.includes(node.province)) {
        if (!matched.includes(node.location)) {
          matched.push(node.location);
        }
      }
    });
    return matched.slice(0, 3); // Max 3 locations for design
  };

  const handleSave = () => {
    if (!content.trim()) return;

    setIsRolling(true);
    
    // Create ink flowers
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createInkFlower(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight
        );
      }, i * 200);
    }

    const newEntry: EchoEntry = {
      id: Date.now().toString(),
      content: content,
      timestamp: Date.now()
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('echoes_history', JSON.stringify(updatedHistory));

    // Check for certificate trigger: 1st entry or every 5th subsequent entry (6, 11, 16...)
    const entryCount = updatedHistory.length;
    const isTriggered = entryCount === 1 || (entryCount > 1 && (entryCount - 1) % 5 === 0);

    setTimeout(() => {
      if (isTriggered) {
        const matched = findMatchedLocations(content);
        const randomQuote = XU_XIAKE_QUOTES[Math.floor(Math.random() * XU_XIAKE_QUOTES.length)];
        const certData = {
          quote: randomQuote,
          matchedLocations: matched,
          entryCount: entryCount
        };
        
        const updatedCerts = [...certificates, certData];
        setCertificates(updatedCerts);
        localStorage.setItem('echoes_certificates', JSON.stringify(updatedCerts));
        
        setCurrentCertificateData(certData);
        setShowCertificate(true);
      }
      setContent('');
      setIsRolling(false);
    }, 1500);
  };

  const formatDate = (ts: number) => {
    const date = new Date(ts);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[5000] bg-[#f4f1ea] flex flex-col items-center justify-center overflow-hidden shoujin-font">
      {/* Rice paper texture */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
      
      {/* Ink Flowers Layer */}
      {inkFlowers.map(flower => (
        <div 
          key={flower.id}
          className="absolute rounded-full bg-[#1a1a1a] opacity-20 blur-3xl animate-pulse"
          style={{
            left: flower.x,
            top: flower.y,
            width: flower.size,
            height: flower.size,
            transform: 'translate(-50%, -50%)',
            transition: 'all 3s ease-out'
          }}
        />
      ))}

      {/* Navigation */}
      <div className="absolute top-8 left-8 flex gap-4 z-50">
        <button 
          onClick={onBack}
          className="p-3 bg-white/80 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all shadow-lg group"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className={`p-3 border border-black/10 rounded-full transition-all shadow-lg flex items-center gap-2 ${showHistory ? 'bg-black text-white' : 'bg-white/80 hover:bg-black hover:text-white'}`}
        >
          <History className="w-6 h-6" />
          <span className="shoujin-font text-sm">历程</span>
        </button>
      </div>

      {/* Prologue */}
      {!showInput && !showHistory && (
        <div className="flex flex-row-reverse items-center justify-center gap-16 h-[60vh]">
          <AnimatePresence>
            {prologueStage === 1 && (
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 2 }}
                className="shoujin-font text-6xl md:text-8xl text-[#1a1a1a] writing-vertical tracking-[0.5em] whitespace-nowrap"
              >
                君之所至
              </motion.span>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {prologueStage === 2 && (
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 2 }}
                className="shoujin-font text-6xl md:text-8xl text-[#1a1a1a] writing-vertical tracking-[0.5em] whitespace-nowrap"
              >
                皆为江山
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Input Area */}
      {showInput && !showHistory && (
        <div className={`relative transition-all duration-1000 ${isRolling ? 'scale-x-0 opacity-0' : 'scale-100 opacity-100'} max-h-[90vh] flex items-center`}>
          {/* Stationery Container */}
          <div className="relative bg-[#fdfaf5] p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.12)] border-[1px] border-[#d4af37]/20 w-[85vw] max-w-4xl h-[80vh] flex flex-col items-center overflow-hidden">
            {/* Fine Rice Paper Texture */}
            <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center select-none">
              <span className="shoujin-font text-[10vw] writing-vertical tracking-[1em] text-[#1a1a1a]">朝碧海而暮苍梧</span>
            </div>
            
            {/* Traditional Stationery Red Grid (Song Style) - Vertical */}
            <div className="absolute inset-0 pointer-events-none flex justify-around px-12 py-16 opacity-[0.08]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-px h-full bg-[#a22121]" />
              ))}
            </div>

            {/* Header Decoration */}
            <div className="w-full flex justify-between items-center mb-8 shrink-0 z-10">
               <div className="flex flex-col gap-1">
                 <div className="shoujin-font text-xs text-[#a22121] opacity-50 tracking-[0.4em]">大明 · 续墨</div>
                 <div className="w-10 h-px bg-[#a22121]/30"></div>
               </div>
               <div className="flex flex-col items-center">
                 <div className="w-10 h-10 border border-[#a22121]/40 text-[#a22121]/60 flex items-center justify-center font-['Ma_Shan_Zheng'] text-lg">
                   回
                 </div>
               </div>
            </div>

            {/* Writing Area */}
            <div className="relative flex-1 w-full flex justify-center min-h-0 z-10 overflow-x-auto custom-scrollbar-h">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="在此续写君之游踪..."
                className="h-full bg-transparent border-none focus:ring-0 text-2xl md:text-3xl lg:text-4xl leading-[2.4] text-[#1a1a1a] writing-vertical tracking-[0.25em] placeholder:text-gray-200 resize-none shoujin-font"
                style={{ width: 'max-content', minWidth: '100%' }}
              />
            </div>

            {/* Footer / Seal Area */}
            <div className="mt-8 flex flex-col items-center gap-4 shrink-0 z-10">
              <button 
                onClick={handleSave}
                disabled={!content.trim() || isRolling}
                className="group relative flex items-center justify-center"
              >
                <div className="w-20 h-20 border-2 border-[#a22121] rounded-sm flex items-center justify-center text-[#a22121] shoujin-font text-2xl hover:bg-[#a22121] hover:text-white transition-all shadow-lg active:scale-90 bg-white/40 backdrop-blur-sm">
                  钤印
                </div>
                <div className="absolute -bottom-6 text-[9px] text-[#8b4513] opacity-40 tracking-[0.3em] uppercase font-bold">Seal & Save</div>
              </button>
            </div>
          </div>
          
          {/* Scroll handles - Minimalist Song Style */}
          <div className="absolute top-[-1%] -left-6 bottom-[-1%] w-8 bg-[#5d3a1a] rounded-sm shadow-xl border-r border-white/5"></div>
          <div className="absolute top-[-1%] -right-6 bottom-[-1%] w-8 bg-[#5d3a1a] rounded-sm shadow-xl border-l border-white/5"></div>
        </div>
      )}

      {/* History View */}
      {showHistory && (
        <div className="relative w-[90vw] max-w-5xl h-[85vh] bg-[#fdfaf5] shadow-2xl border border-[#d4af37]/20 p-10 md:p-14 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-10 duration-700">
          {/* Fine Rice Paper Texture */}
          <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
          
          <div className="relative flex items-center justify-between mb-10 border-b border-[#d4af37]/30 pb-6 z-10">
            <div className="flex flex-col gap-1">
              <h2 className="shoujin-font text-4xl text-[#a22121] tracking-[0.3em]">成就历程 · 墨迹回望</h2>
              <div className="text-[10px] text-[#8b4513] opacity-40 tracking-[0.5em] uppercase font-bold">Chronicle of Echoes</div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="shoujin-font text-xl text-[#8b4513] opacity-60 tracking-[0.3em] hidden lg:block">“朝碧海而暮苍梧”</div>
              <button 
                onClick={() => setShowHistory(false)}
                className="group relative flex items-center justify-center"
              >
                <div className="px-6 py-2 border border-[#a22121] text-[#a22121] shoujin-font text-xl hover:bg-[#a22121] hover:text-white transition-all shadow-md active:scale-95 bg-white/50">
                  返笺续墨
                </div>
                {/* Subtle seal-like decoration on button */}
                <div className="absolute -right-2 -top-2 w-4 h-4 bg-[#a22121] opacity-20 rotate-45"></div>
              </button>
            </div>
          </div>
          
          <div className="relative flex-1 overflow-y-auto custom-scrollbar pr-6 space-y-10 z-10">
            {history.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center opacity-20">
                <Sparkles className="w-16 h-16 mb-6 text-[#a22121]" />
                <p className="shoujin-font text-3xl tracking-[0.5em]">尚无墨迹，待君续写</p>
              </div>
            ) : (
              history.map(entry => (
                <div key={entry.id} className="relative p-10 bg-white/30 border-l-2 border-[#a22121]/40 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-row-reverse">
                  {/* Delete Button */}
                  <button 
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="absolute top-4 left-4 p-2 text-[#a22121] opacity-0 group-hover:opacity-40 hover:opacity-100 transition-all z-20"
                    title="删除此迹"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Subtle background text for each entry */}
                  <div className="absolute top-2 right-4 text-[8px] text-[#8b4513] opacity-30 font-serif">
                    {formatDate(entry.timestamp)}
                  </div>
                  <div className="text-2xl md:text-3xl leading-[2.2] text-[#1a1a1a] writing-vertical tracking-[0.2em] h-64 overflow-x-auto custom-scrollbar-h py-2 shoujin-font flex-1">
                    {entry.content}
                  </div>
                  {/* Decorative seal for each entry */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 border border-[#a22121]/30 text-[#a22121]/30 flex items-center justify-center font-['Ma_Shan_Zheng'] text-[10px] rotate-12">
                    迹
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-10 pt-6 border-t border-[#d4af37]/10 text-center shrink-0 z-10 flex justify-between items-end">
            <div className="w-24"></div> {/* Spacer */}
            <p className="shoujin-font text-lg text-[#8b4513] opacity-40 tracking-[0.8em] uppercase">The Epic Odyssey of Xu Xiake</p>
            
            {/* Certificate Gallery Button */}
            <div className="relative">
              <button 
                onClick={() => setShowCertGallery(!showCertGallery)}
                className="group flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 border border-[#a22121] rounded-sm flex items-center justify-center text-[#a22121] shoujin-font text-xs hover:bg-[#a22121] hover:text-white transition-all shadow-sm bg-white/40">
                  同路<br/>证
                </div>
                <span className="text-[8px] text-[#a22121] opacity-40 tracking-widest">查看凭证</span>
              </button>
              
              {/* Simple Gallery Dropup */}
              <AnimatePresence>
                {showCertGallery && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-full right-0 mb-4 w-48 bg-[#fdfaf5] border border-[#d4af37]/30 shadow-2xl p-4 z-50 max-h-64 overflow-y-auto custom-scrollbar"
                  >
                    <div className="shoujin-font text-sm text-[#a22121] border-b border-[#a22121]/10 pb-2 mb-2 text-center">已获凭证</div>
                    {certificates.length === 0 ? (
                      <div className="text-[10px] text-gray-400 text-center py-4">尚无凭证</div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {certificates.map((cert, idx) => (
                          <button 
                            key={idx}
                            onClick={() => {
                              setCurrentCertificateData(cert);
                              setShowCertificate(true);
                              setShowCertGallery(false);
                            }}
                            className="aspect-square bg-[#a22121]/5 border border-[#a22121]/20 flex items-center justify-center hover:bg-[#a22121]/10 transition-colors"
                          >
                            <div className="shoujin-font text-[10px] text-[#a22121] writing-vertical">
                              凭证 {cert.entryCount}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {currentCertificateData && (
        <TongluZhengModal 
          isOpen={showCertificate}
          onClose={() => setShowCertificate(false)}
          quote={currentCertificateData.quote}
          matchedLocations={currentCertificateData.matchedLocations}
          entryCount={currentCertificateData.entryCount}
        />
      )}

      <style>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a22121;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default EchoesView;
