import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, User, Book, Users, ScrollText, Sparkles } from 'lucide-react';

interface BioDetail {
  id: string;
  tag: string;
  note: string;
}

interface BioStage {
  id: string;
  year: string;
  title: string;
  summary: string;
  details: BioDetail[];
}

const BIO_STAGES: BioStage[] = [
  {
    id: 'stage-1',
    year: '1587',
    title: '志在苍梧',
    summary: '明万历十五年，徐霞客出生于南直隶江阴一个底蕴深厚的书香世家。梧塍徐氏历代好学，家藏万卷地理方志与秦汉古籍。少年时代的霞客，终日浸润在这些枯燥却奇诡的文献中，当同龄人还在苦背八股文以求仕途功名时，他却对山川形胜产生了近乎痴迷的渴望。这种“不屑科举”的特立独行，在当时的士大夫社会显得格格不入，却也让他免受封建官场的束缚。他在日后的游记中曾自述：“大丈夫当朝碧海而暮苍梧”，这股气概正是在江阴那间充满墨香的藏书楼里悄然成长的。\n\n其母王氏，是一位极具格局的奇女子。在霞客因父亲早逝、家庭重担而犹豫是否该远游时，王氏不仅未将其留在膝下，反而亲手缝制了一顶“远游冠”，在江边亲手为他戴上。她勉励道：“志在四方，男子事也。徒守床榻，非吾志也。”这番超越时代的叮咛，成了霞客余生三十年孤身行走的精神支柱。从此，一个瘦弱的背影，头戴母亲缝制的长冠，手拄青竹杖，踏出了改变中国地理学史的第一步。',
    details: [
      { id: 'n1-1', tag: '远游冠', note: '由徐母亲手缝制，象征了母亲对儿子探索理想的坚定支持。' },
      { id: 'n1-2', tag: '梧塍徐氏', note: '江阴名门，家学深厚，藏书万卷，为其提供了最初的学术养分。' },
      { id: 'n1-3', tag: '不屑科举', note: '毅然放弃仕途功名，实现了从儒生到科学家的身份跨越。' }
    ]
  },
  {
    id: 'stage-2',
    year: '1613-1633',
    title: '独步寰宇',
    summary: '在长达二十年的壮游岁月中，徐霞客的足迹如墨迹般洇染了大半个中国。他不再只是山水的赏鉴者，而是一个手持量尺的测量员。此时的他，已练就了惊人的野外生存意志：他曾两度攀登黄山，在天都峰的危崖上记录下云海的变幻，断言“薄海内外无如徽之黄山”。在福建武夷山的红岩间，他记录下丹霞地貌的独特构造；在山西五台山的飞雪中，他细心比对高海拔植物的分布差异。每一次记录，都是对古籍记载的一次“肉身验证”。\n\n然而，他最令世人震撼的壮举在于对长江源头的实证考求。自先秦《禹贡》以来，“岷山导江”之说被奉为不刊之论，千年间无人敢议。徐霞客凭借一双布满老茧的足，徒步深入荒无人烟的边陲荒原，通过对河道流量、流向及地势走向的实地比对，最终在《江源考》中写下振聋发聩的一句：“金沙江，实长江之正源也。”这一跨越千年的正名，比西方同类地理研究早了数个世纪。在二十年的风霜雨雪中，他曾数次遭遇强盗，几乎丧命，甚至绝粮断炊，但他对大地的赤诚从未消减，笔下的文字已不再是文人雅士的感伤，而是大地真实跳动的脉搏。',
    details: [
      { id: 'n2-1', tag: '长江溯源', note: '实地探寻明确提出金沙江为长江之源，纠正了流传千年的地理误读。' },
      { id: 'n2-2', tag: '实证精神', note: '不唯书、不唯上。他确立了现代地理考察的实地范式。' },
      { id: 'n2-3', tag: '地志考经', note: '不仅记录山水，更考证沿途气候与植被，将自然与人文交织。' }
    ]
  },
  {
    id: 'stage-3',
    year: '1636-1640',
    title: '绝笔西南',
    summary: '五十岁那年，徐霞客开启了生命中最辉煌也最惨烈的“万里遐征”。这不仅是一场旅行，更是一场与死亡赛跑的科学抢救。在云贵高原那片被主流文明遗忘的秘境，他面对奇诡的峰林与幽深的溶洞，进行了中国历史上第一次系统性的岩溶（喀斯特）地貌归纳。他冒着生命危险垂降进入深不见底的溶洞，详细记录了钟乳石的成因与地下河的流向。其精细程度令百年后的中外地质学家惊叹不已。\n\n这条路也是布满荆棘的血泪之路。随行僧侣静闻在半路因病圆寂，霞客在极度悲痛中履行了誓言，背负友人的遗骨，冒着兵荒马乱与丛林瘴气，历经万难将其安葬于大理鸡足山。晚年的霞客双足俱废，无法行走，却依然在摇曳的烛火下整理那本凝聚了一生心血的六十余万字巨著——《徐霞客游记》。他在故乡的病榻上平静地感叹：“汉之张骞，唐之玄奘，元之耶律楚材，皆受命前往。我一介布衣，孤身万里，亦不负此生。”崇祯十四年，这位伟大的探索者离世，他留给世界的不仅是地理知识，更是一个布衣之躯对真理至死不渝的浪漫主义绝响。',
    details: [
      { id: 'n3-1', tag: '岩溶之祖', note: '系统分类并描述了喀斯特地貌，领先西方同类研究百余年。' },
      { id: 'n3-2', tag: '绝笔西南', note: '晚年在病榻上整理游记，此书成了他生命的最后回响。' },
      { id: 'n3-3', tag: '重情重义', note: '背负静闻骨灰至鸡足山，体现了其坚韧、重义的人格魅力。' }
    ]
  },
  {
    id: 'stage-4',
    year: '公元1587-1641',
    title: '大明布衣 · 人物志',
    summary: '徐弘祖，字振之，号霞客，明代杰出的地理学家、旅行家。他生于晚明那个动荡却又充满个性张力的时代，以布衣之身，凭一双铁脚板，在三十年间踏遍了当时大明版图内的十六个省份。他所做的一切，既不是为了求仙问道，也不是为了猎奇搜异，而是出于一种近乎本能的对真理的追逐。这种精神被梁启超誉为“科学精神的萌芽”，在明末沉闷的学风中如同一道惊雷，劈开了中国近代地理学的序幕。',
    details: [
      { 
        id: 'n4-1', 
        tag: '姓名 · 籍贯 · 祖系', 
        note: '徐霞客，名弘祖，字振之。名“弘祖”寄托了其父徐豫庵光弘祖德、恪守家风的厚望；而字“振之”，则寓意振兴家声，在明末士人阶层中显得尤为不俗。至于世人皆知的“霞客”之号，并非自封，而是由晚明文坛领袖、挚友陈继儒（眉公）所赠。眉公见其生平酷爱霞光美景，身如行云，心若长虹，遂赞其为“霞客”。徐霞客出生于南直隶常州府江阴县（今江苏江阴）的一个豪门世家——梧塍徐氏。该家族自元末明初便在江南极具名望，曾出过不少饱学之士。然而到了霞客祖父一代，家族虽在政治上逐渐边缘化，却积攒了富可敌国的家藏图书。霞客生于万历十五年正月初五，这一年被后世史学家黄仁宇视为大明帝国走向颓势的转折点。在这样一个视科举为登天阶梯的年代，徐霞客却在满屋的秦汉简牍与地理方志中，找到了自己灵魂的寄托。他自幼便对《山海经》、《水经注》爱不释手，甚至在梦中也常游历于名山大川。江阴这片温婉的水乡地貌，赋予了他细腻的观察力，但也让他骨子里生出了一种不屈于纲常的逆骨，使他最终毅然舍弃了仕途，将一生奉献给了那片未被前人足迹覆盖的荒原与峰峦。' 
      },
      { 
        id: 'n4-2', 
        tag: '至亲 · 挚友 · 羁绊', 
        note: '徐霞客的一生，虽然大部分时间是孤身在野外求索，但其身后却有着几位精神上的巨擘在支撑。首先是他的母亲王氏。在徐父早逝、家业中落的困境下，王氏展现了超脱时代的母仪。当霞客因挂念老母而不敢远游时，八十高龄的王氏竟亲手缝制了一顶“远游冠”，在江边亲手为他戴上，并勉励道：“志在四方，男子事也。徒守床榻，非吾志也。”甚至在晚年，王氏还陪同霞客游览家乡名胜，以此示意自己身体康健，宽解儿子的离忧。这种超越了传统礼教的深明大义，是《游记》得以问世的最温情的底色。而在友谊方面，他与晚明大儒陈继儒、黄道周有着高山流水般的交情。黄道周曾评价其为“千古奇人”，在霞客晚年病重回乡后，多次致信慰问，并在其离世后亲笔撰写了悲怆而磅礴的《徐霞客墓志铭》。除此之外，最令人动容的是他与随行僧侣静闻的“生死契约”。静闻本欲前往大理鸡足山供奉金字经书，却不幸染病于广西。霞客在其圆寂后，不忍友人的遗愿成空，在兵荒马乱与盗贼横行的极度危险中，竟然背负着静闻的遗骨行走千里，翻山越岭，历时数载将其安葬在鸡足山巅。这种跨越生死的道义与侠情，不仅证明了徐霞客是一位地理学家，更是一位骨髓里流淌着侠义之血的纯粹文人。' 
      },
      { 
        id: 'n4-3', 
        tag: '万世巨著 · 后世回响', 
        note: '《徐霞客游记》是一部用生命丈量、用血墨书写的六十万字科学史诗。它不仅是中国古代最伟大的地理学文献，更是世界近代科学考察的先驱。全书详细记录了霞客三十余年间对十六个行省的实地调研。其中最卓越的科学贡献，莫过于对喀斯特地貌（岩溶地貌）的精确界定与分类。他在广西、云贵等石灰岩发育地带考察了数百个溶洞，详尽地描述了石钟乳、石笋的形态、成因及分布规律，其论断领先西方同类研究近一个半世纪。在水文学领域，他通过艰苦的攀登与实地测量，明确指出金沙江才是长江的真正源头，一举推翻了被尊为圣经的《禹贡》中关于“岷山导江”的千年谬误，实现了中国地理学从“训肂求实”向“实地验证”的革命性飞跃。晚年的徐霞客双足俱废，依然在烛火下由好友季梦良协助，整理那堆被风霜侵蚀的残稿。虽然原文在明末乱世中散佚不少，但留下的篇章足以震撼后世。清初文坛盟主钱谦益在读完游记后，惊叹此书为“世间真命题，大地的史诗”，称霞客为“人中龙凤”。时至今日，徐霞客已被联合国教科文组织列为世界科学文化名人，他的生日5月19日更被定为“中国旅游日”。这本游记已超越了文学或工具书的范畴，它成为了中华民族勇于探索未知、挑战极限的永恒精神图腾，照亮了后世每一个在寻找真理路上的行路人。' 
      }
    ]
  }
];

