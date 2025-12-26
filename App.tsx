
import React, { useState, useCallback, useMemo, useRef } from 'react';
import { AppStep, OHCard, RemedyResult, SPREADS, Spread } from './types';
import { geminiService } from './services/geminiService';
import { extractColorsFromImage } from './utils/colorExtractor';
import html2canvas from 'html2canvas';

const LoadingOverlay: React.FC<{ message?: string }> = ({ message }) => (
  <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md transition-opacity duration-300">
    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
      <div className="w-16 h-16 rounded-full bg-[#A61B1B] flex items-center justify-center shadow-xl animate-bounce mb-8">
        <i className="fas fa-horse-head text-white text-xl"></i>
      </div>
      <div className="text-center space-y-3">
        <p className="text-[10px] tracking-[0.5em] font-bold text-[#A61B1B] uppercase">2026 · 马到成功</p>
        <h3 className="text-lg font-serif text-slate-800">{message || "正在链接能量场..."}</h3>
        <div className="w-40 h-[1px] bg-slate-100 mx-auto relative overflow-hidden mt-4">
          <div className="absolute inset-0 w-1/2 bg-[#A61B1B] animate-loading-bar"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
  const [cards, setCards] = useState<OHCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [remedy, setRemedy] = useState<RemedyResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const reportRef = useRef<HTMLDivElement>(null);

  const allCardsFlipped = useMemo(() => cards.length > 0 && cards.every(c => c.isFlipped), [cards]);

  const resetToHome = useCallback(() => {
    setStep(AppStep.WELCOME);
    setSelectedSpread(null);
    setCards([]);
    setCurrentCardIndex(0);
    setRemedy(null);
    setLoading(false);
    setErrorMsg(null);
  }, []);

  const startRitual = async (spread: Spread) => {
    setLoading(true);
    setLoadingText("正在捕捉新岁元气...");
    setSelectedSpread(spread);
    try {
      const urls = await geminiService.generateOHCards(3);
      const newCards: OHCard[] = await Promise.all(urls.map(async (url, idx) => {
        const colors = await extractColorsFromImage(url);
        return {
          id: `card-${idx}`,
          positionLabel: spread.positions[idx].label,
          positionDescription: spread.positions[idx].description,
          imageUrl: url,
          interpretation: '',
          selectedColor: colors[0] || '#A61B1B',
          extractedColors: colors,
          isFlipped: false
        };
      }));
      setCards(newCards);
      setStep(AppStep.DRAWING);
    } catch (error) {
      setErrorMsg("能量同步暂时中断，请重新尝试。");
    } finally {
      setLoading(false);
    }
  };

  const flipCard = (id: string) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));
  };

  const handleNextStep = () => {
    if (currentCardIndex < 2) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setStep(AppStep.MIXING);
    }
  };

  const handleGenerateRemedy = async () => {
    setLoading(true);
    setLoadingText("正在为您调制元气报告...");
    try {
      const res = await geminiService.generateRemedy(cards, selectedSpread!);
      setRemedy(res);
      setStep(AppStep.REMEDY);
    } catch (e) {
      setErrorMsg("调制失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPoster = async () => {
    if (!reportRef.current) return;
    
    setLoading(true);
    setLoadingText("正在导出高清海报...");
    
    try {
      // 记录当前滚动位置
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      
      // 截图时回到顶部以防偏移
      window.scrollTo(0, 0);

      const canvas = await html2canvas(reportRef.current, {
        scale: 3, // 进一步提升至3倍，确保打印级别清晰度
        useCORS: true,
        backgroundColor: "#FDFBF7",
        logging: false,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          // 在克隆的文档中隐藏所有可能遮挡或造成“蒙版感”的全局元素
          const texture = clonedDoc.querySelector('.paper-texture') as HTMLElement;
          const particles = clonedDoc.querySelector('.festive-particles') as HTMLElement;
          if (texture) texture.style.display = 'none';
          if (particles) particles.style.display = 'none';
          
          // 增强克隆后的报告区域对比度
          const reportEl = clonedDoc.querySelector('[data-report-container]') as HTMLElement;
          if (reportEl) {
            reportEl.style.boxShadow = 'none'; // 移除阴影防止边缘模糊
          }
        }
      });
      
      // 恢复滚动位置
      window.scrollTo(scrollX, scrollY);

      const link = document.createElement('a');
      link.download = `2026元气报告-${remedy?.name}.png`;
      link.href = canvas.toDataURL('image/png', 1.0); // 质量设为1.0
      link.click();
    } catch (err) {
      console.error("Poster generation error:", err);
      alert("海报同步异常，建议手动截图保存。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans flex flex-col relative selection:bg-[#A61B1B]/10 overflow-x-hidden">
      {loading && <LoadingOverlay message={loadingText} />}
      
      {errorMsg && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-center max-w-sm animate-in fade-in zoom-in">
            <h3 className="text-xl font-serif mb-4 text-red-600">系统提示</h3>
            <p className="text-slate-500 text-sm mb-10 leading-relaxed">{errorMsg}</p>
            <button onClick={resetToHome} className="w-full py-4 bg-[#A61B1B] text-white rounded-full font-bold hover:shadow-xl transition-all">重新开启</button>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        
        {step === AppStep.WELCOME && (
          <div className="w-full max-w-3xl text-center space-y-12 reveal-up">
            <div className="space-y-4">
              <span className="text-[#A61B1B] text-[12px] font-bold tracking-[0.8em] uppercase block">2026 · 一马当先</span>
              <h1 className="text-5xl md:text-7xl font-serif tracking-tight leading-tight">2026 元气能量饮</h1>
            </div>
            <div className="space-y-8">
              <p className="text-xl md:text-2xl text-slate-500 font-serif leading-relaxed font-light">
                通过 OH 卡片捕捉你内心的期待。<br/>
                将过往与目标，融合成一杯属于 2026 的元气能量饮。
              </p>
              <div className="w-20 h-[1px] bg-slate-200 mx-auto"></div>
            </div>
            <button 
              onClick={() => setStep(AppStep.SELECT_SPREAD)}
              className="px-16 py-5 bg-[#A61B1B] text-white rounded-full text-sm font-bold tracking-[0.5em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              开启元旦觉察
            </button>
          </div>
        )}

        {step === AppStep.SELECT_SPREAD && (
          <div className="w-full max-w-5xl space-y-16 reveal-up">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-serif tracking-widest">选择活力视角</h2>
              <p className="text-slate-400 font-serif text-base italic">马年伊始，让思维如骏马般驰骋在 2026 的蓝图中</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SPREADS.map(spread => (
                <div 
                  key={spread.id}
                  onClick={() => startRitual(spread)}
                  className="p-10 cursor-pointer group bg-white border border-slate-100 hover:border-[#A61B1B]/30 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-[#A61B1B]/5 text-[#A61B1B] rounded-full flex items-center justify-center mb-8 group-hover:bg-[#A61B1B] group-hover:text-white transition-all duration-500">
                    <i className={`fas ${spread.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-2xl font-serif mb-4 tracking-wide">{spread.name}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-light">{spread.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center">
              <button onClick={resetToHome} className="text-[11px] text-slate-300 uppercase tracking-[0.4em] hover:text-[#A61B1B] transition-colors">返回首页</button>
            </div>
          </div>
        )}

        {step === AppStep.DRAWING && (
          <div className="w-full max-w-6xl space-y-12 reveal-up h-full flex flex-col justify-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-[#A61B1B] uppercase tracking-[0.5em]">2026 能量捕捉中</p>
                <h2 className="text-3xl md:text-4xl font-serif">请静心，翻开每一张卡片</h2>
              </div>
              <button onClick={() => setCards(c => c.map(v => ({...v, isFlipped: true})))} className="text-sm text-[#A61B1B]/50 hover:text-[#A61B1B] transition-all underline decoration-1 underline-offset-4 tracking-widest">一键翻开</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 min-h-0 flex-1">
              {cards.map(card => (
                <div key={card.id} className="card-flip-container aspect-[3/4] cursor-pointer group" onClick={() => flipCard(card.id)}>
                  <div className={`card-inner h-full shadow-2xl rounded-[2.5rem] transition-transform duration-1000 ${card.isFlipped ? 'flipped' : ''}`}>
                    <div className="card-back bg-white border border-slate-50 flex flex-col items-center justify-center p-10 text-center rounded-[2.5rem]">
                      <div className="w-12 h-12 border border-[#A61B1B]/10 rounded-full flex items-center justify-center mb-8">
                        <div className="w-3 h-3 bg-[#A61B1B]/30 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-[#A61B1B] font-serif tracking-[0.5em] text-base mb-3">{card.positionLabel}</p>
                      <p className="text-xs text-slate-400 font-light italic leading-relaxed">{card.positionDescription}</p>
                    </div>
                    <div className="card-front rounded-[2.5rem] overflow-hidden">
                      <img src={card.imageUrl} alt="感悟卡片" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-10 left-10 text-white">
                         <p className="text-[9px] opacity-60 font-bold mb-2 tracking-[0.4em]">2026 · 驿站</p>
                         <p className="text-2xl font-serif tracking-widest">{card.positionLabel}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={`text-center transition-all duration-1000 ${allCardsFlipped ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
              <button 
                onClick={() => setStep(AppStep.INTERPRETATION)}
                className="px-16 py-5 bg-[#1A1A1A] text-white rounded-full text-sm font-bold tracking-[0.6em] shadow-2xl hover:bg-[#A61B1B] hover:scale-105 active:scale-95 transition-all"
              >
                开启深度解读 <i className="fas fa-arrow-right ml-4 text-[12px]"></i>
              </button>
            </div>
          </div>
        )}

        {step === AppStep.INTERPRETATION && (
          <div className="w-full max-w-5xl py-4 h-full flex items-center justify-center reveal-up">
            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl border border-slate-50 w-full animate-in slide-in-from-bottom-8">
              <div className="flex flex-col md:flex-row gap-16">
                <div className="w-full md:w-1/2 flex-shrink-0">
                  <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-[10px] border-white aspect-[3/4] relative">
                    <img src={cards[currentCardIndex].imageUrl} alt="当前卡片" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-between py-2">
                  <div className="space-y-10">
                    <header className="space-y-3">
                      <span className="text-[11px] font-bold text-[#A61B1B] tracking-[0.6em] uppercase block">觉察阶段 {currentCardIndex + 1} / 3</span>
                      <h2 className="text-4xl font-serif text-slate-800 tracking-wider">{cards[currentCardIndex].positionLabel}</h2>
                      <p className="text-slate-400 text-base font-serif border-l-4 border-[#A61B1B]/10 pl-6 italic">{cards[currentCardIndex].positionDescription}</p>
                    </header>
                    
                    <div className="space-y-4">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">你的新年感悟：</label>
                      <textarea 
                        autoFocus
                        value={cards[currentCardIndex].interpretation}
                        onChange={(e) => setCards(prev => prev.map((c, i) => i === currentCardIndex ? { ...c, interpretation: e.target.value } : c))}
                        placeholder="此刻，你从画面中感知到了什么积极的力量？"
                        className="w-full h-40 bg-[#FDFBF7] border border-slate-100 rounded-[2rem] p-8 text-xl font-serif outline-none focus:ring-1 focus:ring-[#A61B1B]/30 transition-all shadow-inner"
                      />
                    </div>
                    
                    <div className="space-y-6">
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">色彩共鸣：</label>
                      <div className="flex flex-wrap gap-5">
                        {cards[currentCardIndex].extractedColors.map(color => (
                          <button
                            key={color}
                            onClick={() => setCards(prev => prev.map((c, i) => i === currentCardIndex ? { ...c, selectedColor: color } : c))}
                            className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${cards[currentCardIndex].selectedColor === color ? 'border-[#A61B1B] scale-125 shadow-xl' : 'border-transparent opacity-40 hover:opacity-100'}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleNextStep}
                    disabled={!cards[currentCardIndex].interpretation.trim()}
                    className="w-full py-6 bg-[#A61B1B] text-white rounded-full text-sm font-bold tracking-[0.6em] shadow-lg disabled:opacity-20 transition-all active:scale-95 mt-12"
                  >
                    {currentCardIndex < 2 ? '继续解读下一项' : '完成并调制元气能量饮'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === AppStep.MIXING && (
          <div className="w-full max-w-lg text-center space-y-16 reveal-up h-full flex flex-col justify-center">
            <div className="space-y-4">
              <h2 className="text-4xl font-serif tracking-[0.4em]">正在融合 2026 活力因子</h2>
              <p className="text-[11px] text-[#A61B1B] font-bold tracking-[0.8em] uppercase">MIXING NEW YEAR VITALITY</p>
            </div>
            <div className="relative w-72 h-[480px] border-x-2 border-b-[12px] border-slate-100 rounded-b-[9rem] overflow-hidden bg-white mx-auto shadow-2xl">
               <div className="absolute bottom-0 left-0 w-full animate-in slide-in-from-bottom duration-1000" style={{ height: '33.3%', backgroundColor: cards[0]?.selectedColor }} />
               <div className="absolute bottom-[33.3%] left-0 w-full animate-in slide-in-from-bottom duration-1500" style={{ height: '33.3%', backgroundColor: cards[1]?.selectedColor }} />
               <div className="absolute bottom-[66.6%] left-0 w-full animate-in slide-in-from-bottom duration-2000" style={{ height: '33.3%', backgroundColor: cards[2]?.selectedColor }} />
               <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/20"></div>
            </div>
            <button 
              onClick={handleGenerateRemedy}
              className="px-20 py-6 bg-[#A61B1B] text-white rounded-full text-sm font-bold tracking-[0.8em] shadow-2xl hover:scale-110 transition-all"
            >
              获取能量报告
            </button>
          </div>
        )}

        {step === AppStep.REMEDY && remedy && (
          <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16 items-center reveal-up py-6 h-full" ref={reportRef} data-report-container="true">
            <div className="w-80 h-[600px] border-x-2 border-b-[16px] border-slate-100 rounded-b-[10rem] overflow-hidden bg-white shadow-2xl shrink-0 no-print relative">
               <div 
                 className="absolute inset-0"
                 style={{ background: `linear-gradient(to top, ${cards[0]?.selectedColor}, ${cards[1]?.selectedColor}, ${cards[2]?.selectedColor})`, opacity: loadingText.includes('海报') ? 1 : 0.8 }}
               />
               <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
               <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/50 font-serif tracking-[1.2em] text-[11px] uppercase rotate-90 origin-center whitespace-nowrap">2026 VITALITY REPORT</div>
            </div>
            <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-2xl border border-slate-50 flex-1 h-full overflow-y-auto">
              <header className="mb-12 space-y-6">
                 <div className="flex justify-between items-center">
                   <span className="text-[11px] font-bold text-[#A61B1B] tracking-[0.8em] uppercase block">2026 · 元旦觉察报告</span>
                   <span className="text-slate-300 text-[10px] tracking-widest">{new Date().toLocaleDateString('zh-CN')}</span>
                 </div>
                 <h1 className="text-5xl md:text-6xl font-serif text-slate-800 tracking-tight leading-tight">{remedy.name}</h1>
              </header>
              <div className="space-y-12">
                <p className="text-3xl italic font-serif font-light text-[#A61B1B] leading-relaxed">“{remedy.vibe}”</p>
                <p className="text-xl text-slate-600 leading-relaxed font-serif font-light">{remedy.description}</p>
                <div className="space-y-6">
                  <p className="text-[11px] font-bold text-slate-400 tracking-[0.5em] uppercase">核心能量成分：</p>
                  <div className="flex flex-wrap gap-4">
                    {remedy.ingredients.map((ing, i) => (
                      <span key={i} className="px-8 py-3 bg-[#A61B1B]/5 border border-[#A61B1B]/10 rounded-full text-sm font-serif text-[#A61B1B]/80">{ing}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 pt-10 no-print">
                  <button onClick={resetToHome} className="flex-1 py-5 bg-[#1A1A1A] text-white rounded-full text-[12px] font-bold tracking-[0.6em] hover:bg-black transition-all">重新觉察</button>
                  <button onClick={handleDownloadPoster} className="flex-1 py-5 border-2 border-[#A61B1B] text-[#A61B1B] rounded-full text-[12px] font-bold tracking-[0.6em] hover:bg-[#A61B1B] hover:text-white transition-all">保存海报</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 text-center no-print">
        <p className="text-[10px] text-slate-300 font-serif tracking-[0.6em] uppercase">2026 马年 · 新年元气驿站</p>
      </footer>
    </div>
  );
}
