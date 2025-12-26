
import React, { useState, useRef, useMemo } from 'react';
import { AppStep, CardSelection, RemedyResult, TarotCard } from './types';
import { alchemistService } from './services/geminiService';
import html2canvas from 'html2canvas';

// 移除 LoadingOverlay 组件，实现“直接调用”

const SmartImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  // Reset loaded state when src changes
  React.useEffect(() => {
    setLoaded(false);
  }, [src]);

  return (
    <div className={`relative bg-slate-100 overflow-hidden ${className}`}>
      {/* 移除 animate-pulse，只保留简单的背景占位，强调“现成图片”感 */}
      {!loaded && <div className="absolute inset-0 bg-[#F0EAE0]" />} 
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        crossOrigin="anonymous"
      />
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [selections, setSelections] = useState<CardSelection[]>([]);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [generatingImg, setGeneratingImg] = useState(false); // 仅用于 html2canvas 生成图片时的遮罩
  
  // Carousel State
  const [currentRemedyIdx, setCurrentRemedyIdx] = useState(0);
  
  const [deckSpread, setDeckSpread] = useState<TarotCard[]>([]);
  
  const reportRef = useRef<HTMLDivElement>(null);
  const fullDeck = useMemo(() => alchemistService.getTarotDeck(), []);
  const allRemedies = useMemo(() => alchemistService.getAllRemedies(), []);

  const resetApp = () => {
    setSelections([]);
    setActiveCardIdx(0);
    setCurrentRemedyIdx(0);
    setStep(AppStep.WELCOME);
    setDeckSpread([]);
  };

  const handleStart = () => {
    // 随机打乱牌组
    setDeckSpread([...fullDeck].sort(() => Math.random() - 0.5));
    setStep(AppStep.DRAW_CARDS);
  };

  const handleCardClick = (card: TarotCard) => {
    if (selections.length >= 3) return;
    if (selections.find(s => s.card.id === card.id)) return;

    const newSelection: CardSelection = {
      card: card,
      index: selections.length + 1
    };
    setSelections([...selections, newSelection]);
  };

  const nextStep = async () => {
     setStep(AppStep.INTERPRET);
  };

  const generateFinalRemedy = async () => {
    const idx = alchemistService.calculateRemedyIndex(selections);
    setCurrentRemedyIdx(idx);
    setStep(AppStep.REMEDY);
  };

  const btnPrimary = "px-10 py-4 bg-[#A61B1B] text-white rounded-full text-lg font-bold tracking-[0.2em] shadow-lg hover:bg-[#8a1616] hover:shadow-xl transition-all transform hover:-translate-y-1 active:scale-95";

  const currentRemedy = allRemedies[currentRemedyIdx];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans flex flex-col relative overflow-x-hidden">
      {/* 仅在保存图片时显示的简单遮罩 */}
      {generatingImg && (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
            <div className="text-white font-bold tracking-widest">正在保存海报...</div>
        </div>
      )}
      
      {/* 顶部 Logo 区 */}
      <div className="absolute top-6 left-0 right-0 flex justify-center z-10 pointer-events-none">
         <div className="flex flex-col items-center opacity-80">
             <span className="text-[10px] tracking-[0.3em] text-[#A61B1B] uppercase mb-1 font-bold">2026 Happy New Year</span>
             <div className="w-8 h-8 rounded-full border border-[#A61B1B] flex items-center justify-center">
                <span className="text-[#A61B1B] text-xs font-serif font-bold">福</span>
             </div>
         </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-6xl mx-auto w-full relative z-20">
        
        {step === AppStep.WELCOME && (
          <div className="w-full text-center space-y-10 reveal-up">
            <div className="space-y-4 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#A61B1B] opacity-5 rounded-full blur-3xl"></div>
              <h2 className="text-xl md:text-2xl text-[#A61B1B] font-serif font-bold tracking-widest">年会 · 运势特调</h2>
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#1A1A1A] leading-tight">
                新年<span className="text-[#A61B1B]">快乐</span>
              </h1>
              <div className="w-20 h-1.5 bg-[#A61B1B] mx-auto rounded-full"></div>
            </div>
            
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-serif">
              塔罗指引方向，美酒庆祝新生。<br/>
              请抽取 <span className="text-[#A61B1B] font-bold">三张标准塔罗牌</span>，<br/>
              领取您的<span className="border-b-2 border-[#A61B1B]">2026专属新年特调</span>。
            </p>

            <div className="pt-8">
              <button onClick={handleStart} className={btnPrimary}>
                开启好运仪式
              </button>
            </div>
          </div>
        )}

        {step === AppStep.DRAW_CARDS && (
          <div className="w-full space-y-8 reveal-up flex flex-col h-full justify-center items-center">
            <header className="text-center space-y-2">
              <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">抽取三张新年指引</h2>
              <p className="text-slate-500 text-sm tracking-widest">相信直觉，心诚则灵 ({selections.length}/3)</p>
            </header>
            
            <div className="w-full max-w-4xl min-h-[320px] flex flex-wrap justify-center content-center gap-3 md:gap-4 perspective-1000 py-4">
               {selections.length < 3 && deckSpread.slice(0, 22).map((card) => {
                 const isSelected = selections.find(s => s.card.id === card.id);
                 if (isSelected) return null;

                 return (
                   <div 
                     key={card.id}
                     onClick={() => handleCardClick(card)}
                     className="w-20 h-32 md:w-24 md:h-36 bg-[#2C2C2C] rounded-lg cursor-pointer hover:-translate-y-3 transition-all duration-300 relative flex items-center justify-center group shadow-md border-[3px] border-[#D4AF37]"
                   >
                      {/* 卡背设计：经典几何 */}
                      <div className="absolute inset-2 border border-[#D4AF37] opacity-40 rounded-sm flex flex-col items-center justify-center">
                         <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center opacity-60">
                           <div className="w-8 h-8 rotate-45 border border-[#D4AF37]"></div>
                         </div>
                      </div>
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30"></div>
                   </div>
                 );
               })}
            </div>

            <div className="w-full max-w-3xl flex justify-center gap-4 md:gap-8 min-h-[160px]">
               {selections.map((s, i) => (
                 <div key={i} className="relative w-24 h-32 md:w-32 md:h-44 bg-white p-1 shadow-xl rounded-lg transform transition-all animate-[reveal-up_0.5s_ease-out]">
                    <SmartImage src={s.card.imageUrl} alt="Selected" className="w-full h-full object-cover rounded" />
                    <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#A61B1B] text-white rounded-full flex items-center justify-center text-sm font-bold shadow border-2 border-[#FDFBF7]">
                      {s.index}
                    </div>
                 </div>
               ))}
               {Array.from({ length: 3 - selections.length }).map((_, i) => (
                  <div key={`empty-${i}`} className="w-24 h-32 md:w-32 md:h-44 border-2 border-dashed border-[#A61B1B]/20 rounded-lg flex items-center justify-center bg-[#A61B1B]/5">
                     <span className="text-xs text-[#A61B1B]/40 font-bold">待抽取</span>
                  </div>
               ))}
            </div>

            {selections.length === 3 && (
              <div className="pt-4">
                <button onClick={nextStep} className={btnPrimary}>
                  揭晓牌面
                </button>
              </div>
            )}
          </div>
        )}

        {step === AppStep.INTERPRET && (
          <div className="w-full max-w-5xl reveal-up px-4">
            <div className="bg-white p-6 md:p-12 rounded-[2rem] shadow-xl border border-[#E8C68E]/20 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <div className="w-full lg:w-5/12 space-y-6">
                 <div className="aspect-[2/3] w-full rounded-xl overflow-hidden shadow-lg border-8 border-[#FDFBF7] bg-slate-100 relative">
                   <SmartImage src={selections[activeCardIdx].card.imageUrl} alt="Card" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex justify-center gap-2">
                  {selections.map((_, i) => (
                    <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === activeCardIdx ? 'w-10 bg-[#A61B1B]' : 'w-2 bg-slate-200'}`} />
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-7/12 flex flex-col justify-center text-center lg:text-left space-y-8">
                <div>
                  <div className="inline-block px-3 py-1 bg-[#A61B1B]/10 text-[#A61B1B] text-xs font-bold tracking-widest rounded-full mb-4">
                    STANDARD TAROT · CARD 0{activeCardIdx + 1}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-4">
                    {selections[activeCardIdx].card.name}
                  </h2>
                  <p className="text-xl md:text-2xl text-slate-600 font-serif leading-relaxed italic border-l-4 border-[#A61B1B] pl-6 py-2">
                    "{selections[activeCardIdx].card.meaning}"
                  </p>
                </div>

                <div className="pt-6">
                  {activeCardIdx < 2 ? (
                    <button 
                      onClick={() => setActiveCardIdx(prev => prev + 1)}
                      className="w-full py-4 border-2 border-slate-200 text-slate-500 rounded-full font-bold hover:border-[#A61B1B] hover:text-[#A61B1B] transition-all tracking-widest"
                    >
                      下一张
                    </button>
                  ) : (
                    <button onClick={generateFinalRemedy} className={btnPrimary + " w-full"}>
                      查看我的新年特调
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === AppStep.REMEDY && currentRemedy && (
          <div className="w-full max-w-4xl reveal-up pb-8 px-2 flex flex-col items-center">
             
             {/* 
                专门用于生成海报的容器 
                特点：固定宽高比 (375x600 比例)，固定内边距，确保内容不溢出
             */}
             <div 
               ref={reportRef} 
               className="bg-[#FDFBF7] w-full max-w-[375px] md:max-w-[400px] mx-auto shadow-2xl relative overflow-hidden flex flex-col border-[12px] border-white box-border"
               style={{ aspectRatio: '375/620', height: 'auto' }} 
             >
                {/* 顶部 Banner */}
                <div className="bg-[#A61B1B] h-14 flex items-center justify-between px-5 shrink-0 relative z-10">
                   <span className="text-[#E8C68E] font-bold tracking-[0.2em] text-[10px] md:text-xs">2026 HAPPY NEW YEAR</span>
                   <div className="w-6 h-6 rounded-full border border-[#E8C68E] flex items-center justify-center">
                     <span className="text-[#E8C68E] font-serif text-[10px]">福</span>
                   </div>
                </div>

                {/* 内容区域 */}
                <div className="flex-1 px-6 pb-6 pt-6 flex flex-col relative">
                   <div className="flex-1 space-y-2 text-center flex flex-col justify-center">
                      
                      {/* 标题 */}
                      <div className="shrink-0">
                        <p className="text-[#A61B1B] text-[10px] font-bold tracking-[0.3em] uppercase mb-1">{currentRemedy.subName}</p>
                        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1A1A] mb-2">{currentRemedy.name}</h1>
                        <div className="w-8 h-0.5 bg-[#E8C68E] mx-auto"></div>
                      </div>

                      {/* 小尺寸固定图片 (Fixed Small Image) */}
                      <div className="w-full flex justify-center py-4 shrink-0">
                         <div className="w-32 h-32 rounded-full border-4 border-[#E8C68E]/30 shadow-inner overflow-hidden relative group">
                            <SmartImage 
                              src={currentRemedy.cocktailImageUrl} 
                              alt="Cocktail" 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                            />
                         </div>
                      </div>

                      {/* 描述 */}
                      <p className="text-slate-600 text-xs leading-relaxed font-serif px-1 line-clamp-[6]">
                        {currentRemedy.description}
                      </p>

                      {/* 信息块 */}
                      <div className="grid grid-cols-2 gap-3 text-left border-t border-slate-200 pt-3 mt-4 shrink-0">
                         <div className="space-y-1">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Recipe</span>
                            <div className="flex flex-wrap gap-1">
                              {currentRemedy.ingredients.slice(0, 3).map((ing, i) => (
                                <span key={i} className="text-[9px] text-[#A61B1B] bg-[#A61B1B]/5 px-1.5 py-0.5 rounded-sm whitespace-nowrap">{ing}</span>
                              ))}
                            </div>
                         </div>
                         <div className="space-y-1 border-l border-slate-100 pl-3">
                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Action</span>
                            <p className="text-[10px] text-[#1A1A1A] font-bold leading-tight line-clamp-3">{currentRemedy.actionItem}</p>
                         </div>
                      </div>
                   </div>

                   {/* 底部版权 */}
                   <div className="text-center pt-2 mt-1 opacity-40 shrink-0">
                      <p className="text-[8px] font-serif tracking-[0.3em]">MIND SPIRIT LAB · 2026</p>
                   </div>
                </div>

                {/* 纹理遮罩 */}
                <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
             </div>

             <div className="mt-8 flex gap-4 no-print pb-12">
               <button onClick={resetApp} className="w-12 h-12 rounded-full border-2 border-[#A61B1B] text-[#A61B1B] flex items-center justify-center hover:bg-[#A61B1B] hover:text-white transition-all shadow-md">
                 <i className="fas fa-redo"></i>
               </button>
               <button 
                 onClick={async () => {
                   if (!reportRef.current) return;
                   setGeneratingImg(true);
                   try {
                     const canvas = await html2canvas(reportRef.current, { 
                       scale: 3, 
                       useCORS: true, 
                       backgroundColor: "#FDFBF7",
                       // allowTaint: true, // 移除此行，确保可以导出图片
                     });
                     const link = document.createElement('a');
                     link.download = `2026新年特调-${currentRemedy.name}.png`;
                     link.href = canvas.toDataURL("image/png", 1.0);
                     link.click();
                   } catch (e) {
                      console.error(e);
                      alert("图片保存失败，请截图保存。");
                   } finally {
                     setGeneratingImg(false);
                   }
                 }}
                 className={btnPrimary + " flex items-center gap-2"}
               >
                 <i className="fas fa-download"></i> 保存专属海报
               </button>
             </div>
          </div>
        )}
      </main>

      {step !== AppStep.REMEDY && (
        <footer className="py-6 text-center no-print opacity-50 relative z-20">
          <p className="text-[10px] text-[#A61B1B] font-serif tracking-widest">© 2026 Annual Gala · Mind Spirit Lab</p>
        </footer>
      )}
    </div>
  );
}