interface BiographyViewProps {
  onBack: () => void;
  onRestart: () => void;
  onGoToEchoes: () => void;
}

const BiographyView: React.FC<BiographyViewProps> = ({ onBack, onRestart, onGoToEchoes }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeDetailId, setActiveDetailId] = useState<string | null>(null);
  const isScrolling = useRef(false);

  const handleExitToMap = () => {
    const gsap = (window as any).gsap;
    if (!gsap) {
      onBack();
      return;
    }
    const tl = gsap.timeline();
    tl.to("#ink-transition", { transformOrigin: "top", scaleY: 1, duration: 0.8, ease: "power4.inOut" })
      .add(() => {
        onBack();
      })
      .to("#ink-transition", { transformOrigin: "bottom", scaleY: 0, duration: 0.8, ease: "power4.inOut", delay: 0.2 });
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 40) return;

      isScrolling.current = true;
      if (delta > 0) {
        setActiveIndex(prev => Math.min(prev + 1, BIO_STAGES.length - 1));
      } else {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
      setActiveDetailId(null);
      setTimeout(() => { isScrolling.current = false; }, 800);
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const handleTouchStart = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { handleTouchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const deltaX = handleTouchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(deltaX) > 60) {
      if (deltaX > 0) setActiveIndex(prev => Math.min(prev + 1, BIO_STAGES.length - 1));
      else setActiveIndex(prev => Math.max(prev - 1, 0));
      setActiveDetailId(null);
    }
  };

  const isProfileMode = activeIndex === BIO_STAGES.length - 1;

  return (
    <div 
      className={`relative w-screen h-screen overflow-hidden transition-colors duration-1000 shoujin-font ${isProfileMode ? 'bg-[#edeae2]' : 'bg-[#f4f1ea]'}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        .stage-stage {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 15%;
          transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .stage-stage.profile-active {
          padding-right: 5%;
          justify-content: center;
        }
        .stage-card-wrap {
          position: absolute;
          transition: all 1.2s cubic-bezier(0.25, 1, 0.5, 1);
          transform-origin: center right;
          z-index: 10;
        }
        .stage-card {
          width: 620px;
          height: 720px;
          background: #fffdf9;
          box-shadow: 0 30px 80px rgba(0,0,0,0.1);
          border-right: 12px solid #c5a059;
          border-left: 1px solid #d4cfbe;
          display: flex;
          overflow: hidden;
          transition: all 0.8s;
          position: relative;
        }
        .stage-card.profile-card {
          width: 85vw;
          height: 85vh;
          border-right: 20px solid #8b0000;
          background-image: radial-gradient(#d4af37 0.5px, transparent 0), linear-gradient(to bottom, #fffdf9, #fcfaf2);
          background-size: 30px 30px, 100% 100%;
        }
        .stage-card.inactive {
          filter: grayscale(100%) opacity(0.2);
          transform: scale(0.6);
          pointer-events: none;
        }
        .stage-card.active {
          filter: none;
          opacity: 1;
          transform: scale(1);
          box-shadow: 0 50px 140px rgba(139,0,0,0.2);
        }
        .tag-strip {
          width: 65px;
          background: #fdfaf0;
          border-right: 1px solid #eeebe1;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 40px;
          gap: 20px;
        }
        .cinnabar-tag {
          writing-mode: vertical-rl;
          background: #b22222;
          color: white;
          padding: 16px 8px;
          font-family: 'Ma Shan Zheng', cursive;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.4s;
          box-shadow: 3px 3px 8px rgba(0,0,0,0.3);
          border-radius: 2px;
        }
        .cinnabar-tag.active { background: #d4af37; transform: translateX(8px) scale(1.05); }
        .profile-content {
          display: flex;
          width: 100%;
          height: 100%;
          padding: 60px;
          gap: 60px;
        }
        .profile-title-col {
           writing-mode: vertical-rl;
           display: flex;
           flex-direction: column;
           gap: 20px;
        }
        .seal-decoration {
           width: 84px;
           height: 84px;
           border: 4px solid #a22121;
           color: #a22121;
           display: flex;
           align-items: center;
           justify-content: center;
           font-family: 'Ma Shan Zheng', cursive;
           font-size: 1.6rem;
           font-weight: bold;
           margin-bottom: 40px;
           padding: 4px;
           line-height: 1;
           text-align: center;
           background-color: rgba(162, 33, 33, 0.03);
           box-shadow: inset 0 0 10px rgba(162, 33, 33, 0.1);
           position: relative;
           overflow: hidden;
           writing-mode: vertical-rl;
           text-orientation: upright;
           /* 古代印章斑驳感 */
           background-image: url('https://www.transparenttextures.com/patterns/asfalt-dark.png');
           mix-blend-mode: multiply;
           filter: contrast(1.2) brightness(0.9);
        }
        .seal-decoration::after {
           content: '';
           position: absolute;
           inset: -6px;
           border: 1px solid rgba(178, 34, 34, 0.2);
           pointer-events: none;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #b22222; border-radius: 4px; }

        .golden-echo-btn {
          position: fixed;
          top: 32px;
          right: 32px;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: radial-gradient(circle at center, #d4af37 0%, #c5a059 100%);
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 150;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.3);
          border: 2px solid rgba(255, 255, 255, 0.4);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          animation: golden-glow 3s infinite alternate;
        }
        .golden-echo-btn:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.5);
        }
        .golden-echo-btn .icon-label {
          writing-mode: vertical-rl;
          font-family: 'Ma Shan Zheng', cursive;
          font-size: 1.1rem;
          letter-spacing: 2px;
          margin-top: 2px;
        }
        @keyframes golden-glow {
          0% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.4); }
          100% { box-shadow: 0 0 45px rgba(212, 175, 55, 0.7), 0 0 10px rgba(255, 255, 255, 0.5); }
        }
      `}</style>

      <button 
        onClick={handleExitToMap} 
        className="fixed top-8 left-8 px-6 py-3 bg-white/95 backdrop-blur-sm border border-black/20 shoujin-font text-2xl z-[100] hover:bg-black hover:text-white transition-all shadow-xl active:scale-95 group overflow-hidden"
      >
        <span className="relative z-10 tracking-[0.3em]">复 揽 江 山 长 卷</span>
        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
      </button>

      <button 
        onClick={onRestart}
        className="fixed bottom-6 right-8 text-[11px] shoujin-font text-gray-400/60 hover:text-gray-600 transition-all z-[100] tracking-[0.4em] uppercase px-4 py-2 hover:bg-black/5 rounded-sm"
      >
        掩 卷 · 回 望 一 生
      </button>

      {isProfileMode && (
        <button 
          onClick={onGoToEchoes}
          className="golden-echo-btn animate-in fade-in zoom-in duration-1000"
        >
          <Sparkles className="w-5 h-5 mb-1" />
          <span className="icon-label">古今回响</span>
        </button>
      )}

      <div className={`stage-stage ${isProfileMode ? 'profile-active' : ''}`}>
        {BIO_STAGES.map((stage, idx) => {
          const offset = idx - activeIndex;
          const isActive = idx === activeIndex;
          const isCharacterProfile = idx === BIO_STAGES.length - 1;
          
          let xPos = 0, yOffset = 0, zIndex = 50, rotate = 0;
          if (offset === 0) { xPos = 0; zIndex = 50; }
          else if (offset < 0) { xPos = offset * 260; yOffset = offset * 35; zIndex = 30 + offset; rotate = offset * 3; }
          else { xPos = offset * 1200; zIndex = 10; }

          return (
            <div key={stage.id} className="stage-card-wrap" style={{ transform: `translate(${xPos}px, ${yOffset}px) rotate(${rotate}deg)`, zIndex: zIndex, opacity: offset > 0 ? 0 : 1 }} onClick={() => { if (!isActive) { setActiveIndex(idx); setActiveDetailId(null); } }}>
              <div className={`stage-card ${isActive ? 'active' : 'inactive'} ${isCharacterProfile ? 'profile-card' : ''}`}>
                <div className="tag-strip">
                  {stage.details.map(detail => (
                    <div key={detail.id} className={`cinnabar-tag ${activeDetailId === detail.id ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); if (isActive) setActiveDetailId(activeDetailId === detail.id ? null : detail.id); }}>
                      {isCharacterProfile ? detail.tag.split(' · ')[0] : detail.tag}
                    </div>
                  ))}
                </div>

                {isCharacterProfile ? (
                  <div className="profile-content animate-in fade-in zoom-in-95 duration-1000">
                     <div className="profile-title-col">
                        <div className="seal-decoration">徐氏<br/>弘祖</div>
                        <h2 className="shoujin-font text-7xl text-[#1a1a1a] tracking-[0.2em] mb-4">大明布衣 · 人物志</h2>
                        <p className="shoujin-font text-2xl text-[#8b0000] opacity-60 tracking-widest mt-4">公元 1587 — 1641</p>
                     </div>
                     <div className="flex-1 flex flex-col">
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-10">
                           <div className="shoujin-font text-3xl text-[#1a1a1a] mb-8 border-b border-gray-200 pb-4 flex items-center gap-4">
                              <ScrollText className="w-8 h-8 text-[#8b0000]" />人物综述
                           </div>
                           <p className="text-2xl leading-[2.2] text-[#333] mb-12 indent-12 text-justify">{stage.summary}</p>
                           <div className="mt-6">
                              {activeDetailId ? (
                                <div className="p-10 bg-white/50 border-l-8 border-[#8b0000] shadow-xl animate-in fade-in slide-in-from-right-10 duration-700">
                                   <div className="shoujin-font text-4xl text-[#8b0000] mb-8 flex items-center gap-3">
                                      {activeDetailId === 'n4-1' && <User className="w-8 h-8" />}
                                      {activeDetailId === 'n4-2' && <Users className="w-8 h-8" />}
                                      {activeDetailId === 'n4-3' && <Book className="w-8 h-8" />}
                                      {stage.details.find(d => d.id === activeDetailId)?.tag}
                                   </div>
                                   <div className="text-xl leading-[2.4] text-gray-800 text-justify space-y-8">
                                      {stage.details.find(d => d.id === activeDetailId)?.note.split('\n').map((p, i) => <p key={i} className="indent-12">{p}</p>)}
                                   </div>
                                </div>
                              ) : (
                                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl opacity-40">
                                   <User className="w-16 h-16 mb-4 text-[#8b0000]" /><span className="shoujin-font text-2xl tracking-[0.3em]">点击左侧朱砂标签 研读详尽志异</span>
                                </div>
                              )}
                           </div>
                        </div>
                     </div>
                  </div>
                ) : (
                  <div className="flex-1 p-10 md:p-14 flex flex-col overflow-y-auto custom-scrollbar">
                    <div className="mb-10">
                      <div className="shoujin-font text-2xl text-[#a22121] opacity-70 mb-2">{stage.year}</div>
                      <h2 className="shoujin-font text-5xl text-[#1a1a1a] mb-4 tracking-widest">{stage.title}</h2>
                      <div className="w-24 h-1 bg-[#d4af37]"></div>
                    </div>
                    <div className="text-2xl leading-[2.1] text-[#333] mb-12 text-justify shoujin-font tracking-widest">
                      {stage.summary.split('\n\n').map((para, i) => <p key={i} className="mb-8 indent-12">{para}</p>)}
                    </div>
                    <div className="mt-auto min-h-[180px]">
                      {activeDetailId ? (
                        <div className="p-6 bg-[#fdfcf8] border-l-4 border-[#9d2919] shadow-inner animate-in fade-in slide-in-from-left-4 duration-600">
                          <div className="shoujin-font text-xl text-[#9d2919] mb-2">【{stage.details.find(d => d.id === activeDetailId)?.tag} · 考据】</div>
                          <p className="text-gray-700 italic text-lg leading-relaxed">{stage.details.find(d => d.id === activeDetailId)?.note}</p>
                        </div>
                      ) : (
                        <div className="h-full py-10 flex items-center justify-center border border-dashed border-gray-200 rounded-lg opacity-40"><span className="shoujin-font text-lg tracking-[0.2em]">点击左侧朱砂标签 研读史料</span></div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-12 right-12 flex items-center gap-4 opacity-40 pointer-events-none z-50">
        <span className="shoujin-font text-lg tracking-widest">{isProfileMode ? '布衣之魄 · 永存江山' : '继续向右拨动 · 解锁人物志'}</span>
        <div className="flex gap-2"><ArrowLeft className="w-5 h-5 animate-pulse" /><ArrowRight className="w-5 h-5 animate-pulse" /></div>
      </div>
    </div>
  );
};

export default BiographyView;