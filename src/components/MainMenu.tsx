import React, { useState } from 'react';
import { MatchMode } from '../types';
import { Trophy, Swords, Award, HelpCircle, Volume2, VolumeX, Globe, Star, Scale } from 'lucide-react';
import { getCountryFlag } from '../utils/flags';
import { LegalDisclaimerModal } from './LegalDisclaimerModal';

interface MainMenuProps {
  onSelectMode: (mode: MatchMode) => void;
  onOpenPlayers: () => void;
  onOpenTrophies: () => void;
  onOpenRules: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onSelectMode,
  onOpenPlayers,
  onOpenTrophies,
  onOpenRules,
  soundEnabled,
  onToggleSound,
}) => {
  const [showLegal, setShowLegal] = useState<boolean>(false);
  return (
    <div className="w-full h-full min-h-[100dvh] max-h-[100dvh] bg-[#040d08] relative overflow-hidden flex flex-col landscape:flex-row items-center justify-center p-2 sm:p-4 gap-3 landscape:gap-8 select-none">
      
      {/* 2026 Hosts Aesthetic Background (Canada, USA, Mexico) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex select-none">
        
        {/* Mexico Glowing Aura (Left) */}
        <div className="w-1/3 h-full bg-gradient-to-tr from-[#022c16]/30 via-emerald-900/10 to-transparent relative">
          <div className="absolute bottom-10 left-4 flex items-center text-[7px] sm:text-[9px] font-sports font-black text-emerald-400/40 tracking-[0.2em] uppercase rotate-90 origin-left">
            <img src={getCountryFlag('MEX')} className="w-3.5 h-2.5 rounded-sm object-cover inline-block mr-1 opacity-50 border border-white/10" />
            <span>MÉXICO</span>
          </div>
        </div>
        
        {/* USA Glowing Aura (Center) */}
        <div className="w-1/3 h-full bg-gradient-to-t from-blue-950/25 via-red-950/10 to-transparent relative border-x border-white/5">
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center text-[7px] sm:text-[9px] font-sports font-black text-blue-400/40 tracking-[0.2em] uppercase whitespace-nowrap">
            <img src={getCountryFlag('USA')} className="w-3.5 h-2.5 rounded-sm object-cover inline-block mr-1 opacity-50 border border-white/10" />
            <span>USA 2026</span>
          </div>
        </div>
        
        {/* Canada Glowing Aura (Right) */}
        <div className="w-1/3 h-full bg-gradient-to-tl from-rose-950/30 via-rose-900/10 to-transparent relative">
          <div className="absolute bottom-10 right-4 flex items-center text-[7px] sm:text-[9px] font-sports font-black text-rose-400/40 tracking-[0.2em] uppercase -rotate-90 origin-right whitespace-nowrap">
            <img src={getCountryFlag('CAN')} className="w-3.5 h-2.5 rounded-sm object-cover inline-block mr-1 opacity-50 border border-white/10" />
            <span>CANADA</span>
          </div>
        </div>

      </div>

      {/* Grid Pattern Mesh */}
      <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020704] via-transparent to-[#020704]/90 pointer-events-none z-0" />

      {/* Left Column: Brand & Trophy */}
      <div className="relative z-10 flex flex-col items-center text-center animate-pop shrink-0">
        
        {/* Host Cities & Countries Aesthetic Banner */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-1.5 sm:mb-3 bg-black/60 backdrop-blur-md px-3 sm:px-4 py-0.5 sm:py-1 rounded-full border border-emerald-500/20 shadow">
          <div className="flex items-center space-x-1">
            <img src={getCountryFlag('CAN')} className="w-3.5 h-2.5 rounded-sm object-cover shadow border border-white/15" />
            <span className="text-slate-300 text-[8px] sm:text-[10px] font-sports font-bold uppercase">CAN</span>
          </div>
          <span className="text-amber-500 font-extrabold text-[9px] animate-pulse">★</span>
          <div className="flex items-center space-x-1">
            <img src={getCountryFlag('USA')} className="w-3.5 h-2.5 rounded-sm object-cover shadow border border-white/15" />
            <span className="text-slate-300 text-[8px] sm:text-[10px] font-sports font-bold uppercase">USA</span>
          </div>
          <span className="text-amber-500 font-extrabold text-[9px] animate-pulse">★</span>
          <div className="flex items-center space-x-1">
            <img src={getCountryFlag('MEX')} className="w-3.5 h-2.5 rounded-sm object-cover shadow border border-white/15" />
            <span className="text-slate-300 text-[8px] sm:text-[10px] font-sports font-bold uppercase">MEX</span>
          </div>
        </div>

        {/* Animated Golden Trophy Icon */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-b from-yellow-300 to-amber-500 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-1 sm:mb-2 transform -rotate-4 hover:rotate-0 transition-transform duration-300 cursor-pointer group">
          <span className="text-3xl sm:text-4xl md:text-5xl drop-shadow group-hover:scale-110 transition duration-150">🏆</span>
        </div>
        
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-sports tracking-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.85)] leading-none uppercase">
          SQUAD SWAP
        </h1>
        
        <div className="mt-1 sm:mt-1.5 inline-block bg-red-600 border border-black sm:border-2 px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-yellow-300 font-sports font-black tracking-widest text-[9px] sm:text-xs uppercase">
            🏆 MUNDO COPA 2026 🏆
          </span>
        </div>
      </div>

      {/* Right Column: Arcade Menu Buttons */}
      <div className="relative z-10 flex flex-col w-full max-w-[260px] sm:max-w-xs md:max-w-sm gap-2 sm:gap-2.5 px-1 sm:px-2 animate-card-drop shrink-0">
        
        {/* WORLD CUP MODE */}
        <button
          onClick={() => onSelectMode('WORLD_CUP')}
          className="w-full py-2 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 flex items-center justify-center space-x-2.5 text-white font-sports font-black text-xs sm:text-base md:text-lg tracking-wider uppercase group relative overflow-hidden"
        >
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 transform group-hover:scale-125 group-hover:rotate-12 transition duration-200 shrink-0" />
          <span>WORLD CUP MODE</span>
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-950 font-sports font-black text-[6px] sm:text-[7px] px-1 py-0.2 rounded border border-black uppercase rotate-6">
            HOT
          </span>
        </button>

        {/* Play Tournament */}
        <button
          onClick={() => onSelectMode('TOURNAMENT')}
          className="w-full py-2 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-yellow-400 hover:bg-yellow-300 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 flex items-center justify-center space-x-2.5 text-black font-sports font-black text-xs sm:text-base md:text-lg tracking-wider uppercase group"
        >
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-black transform group-hover:scale-125 transition shrink-0" />
          <span>TOURNAMENT (K.O.)</span>
        </button>

        {/* Play Quick Match */}
        <button
          onClick={() => onSelectMode('QUICK_MATCH')}
          className="w-full py-2 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-emerald-500 hover:bg-emerald-400 border-2 sm:border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150 flex items-center justify-center space-x-2.5 text-black font-sports font-black text-xs sm:text-base md:text-lg tracking-wider uppercase group"
        >
          <Swords className="w-4 h-4 sm:w-5 sm:h-5 text-black transform group-hover:scale-125 transition shrink-0" />
          <span>QUICK MATCH</span>
        </button>

        {/* ONLINE MODE (COMING SOON) */}
        <button
          disabled
          className="w-full py-1.5 sm:py-2 px-4 rounded-xl bg-slate-800/80 border-2 sm:border-3 border-slate-700/60 text-slate-500 font-sports font-black text-[10px] sm:text-xs tracking-wider uppercase cursor-not-allowed flex items-center justify-center space-x-2 opacity-70 relative overflow-hidden"
        >
          <Globe className="w-3.5 h-3.5 text-slate-500" />
          <span>ONLINE MULTIPLAYER</span>
          <span className="bg-amber-500/20 text-amber-300 text-[6px] px-1 py-0.2 rounded border border-amber-500/30 uppercase animate-pulse">
            SOON
          </span>
        </button>

        {/* Play-stats buttons */}
        <div className="grid grid-cols-3 gap-1.5 mt-0.5">
          <button
            onClick={onOpenTrophies}
            className="py-1.5 sm:py-2 px-1 rounded-lg bg-amber-500 hover:bg-amber-400 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition duration-150 flex items-center justify-center space-x-1 text-black font-sports font-black text-[8px] sm:text-[10px] uppercase group"
          >
            <Trophy className="w-3 h-3 text-black transform group-hover:scale-110 transition shrink-0" />
            <span className="tracking-tight">TROPHIES</span>
          </button>

          <button
            onClick={onOpenPlayers}
            className="py-1.5 sm:py-2 px-1 rounded-lg bg-blue-600 hover:bg-blue-500 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition duration-150 flex items-center justify-center space-x-1 text-white font-sports font-black text-[8px] sm:text-[10px] uppercase group"
          >
            <Star className="w-3 h-3 text-yellow-300 transform group-hover:scale-110 transition shrink-0" />
            <span className="tracking-tight">PLAYERS</span>
          </button>

          <button
            onClick={onOpenRules}
            className="py-1.5 sm:py-2 px-1 rounded-lg bg-purple-600 hover:bg-purple-500 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition duration-150 flex items-center justify-center space-x-1 text-white font-sports font-black text-[8px] sm:text-[10px] uppercase group"
          >
            <HelpCircle className="w-3 h-3 text-white transform group-hover:scale-110 transition shrink-0" />
            <span className="tracking-tight">RULES</span>
          </button>
        </div>

      </div>

      {/* Audio Toggle Bottom Corner */}
      <button
        onClick={onToggleSound}
        className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-900 border-2 border-black shadow text-yellow-400 hover:bg-slate-800 transition z-20 active:scale-95"
        title={soundEnabled ? 'Mute sound' : 'Unmute sound'}
      >
        {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />}
      </button>

      {/* Version & Credits Footer */}
      <div className="absolute bottom-2 left-2 text-[7px] sm:text-[8px] font-sports font-bold text-slate-400/80 flex items-center space-x-1 z-10">
        <span>2D RETRO SOCCER</span>
        <span className="text-emerald-500">•</span>
        <span>USA-CAN-MEX 2026</span>
      </div>

      {/* Legal Disclaimer Modal */}
      {showLegal && (
        <LegalDisclaimerModal onClose={() => setShowLegal(false)} />
      )}
    </div>
  );
};
