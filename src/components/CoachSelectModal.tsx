import React from 'react';
import { Coach, MatchMode } from '../types';
import { OFFICIAL_COACHES } from '../data/coaches';
import { Trophy, Swords, Sparkles, Shield, Zap, Flame, Brain, ArrowLeft, ArrowRight, X } from 'lucide-react';

interface CoachSelectModalProps {
  onSelectCoach: (coach: Coach) => void;
  matchMode: MatchMode;
  onSelectMode: (mode: MatchMode) => void;
  onBack?: () => void;
}

export const CoachSelectModal: React.FC<CoachSelectModalProps> = ({
  onSelectCoach,
  matchMode,
  onSelectMode,
  onBack,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const getCoachIcon = (level: number) => {
    switch (level) {
      case 1:
        return <Sparkles className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Shield className="w-5 h-5 text-slate-400" />;
      case 3:
        return <Flame className="w-5 h-5 text-rose-500" />;
      case 4:
        return <Zap className="w-5 h-5 text-indigo-400" />;
      case 5:
        return <Brain className="w-5 h-5 text-sky-400" />;
      case 6:
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 7:
        return <Shield className="w-5 h-5 text-zinc-400" />;
      case 8:
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case 9:
        return <Brain className="w-5 h-5 text-violet-400" />;
      case 10:
        return <Trophy className="w-5 h-5 text-yellow-300 animate-pulse" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
      <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition active:scale-95 z-10"
            title="Back to main menu"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        
        {/* Header Title */}
        <div className="text-center mb-6">
          <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold rounded-full uppercase tracking-widest">
            WORLD CUP 2026
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-2 uppercase font-mono tracking-tight">
            Choose your opponent Coach
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-xl mx-auto">
            The match lasts <span className="text-emerald-400 font-bold">18 turns (90 minutes)</span>. Win as many cards as you can and claim victory using your <span className="text-amber-400 font-bold">Top 11 players</span> in the grand finale!
          </p>

          {/* Mode Switch Tabs */}
          {matchMode !== 'QUICK_MATCH' && (
            <div className="flex justify-center mt-4">
              <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex space-x-1">
                <button
                  onClick={() => onSelectMode('TOURNAMENT')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                    matchMode === 'TOURNAMENT'
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Trophy className="w-4 h-4" />
                  <span>Tournament Campaign</span>
                </button>
                <button
                  onClick={() => onSelectMode('QUICK_MATCH')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                    matchMode === 'QUICK_MATCH'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Swords className="w-4 h-4" />
                  <span>Free Pick (Quick Duel)</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Coach Carousel Slider (Slick horizontal scroll with next/prev buttons) */}
        <div className="relative group/carousel px-1 sm:px-4">
          {/* Scroll Left Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-3 bg-slate-950/90 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 p-2 sm:p-2.5 rounded-full border border-emerald-500/40 shadow-lg active:scale-95 transition-all z-20 cursor-pointer hidden md:flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 duration-300"
            title="Previous Coach"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          {/* Scroll Right Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-3 bg-slate-950/90 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 p-2 sm:p-2.5 rounded-full border border-emerald-500/40 shadow-lg active:scale-95 transition-all z-20 cursor-pointer hidden md:flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 duration-300"
            title="Next Coach"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Horizontal scroll container with custom scroll bar or no scrollbar on mobile */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 py-4 px-1 scroll-smooth snap-x snap-mandatory select-none"
            style={{ scrollbarWidth: 'thin', msOverflowStyle: 'none' }}
          >
            {OFFICIAL_COACHES.map((coach) => {
              return (
                <div
                  key={coach.id}
                  onClick={() => onSelectCoach(coach)}
                  className="bg-slate-950 border border-slate-800 hover:border-emerald-500/60 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer group hover:-translate-y-1.5 transition-all duration-300 shadow-lg relative overflow-hidden snap-start shrink-0 w-[200px] sm:w-[220px]"
                >
                  {/* Coach Badge Tag */}
                  <div className="w-full flex items-center justify-center mb-3">
                    {coach.id === 'coach_1' ? (
                      <span className="text-[10px] font-cartoon font-black px-2.5 py-0.5 rounded-full bg-yellow-400 text-black border-2 border-black uppercase shadow">
                        TUTORIAL
                      </span>
                    ) : (
                      <span className="text-[10px] font-cartoon font-black px-2.5 py-0.5 rounded-full bg-emerald-500 text-black border-2 border-black uppercase shadow">
                        TACTICIAN
                      </span>
                    )}
                  </div>

                  {/* Avatar Caricature */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-950 flex items-center justify-center text-4xl shadow-[0_6px_12px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.15)] border-3 border-yellow-500/95 group-hover:border-yellow-400 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 mb-3 relative overflow-hidden shrink-0">
                    {coach.image ? (
                      <img
                        src={coach.image.startsWith('/') ? `${import.meta.env.BASE_URL}${coach.image.slice(1)}` : coach.image}
                        alt={coach.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">{coach.emoji}</span>
                    )}
                  </div>

                  {/* Names */}
                  <h3 className="font-cartoon text-white text-base font-black uppercase tracking-tight leading-tight line-clamp-1 w-full mb-1">
                    {coach.name}
                  </h3>

                  {/* Difficulty & Tactic */}
                  <span className="text-[9px] font-cartoon font-black text-amber-300 bg-amber-950/70 border-2 border-amber-500/40 px-2.5 py-0.5 rounded-full mb-2.5 truncate w-full">
                    {coach.difficulty}
                  </span>

                  <p className="text-[11px] text-slate-300 leading-relaxed line-clamp-3 mt-1 flex-1 h-12">
                    {coach.tacticDescription}
                  </p>

                  {/* Select Button */}
                  <button className="mt-3 w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-cartoon font-black text-xs uppercase tracking-wider transition-all duration-200 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    Select Coach
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-slate-500">
          💡 Tip: You make the first move, then you take turns playing first on each subsequent round!
        </div>

        {onBack && (
          <div className="mt-5 flex justify-center">
            <button
              onClick={onBack}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-300 font-sports font-black text-xs uppercase shadow tracking-wider active:scale-95 transition flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Main Menu</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
