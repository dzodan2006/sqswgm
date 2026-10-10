import React from 'react';
import { Volume2, VolumeX, Trophy, HelpCircle, RotateCcw, Swords } from 'lucide-react';
import { MatchMode } from '../types';

interface NavbarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenRules: () => void;
  onRestart: () => void;
  matchMode: MatchMode;
  onSelectMode: (mode: MatchMode) => void;
  coachName: string;
  minute: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenRules,
  onRestart,
  matchMode,
  onSelectMode,
  coachName,
  minute,
}) => {
  return (
    <header className="w-full bg-black border-b-4 border-yellow-500 px-3 py-1.5 sm:px-6 sm:py-2 flex items-center justify-between shadow-md z-30 select-none shrink-0">
      {/* Brand & Logo */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-yellow-400 border-2 border-black flex items-center justify-center shadow">
          <span className="text-lg sm:text-xl transform -rotate-12">⚽</span>
        </div>
        <div>
          <h1 className="text-sm sm:text-lg font-black tracking-tight text-white uppercase font-sports leading-none">
            SQUAD SWAP <span className="text-yellow-400">2026</span>
          </h1>
          <p className="text-[10px] sm:text-xs text-slate-300 font-medium truncate max-w-[150px] sm:max-w-none leading-none mt-1">
            {matchMode === 'TOURNAMENT' ? '🏆 Tournament' : '⚡ Quick Match'} • <span className="text-yellow-400 font-bold">{coachName}</span>
          </p>
        </div>
      </div>

      {/* Match Clock Badge */}
      <div className="flex items-center space-x-2 bg-red-600 border-2 border-black px-3 py-0.5 rounded-md shadow text-white">
        <span className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
        <span className="text-xs sm:text-sm font-black font-sports tracking-wider">
          {minute}' <span className="text-red-200 text-[10px]">/ 90'</span>
        </span>
      </div>

      {/* Action Controls */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* Mode Switch Button */}
        <button
          onClick={() => onSelectMode(matchMode === 'TOURNAMENT' ? 'QUICK_MATCH' : 'TOURNAMENT')}
          className="px-2 py-1 sm:px-2.5 sm:py-1 rounded bg-slate-800 hover:bg-slate-700 border-2 border-black text-xs text-yellow-300 font-bold flex items-center space-x-1 shadow transition"
          title="Change game mode"
        >
          {matchMode === 'TOURNAMENT' ? <Trophy className="w-3.5 h-3.5" /> : <Swords className="w-3.5 h-3.5" />}
          <span className="hidden md:inline">{matchMode === 'TOURNAMENT' ? 'Tournament' : 'Quick Match'}</span>
        </button>

        {/* Rules Button */}
        <button
          onClick={onOpenRules}
          className="px-2 py-1 sm:px-2.5 sm:py-1 rounded bg-blue-600 hover:bg-blue-500 border-2 border-black text-white text-xs font-bold flex items-center space-x-1 shadow transition"
          title="Game Rules"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Rules</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-1 sm:p-1.5 rounded border-2 border-black shadow transition ${
            soundEnabled
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-700 text-slate-400'
          }`}
          title={soundEnabled ? 'Mute Sound' : 'Unmute Sound'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Restart Match */}
        <button
          onClick={onRestart}
          className="px-2 py-1 sm:px-2.5 sm:py-1 rounded bg-red-600 hover:bg-red-500 border-2 border-black text-white text-xs font-bold flex items-center space-x-1 shadow transition"
          title="New Game / Coach Select"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Game</span>
        </button>
      </div>
    </header>
  );
};
