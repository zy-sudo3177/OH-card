
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { AppStep, CardSelection, RemedyResult } from './types';
import { alchemistService } from './services/geminiService';
import { extractColorsFromImage } from './utils/colorExtractor';
import html2canvas from 'html2canvas';

const stages = ["正在梳理人生脉络...", "正在感悟岁月色彩...", "正在注入马年福气...", "正在为您斟满这杯..."];

const LoadingOverlay: React.FC = () => {
  const [stageIdx, setStageIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setStageIdx((prev) => (prev < stages.length - 1 ? prev + 1 : prev));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#1A1A1A] text-white">
      <div className="flex flex-col items-center space-y-10 animate-pulse">
        <div className="w-24 h-24 rounded-full border border-[#E8C68E]/30 flex items-center justify-center relative bg-black/50">
          <i className="fas fa-mug-hot text-[#E8C68E] text-4xl"></i>
        </div>
        <div className="text-center space-y-4">
          <h3 className="text-xl font-serif tracking-[0.2em]">{stages[stageIdx]}</h3>
          <div className="w-32 h-[1px] bg-[#E8C68E]/50 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

const SmartImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative bg-slate-200 overflow-hidden ${className}`}>
      {!loaded && !error && <div className="absolute inset-0 bg-slate-300 animate-pulse" />}
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FDFBF7] p-4 text-center border border-slate-200">
          <i className="fas fa-image text-slate-300 text-4xl mb-4"></i>
          <p className="text-sm text-slate-400 font-serif">图片加载中...</p>
        </div>
      ) : (
        <img 
          src={src} 
          alt={alt} 
          className={`w-full h-full object-cover transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          crossOrigin="anonymous"
        />
      )}
    </div>
  );
};

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [selections, setSelections] = useState<CardSelection[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [remedy, setRemedy] = useState<RemedyResult | null>(null);
  
  const reportRef = useRef<HTMLDivElement>(null);
  const deck = useMemo(() => alchemistService.getOHDeck(), []);

  const resetApp = () => {
    setSelections([]);
    setRevealedCount(0);
    setActiveCardIdx(0);
    setRemedy(null);
    setStep(AppStep.WELCOME);
  };

  const handleStart = () => {
    const shuffled = [...deck].sort(() => Math.random() - 0.5).slice(0, 3);
    const meanings = ["回顾过去", "把握现在", "展望未来"];
    setSelections(shuffled.map((img, i) => ({
      imageUrl: img,
      meaning: meanings[i],
      userText: "",
      selectedColor: "",
      palette: []
    })));
    setStep(AppStep.DRAW_CARDS);
  };

  const revealCard = (idx: number) => {
    if (idx === revealedCount) {
      setRevealedCount(prev => prev + 1);
    }
  };

  const startInterpretation = async () => {
    setLoading(true);
    const updated = await Promise.all(selections.map(async (s) => {
      const palette = await extractColorsFromImage(s.imageUrl);
      return { ...s, palette };
    }));
    setSelections(updated);
    setLoading(false);
    setStep(AppStep.INTERPRET);
  };

  const generateFinalRemedy = async () => {
    setLoading(true);
    try {
      const res = await alchemistService.generateRemedy(selections);
      setRemedy(res);
      setStep(AppStep.REMEDY);
    } catch (e) {
      alert("网络信号稍弱，请您重新点击试一次。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] font-sans flex flex-col relative selection:bg-[#E8C68E]/30 overflow-x-hidden">
      {loading && <LoadingOverlay />}
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-7xl mx-auto w-full">
        
        {step === AppStep.WELCOME && (
          <div className="w-full max-w-4xl text-center space-y-12 reveal-up px-4">
            <div className="space-y-6">
              <span className="text-[#A61B1B] text-sm font-bold tracking-[0.5em] block opacity-80">2026 丙午马年 · 辞旧迎新</span>
              <h1 className="text-6xl md:text-8xl font-serif tracking-tight leading-none font-bold text-[#1A1A1A]">
                鸿运<br/><span className="text-[#A61B1B]">特调</span>
              </h1>
              <div className="w-24 h-1 bg-[#A61B1B] mx-auto my-8"></div>
              <p className="text-xl md:text-2xl text-slate-600 font-serif leading-relaxed max-w-2xl mx-auto">
                人生如茶，沉浮之间皆是味道。<br/>
                抽取三张卡片，回顾过往，期许未来。<br/>
                为您调制一杯专属的<span className="font-bold text-[#A61B1B]">“马年开运饮”</span>。
              </p>
            </div>
            <button 
              onClick={handleStart}
              className="px-16 py-6 bg-[#A61B1B] text-white rounded-full text-lg font-bold tracking-[0.2em] transition-all hover:bg-[#8a1616] shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              开启好运之旅
            </button>
          </div>
        )}

        {step === AppStep.DRAW_CARDS && (
          <div className="w-full max-w-5xl space-y-10 reveal-up text-center px-4">
            <header className="space-y-3">
              <h2 className="text-4xl font-serif font-bold text-[#1A1A1A]">请翻开您的人生卡片</h2>
              <p className="text-slate-500 text-lg">依次点击下方三张牌，看看您的运势意象</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {selections.map((s, i) => (
                <div 
                  key={i} 
                  onClick={() => revealCard(i)}
                  className={`group perspective-1000 cursor-pointer ${i > revealedCount ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
                >
                  <div className={`relative aspect-[3/4] rounded-[2rem] border-[6px] border-white shadow-xl transition-all duration-1000 transform-style-3d ${i < revealedCount ? 'rotate-y-0' : 'rotate-y-180'}`}>
                    {/* 卡牌正面 */}
                    <div className="absolute inset-0 backface-hidden">
                      <SmartImage src={s.imageUrl} alt={s.meaning} className="w-full h-full rounded-[1.5rem]" />
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent rounded-b-[1.5rem]"></div>
                      <div className="absolute bottom-6 left-0 right-0 text-white font-serif text-2xl font-bold tracking-[0.3em]">{s.meaning}</div>
                    </div>
                    {/* 卡牌背面 */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#A61B1B] flex flex-col items-center justify-center p-6 rounded-[1.5rem] shadow-inner">
                      <div className="w-full h-full border-[3px] border-[#E8C68E]/30 rounded-[1rem] flex items-center justify-center bg-[#8E1616]">
                        <div className="text-center">
                          <span className="block text-[#E8C68E] text-5xl font-serif mb-2">福</span>
                          <span className="text-[#E8C68E]/50 text-xs tracking-widest">点击翻开</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {revealedCount === 3 && (
              <button 
                onClick={startInterpretation}
                className="px-16 py-5 bg-[#1A1A1A] text-white rounded-full text-lg font-bold tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-xl hover:bg-black"
              >
                开始解读我的运势
              </button>
            )}
          </div>
        )}

        {step === AppStep.INTERPRET && (
          <div className="w-full max-w-6xl space-y-8 reveal-up px-4">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <div className="w-full lg:w-5/12 space-y-6">
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-[8px] border-white bg-slate-100">
                  <SmartImage src={selections[activeCardIdx].imageUrl} alt="Focus" className="w-full h-full" />
                  <div className="absolute top-6 left-6 bg-[#A61B1B] text-white px-6 py-2 rounded-full font-serif text-lg tracking-widest shadow-lg">
                    {selections[activeCardIdx].meaning}
                  </div>
                </div>
                {/* 进度条 */}
                <div className="flex justify-center gap-3">
                  {selections.map((_, i) => (
                    <div key={i} className={`h-2 rounded-full transition-all duration-700 ${i === activeCardIdx ? 'w-12 bg-[#A61B1B]' : 'w-3 bg-slate-300'}`} />
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-7/12 bg-white rounded-[3rem] p-8 md:p-12 shadow-xl flex flex-col justify-between min-h-[500px] border border-slate-100">
                <div className="space-y-10">
                  <header>
                    <h2 className="text-4xl font-serif mb-3 font-bold text-[#1A1A1A]">看着这张图，您想到了什么？</h2>
                    <p className="text-slate-500 font-serif text-lg">是曾经奋斗的日子？是现在的家庭？还是对未来的期许？<br/>请凭直觉写下一两句心里话。</p>
                  </header>

                  <textarea 
                    autoFocus
                    value={selections[activeCardIdx].userText}
                    onChange={(e) => {
                      const updated = [...selections];
                      updated[activeCardIdx].userText = e.target.value;
                      setSelections(updated);
                    }}
                    placeholder="例如：看到这座山，想到了这几年事业上的不易，但终究是挺过来了..."
                    className="w-full h-40 bg-[#FDFBF7] border border-slate-200 rounded-[2rem] p-6 text-xl font-serif text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#A61B1B]/20 shadow-inner resize-none placeholder:text-slate-300"
                  />

                  <div className="space-y-4">
                    <p className="text-sm font-bold text-slate-500 tracking-widest">请选择一个代表此刻心情的颜色：</p>
                    <div className="flex flex-wrap gap-4">
                      {selections[activeCardIdx].palette.map((color, i) => (
                        <button 
                          key={i}
                          onClick={() => {
                            const updated = [...selections];
                            updated[activeCardIdx].selectedColor = color;
                            setSelections(updated);
                          }}
                          className={`w-14 h-14 rounded-full transition-all duration-300 flex items-center justify-center ${selections[activeCardIdx].selectedColor === color ? 'scale-110 ring-4 ring-[#A61B1B]/20 shadow-xl' : 'hover:scale-105 shadow-md border-2 border-white'}`}
                          style={{ backgroundColor: color }}
                        >
                           {selections[activeCardIdx].selectedColor === color && <i className="fas fa-check text-white drop-shadow-md"></i>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  {activeCardIdx < 2 ? (
                    <button 
                      disabled={!selections[activeCardIdx].userText || !selections[activeCardIdx].selectedColor}
                      onClick={() => setActiveCardIdx(prev => prev + 1)}
                      className="w-full py-5 bg-[#1A1A1A] text-white rounded-full font-bold text-lg tracking-[0.2em] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-black shadow-lg"
                    >
                      下一张：{selections[activeCardIdx+1].meaning}
                    </button>
                  ) : (
                    <button 
                      disabled={!selections[activeCardIdx].userText || !selections[activeCardIdx].selectedColor}
                      onClick={generateFinalRemedy}
                      className="w-full py-5 bg-[#A61B1B] text-white rounded-full font-bold text-lg tracking-[0.2em] disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:bg-[#8a1616] shadow-xl"
                    >
                      生成我的开运特调
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === AppStep.REMEDY && remedy && (
          <div className="w-full max-w-6xl flex flex-col lg:flex-row items-stretch reveal-up py-4 gap-8 lg:gap-12" ref={reportRef}>
            <div className="lg:w-1/2 flex flex-col items-center justify-center bg-[#1A1A1A] rounded-[3rem] p-12 overflow-hidden relative shadow-2xl">
               {/* 装饰纹理 */}
               <div className="absolute top-0 right-0 p-10 opacity-10 text-[#E8C68E] text-9xl font-serif select-none pointer-events-none">福</div>
               
               {/* 图片区域 - 无遮挡、原样展示 */}
               <div className="relative w-full max-w-sm aspect-square rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-[4px] border-[#333] bg-black mb-10">
                  <SmartImage src={remedy.cocktailImageUrl!} alt="Remedy" className="w-full h-full object-cover" />
               </div>

               {/* 文字区域 - 移至下方 */}
               <div className="text-center space-y-4 relative z-10">
                  <p className="text-xs tracking-[0.5em] font-bold text-[#E8C68E] opacity-60 uppercase">2026 丙午马年 · 珍藏</p>
                  <h2 className="text-4xl md:text-5xl font-serif text-white font-bold tracking-wide leading-tight">{remedy.name}</h2>
               </div>
            </div>

            <div className="lg:w-1/2 flex flex-col">
              <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-xl flex-1 flex flex-col justify-between border border-slate-100 relative overflow-hidden">
                <div className="space-y-10">
                  <header className="space-y-4 border-b border-slate-100 pb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-[#A61B1B] tracking-[0.2em] bg-[#A61B1B]/10 px-3 py-1 rounded-full">专属开运报告</span>
                      <span className="text-slate-400 text-xs tracking-widest font-serif">{new Date().toLocaleDateString('zh-CN')}</span>
                    </div>
                  </header>

                  <div className="space-y-8">
                    {/* 寄语 */}
                    <div className="bg-[#FDFBF7] p-8 rounded-2xl border-l-4 border-[#A61B1B]">
                      <p className="text-2xl font-serif text-[#A61B1B] leading-relaxed">
                        “{remedy.vibe}”
                      </p>
                    </div>

                    {/* 解读 */}
                    <div className="space-y-3">
                       <h3 className="text-sm font-bold text-slate-400 tracking-widest uppercase">大师解读</h3>
                       <p className="text-xl text-slate-700 leading-relaxed font-serif text-justify">
                         {remedy.description}
                       </p>
                    </div>
                    
                    {/* 成分 */}
                    <div className="space-y-4">
                      <p className="text-sm font-bold text-slate-400 tracking-widest uppercase">特调成分</p>
                      <div className="flex flex-wrap gap-3">
                        {remedy.ingredients.map((ing, i) => (
                          <span key={i} className="px-5 py-2 bg-[#F5F5F5] text-slate-600 rounded-full text-sm font-serif border border-slate-200">{ing}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-12 no-print">
                  <button onClick={resetApp} className="flex-1 py-4 border-2 border-slate-200 text-slate-500 rounded-full font-bold hover:bg-slate-50 transition-all">
                    再抽一次
                  </button>
                  <button 
                    onClick={async () => {
                      if (!reportRef.current) return;
                      setLoading(true);
                      try {
                        const canvas = await html2canvas(reportRef.current, { scale: 3, useCORS: true, backgroundColor: "#FDFBF7" });
                        const link = document.createElement('a');
                        link.download = `2026马年开运-${remedy.name}.png`;
                        link.href = canvas.toDataURL();
                        link.click();
                      } finally {
                        setLoading(false);
                      }
                    }} 
                    className="flex-[2] py-4 bg-[#A61B1B] text-white rounded-full font-bold shadow-lg hover:bg-[#8a1616] transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-download"></i> 保存图片发朋友圈
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-8 text-center no-print">
        <p className="text-xs text-slate-400 font-serif tracking-widest">© 2026 马年 · 灵感特调厅</p>
      </footer>
    </div>
  );
}
