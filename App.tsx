
import React, { useState, useEffect, useRef } from 'react';
import { AppStep, OHCard, RemedyResult, SPREADS, Spread } from './types';
import { geminiService } from './services/geminiService';
import { extractColorsFromImage } from './utils/colorExtractor';

const AudioController: React.FC<{ isPlaying: boolean; setIsPlaying: (v: boolean) => void }> = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3'); 
    audio.loop = true;
    audio.volume = 0.15;
    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  return (
    <button 
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-white/80 backdrop-blur-xl rounded-full flex items-center justify-center text-[#A61B1B] hover:bg-[#A61B1B] hover:text-white transition-all duration-700 shadow-2xl no-print border border-[#E8C68E]/30"
      title="背景氛围"
    >
      <div className={isPlaying ? 'animate-pulse' : ''}>
        <i className={`fas ${isPlaying ? 'fa-spa' : 'fa-play'} text-lg`}></i>
      </div>
    </button>
  );
};

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [selectedSpread, setSelectedSpread] = useState<Spread | null>(null);
  const [cards, setCards] = useState<OHCard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [remedy, setRemedy] = useState<RemedyResult | null>(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const resetToHome = () => {
    setStep(AppStep.WELCOME);
    setSelectedSpread(null);
    setCards([]);
    setCurrentCardIndex(0);
    setRemedy(null);
    setLoading(false);
    setErrorMsg(null);
  };

  const startRitual = async (spread: Spread) => {
    setMusicPlaying(true);
    setSelectedSpread(spread);
    setLoading(true);
    setErrorMsg(null);
    try {
      const urls = await geminiService.generateOHCards(3);
      if (!urls || urls.length === 0) {
        throw new Error("无法生成觉察卡片，请稍后重试");
      }
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
      console.error("加载失败", error); 
      setErrorMsg("与潜意识的连接暂时中断，请重新开启探索");
    } finally { 
      setLoading(false); 
    }
  };

  const flipCard = (id: string) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));
  };

  const handleSaveImage = () => {
    window.print();
  };

  return (
    <div className="min-h-screen text-[#1A1A1A] font-sans selection:bg-[#A61B1B]/10">
      <AudioController isPlaying={musicPlaying} setIsPlaying={setMusicPlaying} />
      
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FDFBF7]/95 backdrop-blur-3xl">
          <div className="relative w-28 h-28 flex items-center justify-center">
             <div className="absolute inset-0 border-[2px] border-[#A61B1B]/10 border-t-[#A61B1B] rounded-full animate-spin"></div>
             <div className="w-16 h-16 bg-[#A61B1B]/5 rounded-full flex items-center justify-center">
                <i className="fas fa-seedling text-[#A61B1B] animate-bounce"></i>
             </div>
          </div>
          <p className="mt-10 text-[#A61B1B] text-sm tracking-[0.4em] font-serif uppercase">正在建立心灵连接...</p>
        </div>
      )}

      {errorMsg && (
        <div className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
          <div className="p-12 text-center space-y-8 max-w-md">
            <i className="fas fa-exclamation-circle text-4xl text-[#A61B1B]"></i>
            <p className="text-xl font-serif">{errorMsg}</p>
            <button onClick={resetToHome} className="px-10 py-4 bg-[#A61B1B] text-white rounded-full">返回首页</button>
          </div>
        </div>
      )}

      {step === AppStep.WELCOME && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 reveal-up no-print">
          <div className="max-w-4xl text-center space-y-16">
            <div className="space-y-6">
              <div className="flex justify-center gap-3 mb-6">
                 <span className="w-12 h-[1px] bg-[#A61B1B]/20 self-center"></span>
                 <span className="text-[#A61B1B] text-xs font-bold tracking-[0.6em] uppercase">2025 · 乙巳新春觉察</span>
                 <span className="w-12 h-[1px] bg-[#A61B1B]/20 self-center"></span>
              </div>
              <h1 className="text-7xl font-serif text-[#1A1A1A] tracking-[0.2em] font-medium leading-tight relative inline-block">
                OH卡 · 觉察之旅
                <div className="absolute -right-12 -top-6 text-[#A61B1B]/20 text-4xl rotate-12 font-serif">福</div>
              </h1>
            </div>
            <p className="text-2xl leading-loose text-slate-500 font-light px-12 max-w-2xl mx-auto font-serif">
              在这岁序更迭、万象更新之际，<br/>
              让我们借由卡片的镜像，<br/>
              去触摸潜意识里那抹最真实的生命底色。
            </p>
            <button 
              onClick={() => setStep(AppStep.SELECT_SPREAD)}
              className="group relative px-20 py-7 bg-[#A61B1B] text-white rounded-full text-sm font-medium tracking-[0.6em] overflow-hidden transition-all shadow-xl hover:shadow-[#A61B1B]/60"
            >
              <span className="relative z-10">开启探索</span>
              <div className="absolute inset-0 bg-[#E8C68E] translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      )}

      {step === AppStep.SELECT_SPREAD && (
        <div className="max-w-6xl mx-auto p-12 py-32 reveal-up no-print">
          <div className="text-center mb-24 space-y-8">
            <h2 className="text-4xl text-[#1A1A1A] font-serif tracking-[0.1em]">请选择觉察的主题</h2>
            <div className="flex justify-center gap-3">
              {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 bg-[#A61B1B]/30 rounded-full rotate-45"></div>)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {SPREADS.map(spread => (
              <div 
                key={spread.id}
                onClick={() => startRitual(spread)}
                className="p-12 cursor-pointer group bg-white border border-[#E8C68E]/20 hover:border-[#A61B1B]/40 hover:-translate-y-4 transition-all duration-700 rounded-[3rem] shadow-sm hover:shadow-2xl text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#A61B1B]/5 flex items-center justify-center mb-10 mx-auto group-hover:bg-[#A61B1B] group-hover:text-white transition-all duration-500">
                  <i className={`fas ${spread.icon} text-xl`}></i>
                </div>
                <h3 className="text-2xl font-serif mb-6 text-slate-800 tracking-wide">{spread.name}</h3>
                <p className="text-slate-400 text-sm leading-loose font-light">{spread.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === AppStep.DRAWING && (
        <div className="max-w-6xl mx-auto p-12 py-24 reveal-up text-center no-print">
          <div className="mb-20 space-y-4">
             <span className="text-[10px] font-bold text-[#A61B1B] tracking-[0.5em] uppercase">主题：{selectedSpread?.name}</span>
             <h2 className="text-3xl text-slate-700 font-serif tracking-widest">请依次点开卡片</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {cards.length > 0 ? cards.map(card => (
              <div key={card.id} className="card-flip-container w-full h-[480px] cursor-pointer" onClick={() => flipCard(card.id)}>
                <div className={`card-inner h-full ${card.isFlipped ? 'flipped' : ''}`}>
                  <div className="card-back shadow-xl border border-[#E8C68E]/20 relative">
                    <div className="absolute inset-4 border border-[#E8C68E]/10 rounded-xl"></div>
                    <div className="w-4 h-4 bg-[#A61B1B]/10 rounded-full mb-8 rotate-45"></div>
                    <p className="text-[#A61B1B]/30 font-serif tracking-[0.6em] text-sm uppercase">{card.positionLabel}</p>
                  </div>
                  <div className="card-front">
                    <img src={card.imageUrl} alt="OH卡" className="w-full h-full object-cover rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#A61B1B]/50 via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-10 text-white text-left">
                       <p className="text-[10px] opacity-60 mb-2 tracking-[0.4em] uppercase">POS</p>
                       <p className="text-2xl font-serif tracking-widest">{card.positionLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            )) : <p>生成中...</p>}
          </div>
          {(cards.length > 0 && cards.every(c => c.isFlipped)) && (
            <button 
              onClick={() => setStep(AppStep.INTERPRETATION)}
              className="mt-28 px-16 py-6 bg-[#1A1A1A] text-white rounded-full text-xs font-medium tracking-[0.6em] shadow-2xl hover:bg-[#A61B1B] transition-all duration-700"
            >
              开启深度解读
            </button>
          )}
        </div>
      )}

      {step === AppStep.INTERPRETATION && (
        <div className="max-w-6xl mx-auto p-12 py-24 reveal-up no-print">
          <div className="bg-white/95 backdrop-blur-3xl rounded-[4rem] p-20 shadow-2xl border border-[#E8C68E]/10">
            <div className="flex flex-col lg:flex-row gap-24 items-start">
              <div className="w-full lg:w-[48%] rounded-3xl overflow-hidden shadow-2xl border-[12px] border-white relative">
                 <img src={cards[currentCardIndex].imageUrl} alt="意象" className="w-full aspect-[3/4] object-cover" />
                 <div className="absolute inset-0 pointer-events-none border border-black/5 rounded-2xl"></div>
              </div>
              <div className="w-full lg:w-[52%] space-y-16 py-4">
                <header className="space-y-6">
                  <div className="flex items-center gap-6">
                    <span className="text-[11px] font-bold text-[#A61B1B] tracking-[0.6em] uppercase">觉察阶段 {currentCardIndex + 1} / 3</span>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-[#A61B1B]/30 to-transparent"></div>
                  </div>
                  <h2 className="text-5xl font-serif text-[#1A1A1A] tracking-wider leading-tight">{cards[currentCardIndex].positionLabel}</h2>
                  <p className="text-slate-500 text-xl font-light leading-loose font-serif">{cards[currentCardIndex].positionDescription}</p>
                </header>
                <div className="space-y-6">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.5em] block">这一意象勾起了怎样的感触？</label>
                  <textarea 
                    value={cards[currentCardIndex].interpretation}
                    onChange={(e) => setCards(prev => prev.map((c, i) => i === currentCardIndex ? { ...c, interpretation: e.target.value } : c))}
                    placeholder="让文字自然流淌，记录下最初的共鸣..."
                    className="w-full h-48 bg-[#FDFBF7]/80 border border-[#E8C68E]/10 rounded-[2.5rem] p-10 text-xl font-serif text-slate-700 focus:bg-white focus:ring-4 focus:ring-[#A61B1B]/5 outline-none transition-all resize-none placeholder:text-slate-200"
                  />
                </div>
                <div className="space-y-8">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.5em] block">感知底色</label>
                  <div className="flex flex-wrap gap-6">
                    {cards[currentCardIndex].extractedColors.map(color => (
                      <button
                        key={color}
                        onClick={() => setCards(prev => prev.map((c, i) => i === currentCardIndex ? { ...c, selectedColor: color } : c))}
                        className={`w-14 h-14 rounded-full border-4 transition-all duration-700 ${cards[currentCardIndex].selectedColor === color ? 'border-[#A61B1B] scale-125 shadow-2xl' : 'border-transparent opacity-20 hover:opacity-100'}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                <button 
                  onClick={() => currentCardIndex < 2 ? setCurrentCardIndex(prev => prev + 1) : setStep(AppStep.MIXING)}
                  disabled={!cards[currentCardIndex].interpretation}
                  className="px-16 py-6 bg-[#A61B1B] text-white rounded-full text-xs font-bold tracking-[0.6em] shadow-xl disabled:opacity-30 transition-all duration-700 hover:scale-105"
                >
                  {currentCardIndex < 2 ? '继续觉察' : '整合心灵画报'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === AppStep.MIXING && (
        <div className="flex flex-col items-center justify-center min-h-screen p-12 reveal-up no-print">
          <div className="mb-24 text-center space-y-8">
            <h2 className="text-4xl text-[#1A1A1A] font-serif tracking-[0.3em]">万象更新，共谱新章</h2>
            <p className="text-[12px] text-[#A61B1B] font-light tracking-[0.6em] uppercase">INTEGRATING NEW YEAR AWARENESS</p>
          </div>
          <div className="relative w-64 h-80 border-x border-b border-[#E8C68E]/30 rounded-b-[6rem] overflow-hidden bg-white/40 backdrop-blur-3xl shadow-2xl">
             <div className="absolute bottom-0 left-0 w-full transition-all duration-[3000ms]" style={{ height: '33.3%', backgroundColor: cards[0]?.selectedColor || '#eee' }} />
             <div className="absolute bottom-[33.3%] left-0 w-full transition-all duration-[3000ms]" style={{ height: '33.3%', backgroundColor: cards[1]?.selectedColor || '#ddd' }} />
             <div className="absolute bottom-[66.6%] left-0 w-full transition-all duration-[3000ms]" style={{ height: '33.3%', backgroundColor: cards[2]?.selectedColor || '#ccc' }} />
             <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/20"></div>
          </div>
          <button 
            onClick={async () => {
              setLoading(true);
              try {
                const res = await geminiService.generateRemedy(cards, selectedSpread!);
                setRemedy(res);
                setStep(AppStep.REMEDY);
              } catch (e) {
                setErrorMsg("报告生成失败，请点击重试");
              } finally {
                setLoading(false);
              }
            }}
            className="mt-28 px-20 py-7 bg-[#A61B1B] text-white rounded-full text-sm font-bold tracking-[0.8em] shadow-2xl hover:bg-[#8B1A1A] transition-all"
          >
            获取我的觉察报告
          </button>
        </div>
      )}

      {step === AppStep.REMEDY && remedy && (
        <div className="max-w-7xl mx-auto p-12 py-24 flex flex-col lg:flex-row gap-24 items-center reveal-up remedy-poster">
          <div className="w-full lg:w-[45%] flex justify-center no-print">
             <div className="relative w-80 h-[560px] border-x border-b-8 border-[#E8C68E]/30 rounded-b-[10rem] overflow-hidden bg-white/40 shadow-2xl backdrop-blur-3xl">
                <div 
                  className="absolute bottom-0 left-0 w-full h-full opacity-70 transition-all duration-[5000ms]"
                  style={{ background: `linear-gradient(to top, ${cards[0]?.selectedColor}, ${cards[1]?.selectedColor}, ${cards[2]?.selectedColor})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent"></div>
             </div>
          </div>
          <div className="w-full lg:w-[55%]">
            <div className="bg-white/95 rounded-[4rem] p-20 shadow-2xl border border-[#E8C68E]/10 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 p-16 opacity-[0.03]">
                <i className="fas fa-fan text-[20rem] text-[#A61B1B] animate-spin-slow"></i>
              </div>
              <div className="flex justify-between items-start mb-16">
                 <span className="text-[12px] font-bold text-[#A61B1B] tracking-[0.6em] uppercase block">2025 · 乙巳觉察画报</span>
                 <div className="w-12 h-12 border border-[#A61B1B]/20 rounded-full flex items-center justify-center text-[#A61B1B] text-[10px] font-serif rotate-12">贰伍</div>
              </div>
              <h1 className="text-6xl font-serif text-[#1A1A1A] mb-10 leading-tight tracking-wide">{remedy.name}</h1>
              <p className="text-3xl text-[#A61B1B] italic mb-12 font-serif font-light">“{remedy.vibe}”</p>
              <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#E8C68E]/50 to-transparent mb-16"></div>
              <p className="text-2xl text-slate-700 leading-relaxed font-light mb-20 font-serif">{remedy.description}</p>
              <div className="space-y-10 mb-24">
                <p className="text-[11px] font-bold text-slate-400 tracking-[0.6em] uppercase">内在生命力构成</p>
                <div className="flex flex-wrap gap-6">
                  {remedy.ingredients.map((ing, i) => (
                    <span key={i} className="px-8 py-4 bg-[#A61B1B]/5 border border-[#E8C68E]/20 text-[#A61B1B]/80 rounded-2xl text-base font-serif font-light">{ing}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-10 no-print">
                <button onClick={resetToHome} className="px-14 py-6 bg-[#1A1A1A] text-white rounded-full text-xs font-bold tracking-[0.5em] shadow-xl hover:bg-black transition-all hover:scale-105">再次探索</button>
                <button onClick={handleSaveImage} className="px-14 py-6 border-2 border-[#A61B1B] text-[#A61B1B] rounded-full text-xs font-bold tracking-[0.5em] hover:bg-[#A61B1B] hover:text-white transition-all shadow-xl hover:scale-105">存为画报 (打印)</button>
              </div>
              <div className="hidden print:block mt-20 pt-10 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-300 tracking-[0.5em] font-serif font-light">OH卡 · 觉察之旅 · 2025 新春特制</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
