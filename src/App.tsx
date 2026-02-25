import React, { useState, useEffect, useRef } from 'react';
import { TRAVEL_DATA } from './constants';
import InfoPanel from './components/InfoPanel';
import InkTrail from './components/InkTrail';
import ParallaxMountains from './components/ParallaxMountains';
import BiographyView from './components/BiographyView';
import CursorInkTrail from './components/CursorInkTrail';
import ModernGuideModal from './components/ModernGuideModal';
import EchoesView from './components/EchoesView';
import MapNode from './components/MapNode';
import { MapPin, BookOpenText } from 'lucide-react';

type SceneType = 'start' | 'quote' | 'map' | 'biography' | 'echoes';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [stampedIndices, setStampedIndices] = useState<number[]>([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scene, setScene] = useState<SceneType>('start');
  const [isFinished, setIsFinished] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollLeft = useRef(0);
  const scrollTimeout = useRef<any>(null);

  useEffect(() => {
    let rafId: number;
    let lastTime = Date.now();

    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const now = Date.now();
      if (now - lastTime < 16) return; // Limit to ~60fps
      lastTime = now;

      const currentScroll = scrollRef.current.scrollLeft;
      const speed = Math.abs(currentScroll - lastScrollLeft.current);
      
      // Use requestAnimationFrame for smoother updates
      rafId = requestAnimationFrame(() => {
        setScrollSpeed(speed);
        setScrollLeft(currentScroll);
        lastScrollLeft.current = currentScroll;
      });

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setScrollSpeed(0);
      }, 150);
    };

    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (scrollEl) scrollEl.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scene]);
  
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLDivElement>(null);
  const enterBtnRef = useRef<HTMLButtonElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);
  const birdGroupRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap) return;

    if (scene === 'biography') {
      document.body.classList.remove('locked');
    } else {
      document.body.classList.add('locked');
    }

    if (scene === 'start') {
      const tl = gsap.timeline();
      tl.to(mountainRef.current, { opacity: 0.15, filter: "blur(0px)", y: -30, duration: 4, ease: "power2.out" }, 0.5)
        .to(mainTitleRef.current, { opacity: 1, y: 0, filter: "blur(0px)", duration: 3, ease: "expo.out" }, 1.5)
        .to(sealRef.current, { opacity: 0.8, scale: 1, rotation: -12, duration: 2, ease: "back.out(1.7)" }, "-=1.5")
        .to(subTitleRef.current, { opacity: 0.6, y: 0, duration: 2, ease: "power2.out" }, "-=1.5")
        .to(enterBtnRef.current, { opacity: 1, y: 0, duration: 1.5 }, "-=0.5");

      const birds = birdGroupRef.current?.children;
      if (birds) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2 - 50;

        Array.from(birds).forEach((bird, i) => {
          // 燕子比例：再次放大一倍
          // 基础 scale 从 0.5 提升至 1.0，范围从 0.7 提升至 1.4
          const randomScale = 1.0 + Math.random() * 0.4;
          const randomDuration = 4 + Math.random() * 4;
          const randomOpacity = 0.5 + Math.random() * 0.4;
          
          gsap.fromTo(bird, 
            { 
              x: centerX + (Math.random() - 0.5) * 600, 
              y: centerY + (Math.random() - 0.5) * 300, 
              opacity: 0, 
              scale: randomScale,
              filter: `blur(${Math.random() * 0.1}px)` 
            },
            { 
              x: `+=${(Math.random() - 0.5) * 300}`,
              y: `+=${(Math.random() - 0.5) * 200}`,
              opacity: randomOpacity, 
              duration: randomDuration, 
              repeat: -1, 
              yoyo: true,
              delay: i * 0.4, 
              ease: "sine.inOut" 
            }
          );

          // 翅膀扇动效果：通过缩放 Y 轴模拟
          gsap.to(bird, {
            scaleY: randomScale * 0.5,
            duration: 0.3 + Math.random() * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }
    }
  }, [scene]);

  const playBGM = () => {
    const audio = document.getElementById('bgm') as HTMLAudioElement;
    if (audio) {
      audio.volume = 0.3;
      audio.play().catch(e => console.log("音频播放需交互触发"));
    }
  };

  const createFlake = (x: number, y: number, index: number) => {
    const flake = document.createElement('div');
    flake.className = 'paper-flake';
    let size = (index % 5 === 0) ? Math.random() * 4 + 6 : Math.random() * 2 + 1;
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;
    flake.style.left = `${x}px`;
    flake.style.top = `${y}px`;
    flake.style.willChange = 'transform, opacity';
    
    const paperColors = ['#f4f1ea', '#e5e0d4', '#fcfaf2'];
    const inkColors = ['#1a1a1a', '#333333'];
    flake.style.backgroundColor = (index % 8 === 0) ? inkColors[Math.floor(Math.random() * inkColors.length)] : paperColors[Math.floor(Math.random() * paperColors.length)];
    
    const r1 = Math.random() * 50 + 20;
    const r2 = Math.random() * 50 + 20;
    flake.style.borderRadius = `${r1}% ${100-r1}% ${r2}% ${100-r2}%`;
    document.body.appendChild(flake);

    const gsap = (window as any).gsap;
    if (gsap) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 500 + 200;
      gsap.to(flake, { 
        x: Math.cos(angle) * velocity, 
        y: Math.sin(angle) * velocity, 
        rotation: Math.random() * 360, 
        opacity: 0, 
        scale: 0.2, 
        duration: 1.5, 
        ease: "power2.out", 
        onComplete: () => flake.remove() 
      });
    }
  };

  const enterWorld = () => {
    const gsap = (window as any).gsap;
    if (!gsap) return;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const bigSplash = document.createElement('div');
    bigSplash.style.position = 'fixed';
    bigSplash.style.top = '50%';
    bigSplash.style.left = '50%';
    bigSplash.style.width = '100px';
    bigSplash.style.height = '100px';
    bigSplash.style.backgroundColor = '#1a1a1a';
    bigSplash.style.borderRadius = '50%';
    bigSplash.style.zIndex = '3000';
    bigSplash.style.transform = 'translate(-50%, -50%) scale(0)';
    bigSplash.style.willChange = 'transform';
    document.body.appendChild(bigSplash);
    
    const masterTL = gsap.timeline();
    
    masterTL.to(bigSplash, { scale: 100, duration: 1.2, ease: "power4.inOut" }, 0)
      .add(() => { 
        for (let i = 0; i < 80; i++) {
          createFlake(centerX, centerY, i);
        }
      }, 0.1)
      .add(() => { setScene('quote'); bigSplash.remove(); }, "-=0.2")
      .add(() => {
        gsap.to(".quote-line", { 
          opacity: 1, 
          filter: "blur(0px)", 
          y: 0, 
          duration: 2, 
          stagger: 0.6, 
          ease: "power2.out" 
        });
      }, "+=0.1")
      .add(() => {
        gsap.to(".quote-container", { 
          opacity: 0, 
          duration: 1.5, 
          ease: "power2.inOut", 
          delay: 3, 
          onComplete: () => {
            setScene('map');
            playBGM();
            setTimeout(() => setIsPanelOpen(true), 800);
          }
        });
      });
  };

  const handleNodeClick = (index: number) => {
    if (index <= unlockedCount) {
      setCurrentStep(index);
      setIsPanelOpen(true);
      scrollToNode(index);
    }
  };

  const scrollToNode = (index: number) => {
    if (scrollRef.current) {
        const x = TRAVEL_DATA[index].coordinates.x * 30;
        scrollRef.current.scrollTo({ left: x - (window.innerWidth / 2), behavior: 'smooth' });
      }
  };

  const handleNext = () => {
    const gsap = (window as any).gsap;
    const nextStep = currentStep + 1;
    const currentIdx = currentStep;

    setIsPanelOpen(false);

    setTimeout(() => {
      if (!stampedIndices.includes(currentIdx)) {
        setStampedIndices(prev => [...prev, currentIdx]);
        
        const sealId = `seal-${currentIdx}`;
        setTimeout(() => {
          const sealEl = document.getElementById(sealId);
          if (sealEl && gsap) {
            gsap.fromTo(sealEl, 
              { scale: 5, opacity: 0, filter: 'blur(8px)' }, 
              { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.4, ease: "power2.out" }
            );
          }
        }, 50);
      }

      if (nextStep < TRAVEL_DATA.length) {
        setTimeout(() => {
          setUnlockedCount(Math.max(unlockedCount, nextStep));
          setCurrentStep(nextStep);
          scrollToNode(nextStep);
          setTimeout(() => setIsPanelOpen(true), 1500);
        }, 600);
      } else {
        setTimeout(() => setIsFinished(true), 1000);
      }
    }, 400);
  };

  const skipTravel = () => {
    const lastIndex = TRAVEL_DATA.length - 1;
    setIsPanelOpen(false);
    const allIndices = TRAVEL_DATA.map((_, i) => i);
    setStampedIndices(allIndices);
    setUnlockedCount(lastIndex);
    setCurrentStep(lastIndex);
    setIsFinished(true);
    scrollToNode(lastIndex);
  };

  const handleFinish = () => {
    const gsap = (window as any).gsap;
    if (!gsap) return;
    const tl = gsap.timeline();
    tl.to("#ink-transition", { transformOrigin: "top", scaleY: 1, duration: 1.2, ease: "power4.inOut" })
      .add(() => {
        setScene('biography');
        gsap.to("#ink-transition", { transformOrigin: "bottom", scaleY: 0, duration: 1.2, ease: "power4.inOut", delay: 0.2 });
      });
  };

  const toggleToc = () => {
    setIsTocOpen(!isTocOpen);
  };

  useEffect(() => {
    const handleGlobalDoubleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const rotation = (Math.random() - 0.5) * 40;
      const sealTexts = ['霞客', '游踪', '墨游', '万里', '同路'];
      const randomText = sealTexts[Math.floor(Math.random() * sealTexts.length)];
      
      const seal = document.createElement('div');
      seal.className = 'global-seal';
      seal.style.left = `${x - 40}px`;
      seal.style.top = `${y - 40}px`;
      seal.style.setProperty('--seal-rot', `${rotation}deg`);
      seal.innerText = randomText;
      
      document.body.appendChild(seal);
      
      setTimeout(() => {
        seal.remove();
      }, 5000);
    };

    window.addEventListener('dblclick', handleGlobalDoubleClick);
    return () => window.removeEventListener('dblclick', handleGlobalDoubleClick);
  }, []);

  return (
    <div 
      className="relative w-screen h-screen bg-[#f4f1ea] flex flex-col overflow-hidden"
    >
      <CursorInkTrail />

      {scene === 'start' && (
        <div className="ink-landscape-bg">
          <div ref={mountainRef} className="ink-mountain"></div>
          <div ref={birdGroupRef} className="absolute inset-0 pointer-events-none z-30">
            {/* 燕子：数量控制在8只，确保绝对定位和可见度 */}
            {Array.from({ length: 8 }).map((_, i) => (
              <svg key={i} className="bird-svg absolute" viewBox="0 0 100 40" style={{ fill: 'none', stroke: '#1a1a1a', strokeWidth: 6, strokeLinecap: 'round', width: '80px', height: '32px' }}>
                <path d="M10,25 Q30,5 50,25 Q70,5 90,25" />
              </svg>
            ))}
          </div>
          
          {/* Top-right Corner Seal */}
          <div 
            ref={sealRef}
            className="fixed top-12 right-12 w-16 h-16 md:w-20 md:h-20 border-2 border-[#a22121] text-[#a22121] shoujin-font text-2xl md:text-3xl flex items-center justify-center rotate-[-12deg] opacity-0 scale-150 shadow-inner bg-[#a22121]/5 z-30"
          >
            霞客<br/>印
          </div>

          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
            <div className="text-center relative flex flex-col items-center">
              <h1 ref={mainTitleRef} className="text-5xl md:text-[6.5rem] brush-font text-[#1a1a1a] tracking-[10px] md:tracking-[20px] m-0 opacity-0 translate-y-[40px] blur-[15px] ink-bleed-text whitespace-nowrap">墨游万里 · 霞客行</h1>
              <div ref={subTitleRef} className="text-lg md:text-[1.5rem] text-[#8a8a8a] font-serif tracking-[15px] md:tracking-[25px] mt-8 opacity-0 translate-y-[20px] uppercase font-bold" style={{ paddingLeft: '25px' }}>The Epic Odyssey of Xu Xiake</div>
              
              {/* Decorative Line */}
              <div className="w-32 h-px bg-[#1a1a1a]/20 mt-12"></div>
            </div>
            <button ref={enterBtnRef} onClick={enterWorld} className="mt-[80px] px-[60px] py-[16px] text-3xl md:text-[2rem] text-[#9d2919] border-2 border-[#9d2919]/30 bg-white/10 backdrop-blur-[2px] cursor-pointer tracking-[20px] opacity-0 translate-y-[30px] transition-all duration-700 hover:bg-[#9d2919] hover:text-white hover:scale-110 hover:shadow-[0_30px_90px_rgba(157,41,25,0.3)] brush-font relative overflow-hidden group">
              <span className="relative z-10">入 画</span>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </button>
          </div>
        </div>
      )}

      {scene === 'quote' && (
        <div className="quote-container fixed inset-0 z-[4000] bg-[#f4f1ea] flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
           <div className="flex flex-row-reverse items-center justify-center gap-16 md:gap-24 h-full max-h-[70vh]">
              <div className="quote-line opacity-0 translate-y-6 blur-md brush-font text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[0.6em] writing-vertical leading-tight whitespace-nowrap">
                癸丑之三月晦，
              </div>
              <div className="quote-line opacity-0 translate-y-6 blur-md brush-font text-[#1a1a1a] text-3xl md:text-4xl lg:text-5xl tracking-[0.6em] writing-vertical leading-tight whitespace-nowrap">
                自宁海出西海门。
              </div>
           </div>
        </div>
      )}

      {scene === 'biography' && (
        <BiographyView 
          onBack={() => {
            setIsFinished(false); 
            setScene('map');
          }} 
          onRestart={() => setScene('start')}
          onGoToEchoes={() => setScene('echoes')}
        />
      )}

      {scene === 'echoes' && (
        <EchoesView onBack={() => setScene('biography')} />
      )}

      {scene === 'map' && (
        <div className="flex-1 flex flex-col z-10 animate-in fade-in duration-1000">
          <header className="absolute top-0 left-0 w-full p-12 flex justify-between items-start z-40">
            <div className="flex flex-col">
              <h1 className="text-6xl shoujin-font text-[#1a1a1a] drop-shadow-sm tracking-widest">墨游万里 · 霞客行</h1>
              <span className="text-[11px] tracking-[0.5em] text-[#8b4513] font-bold uppercase mt-3 opacity-60">Interactive Chronicle of Xu Xiake's Historical Travels</span>
            </div>
            
            <div className="flex flex-row items-start gap-8">
              <div className="flex flex-col items-center">
                <div 
                  onClick={toggleToc}
                  className="toc-toggle-btn"
                >
                  <div className="label">
                    <span>行旅名录</span>
                    <BookOpenText className={`w-4 h-4 transition-transform duration-500 ${isTocOpen ? 'scale-110' : ''}`} />
                  </div>
                  <div className={`w-px h-8 bg-[#d4af37]/40 mt-1 transition-all duration-500 ${isTocOpen ? 'h-12' : 'h-8'}`}></div>
                </div>
              </div>

              <div className="hidden md:block text-right">
                <div className="inline-block p-4 text-2xl shoujin-font text-[#a22121] border-[#a22121] border-4 rotate-[-4deg] shadow-lg bg-white/10">崇祯<br/>游记</div>
              </div>
            </div>
          </header>

          <div className={`toc-panel custom-scrollbar ${isTocOpen ? '' : 'closed'}`}>
             {TRAVEL_DATA.map((node, index) => {
               const isUnlocked = index <= unlockedCount;
               const isCurrent = index === currentStep;
               return (
                 <div 
                  key={`toc-${node.id}`}
                  onClick={() => {
                    if (isUnlocked) {
                      handleNodeClick(index);
                      setIsTocOpen(false);
                    }
                  }}
                  className={`toc-item ${isCurrent ? 'active' : ''} ${!isUnlocked ? 'opacity-20 grayscale' : 'opacity-100'}`}
                 >
                   <span className={`toc-province ${isCurrent ? 'active' : ''}`}>{node.location}</span>
                   {stampedIndices.includes(index) && <div className="toc-seal-mini">踪</div>}
                 </div>
               );
             })}
          </div>

          <div ref={scrollRef} className="flex-1 overflow-x-auto overflow-y-hidden relative select-none cursor-grab active:cursor-grabbing py-24 custom-scrollbar">
            <div className="w-[3000px] h-full relative flex items-center">
              <ParallaxMountains scrollLeft={scrollLeft} />
              <InkTrail nodes={TRAVEL_DATA} unlockedCount={unlockedCount} scrollSpeed={scrollSpeed} />

              {TRAVEL_DATA.map((node, index) => (
                <MapNode
                  key={node.id}
                  node={node}
                  index={index}
                  isUnlocked={index <= unlockedCount}
                  isActive={index === currentStep}
                  isStamped={stampedIndices.includes(index)}
                  onNodeClick={handleNodeClick}
                />
              ))}
            </div>
          </div>

          {isFinished && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#f4f1ea]/70 backdrop-blur-md animate-in fade-in duration-700">
              <div className="relative bg-[#fdfcf8] p-16 md:p-24 shadow-[0_40px_100px_rgba(0,0,0,0.2)] ripped-edge border-l-[20px] border-[#1a1a1a] flex flex-col items-center gap-12">
                <h3 className="text-5xl md:text-6xl shoujin-font text-[#1a1a1a] tracking-[0.5em] mb-4">万里征途 · 终入史册</h3>
                <button onClick={handleFinish} className="px-16 py-6 bg-[#1a1a1a] text-[#f2ede4] text-3xl shoujin-font tracking-[0.6em] transition-all hover:scale-110 hover:bg-black hover:shadow-2xl active:scale-95">掩卷 · 回望一生</button>
              </div>
            </div>
          )}

          <InfoPanel 
            node={TRAVEL_DATA[currentStep]} 
            isOpen={isPanelOpen} 
            onNext={handleNext} 
            onClose={() => setIsPanelOpen(false)}
            onOpenGuide={() => setIsGuideOpen(true)}
            isLast={currentStep === TRAVEL_DATA.length - 1} 
          />

          <ModernGuideModal 
            node={TRAVEL_DATA[currentStep]} 
            isOpen={isGuideOpen} 
            onClose={() => setIsGuideOpen(false)} 
          />
        </div>
      )}

      {scene === 'map' && !isFinished && (
        <button onClick={skipTravel} className="fixed bottom-10 right-10 z-[100] text-[10px] text-[#1a1a1a] font-serif tracking-[0.3em] uppercase opacity-60 hover:opacity-100 transition-all border-b border-[#1a1a1a]/20 hover:border-[#1a1a1a] pb-0.5">跳过此程</button>
      )}

      {scene === 'map' && (
        <div className="fixed bottom-0 left-0 w-full p-8 z-40 bg-gradient-to-t from-black/5 to-transparent">
          <div className="max-w-2xl mx-auto flex items-center gap-6">
            <span className="text-[11px] font-serif font-bold text-[#8b4513] uppercase tracking-[0.2em] opacity-40">CHRONICLE PROGRESS</span>
            <div className="flex-1 h-[2px] bg-[#d4cfc1] relative overflow-hidden">
              <div className="absolute left-0 top-0 h-full bg-[#a22121] transition-all duration-1500" style={{ width: `${((unlockedCount + 1) / TRAVEL_DATA.length) * 100}%` }} />
            </div>
            <div className="shoujin-font text-2xl text-[#a22121] min-w-[80px] text-right">{unlockedCount + 1} <span className="text-sm opacity-50 mx-1">/</span> {TRAVEL_DATA.length}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;