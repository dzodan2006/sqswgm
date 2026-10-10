import React from 'react';
import { GameStats } from '../types';
import { Trophy, X, Lock, Flame, Globe, Sparkles, Award } from 'lucide-react';

interface TrophiesModalProps {
  stats: GameStats;
  onClose: () => void;
}

interface TrophyDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedColor: string;
  check: (s: GameStats) => boolean;
}

export const TrophiesModal: React.FC<TrophiesModalProps> = ({ stats, onClose }) => {
  const trophies: TrophyDef[] = [
    {
      id: 'first_win',
      title: 'First Win ⚽',
      description: 'Get your first win in any game mode!',
      icon: '🥇',
      unlockedColor: 'from-amber-400 to-yellow-500 text-black',
      check: (s) => s.totalWins >= 1,
    },
    {
      id: 'five_wins',
      title: 'High Five 🖐️',
      description: 'Reach a total of 5 wins!',
      icon: '🥈',
      unlockedColor: 'from-slate-300 to-slate-400 text-slate-900',
      check: (s) => s.totalWins >= 5,
    },
    {
      id: 'ten_wins',
      title: 'Golden Ten ⭐',
      description: 'Reach a total of 10 wins!',
      icon: '🏆',
      unlockedColor: 'from-yellow-400 to-amber-500 text-black',
      check: (s) => s.totalWins >= 10,
    },
    {
      id: 'hundred_wins',
      title: 'Club Legend 👑',
      description: 'Reach a total of 100 wins!',
      icon: '🤴',
      unlockedColor: 'from-purple-500 via-pink-500 to-red-500 text-white',
      check: (s) => s.totalWins >= 100,
    },
    {
      id: 'streak_3',
      title: 'On Fire 🔥',
      description: 'Achieve a 3-game winning streak!',
      icon: '🔥',
      unlockedColor: 'from-orange-500 to-red-600 text-white',
      check: (s) => s.maxStreak >= 3,
    },
    {
      id: 'streak_5',
      title: 'Unstoppable ⚡',
      description: 'Achieve a 5-game winning streak!',
      icon: '⚡',
      unlockedColor: 'from-red-500 via-orange-500 to-yellow-500 text-black',
      check: (s) => s.maxStreak >= 5,
    },
    {
      id: 'streak_10',
      title: 'Invincible Maestro 💫',
      description: 'Achieve a 10-game winning streak!',
      icon: '🪐',
      unlockedColor: 'from-cyan-400 via-blue-500 to-indigo-600 text-white',
      check: (s) => s.maxStreak >= 10,
    },
    {
      id: 'tournament_win_1',
      title: 'Cup Champion 🥛',
      description: 'Win the golden cup in TOURNAMENT (K.O.) mode!',
      icon: '🏺',
      unlockedColor: 'from-amber-300 to-yellow-500 text-black',
      check: (s) => s.tournamentWins >= 1,
    },
    {
      id: 'tournament_win_5',
      title: 'Tournament King 🌟',
      description: 'Win 5 golden cups in TOURNAMENT (K.O.) mode!',
      icon: '👑',
      unlockedColor: 'from-teal-400 to-emerald-600 text-white',
      check: (s) => s.tournamentWins >= 5,
    },
    {
      id: 'worldcup_win_1',
      title: 'World Champion 2026 🌍',
      description: 'Win the World Cup in WORLD CUP mode!',
      icon: '🌍',
      unlockedColor: 'from-emerald-400 to-green-600 text-white',
      check: (s) => s.worldCupWins >= 1,
    },
    {
      id: 'worldcup_win_5',
      title: 'Ruler of the Planet 🪐',
      description: 'Win 5 World Cup championships!',
      icon: '🌌',
      unlockedColor: 'from-violet-600 via-fuchsia-600 to-indigo-700 text-white',
      check: (s) => s.worldCupWins >= 5,
    },
  ];

  const unlockedCount = trophies.filter((t) => t.check(stats)).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none animate-pop">
      <div className="w-full max-w-4xl bg-[#111e16] border-4 border-black rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-4 border-black mb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-400 border-2 border-black rounded-xl text-black">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-sports tracking-tight text-white uppercase">
                TROPHY MUSEUM
              </h2>
              <p className="text-xs text-yellow-300 font-sports uppercase tracking-wider">
                Unlocked: {unlockedCount} / {trophies.length} Trophies
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-red-600 hover:bg-red-500 border-2 border-black rounded-xl text-white shadow active:translate-y-0.5 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mini Stats Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4 shrink-0 bg-black/40 border border-slate-800/60 p-3 rounded-xl text-center font-mono text-xs text-slate-300">
          <div>
            <span className="block text-slate-500 uppercase text-[9px]">Wins</span>
            <span className="text-sm font-black text-white">{stats.totalWins}</span>
          </div>
          <div>
            <span className="block text-slate-500 uppercase text-[9px]">Current Streak</span>
            <span className="text-sm font-black text-orange-400">🔥 {stats.currentStreak}</span>
          </div>
          <div>
            <span className="block text-slate-500 uppercase text-[9px]">Max Streak</span>
            <span className="text-sm font-black text-yellow-400">⚡ {stats.maxStreak}</span>
          </div>
          <div>
            <span className="block text-slate-500 uppercase text-[9px]">Cups (K.O.)</span>
            <span className="text-sm font-black text-amber-400">🏆 {stats.tournamentWins}</span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="block text-slate-500 uppercase text-[9px]">World Cup</span>
            <span className="text-sm font-black text-emerald-400">🌍 {stats.worldCupWins}</span>
          </div>
        </div>

        {/* Trophies Grid */}
        <div className="overflow-y-auto flex-1 py-2 pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {trophies.map((t) => {
            const isUnlocked = t.check(stats);
            return (
              <div
                key={t.id}
                className={`relative border-2 rounded-xl p-3 flex items-center space-x-3.5 transition duration-150 ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-emerald-950/20 to-slate-900/40 border-emerald-500/30 shadow-[0_4px_12px_rgba(16,185,129,0.05)]'
                    : 'bg-slate-950/50 border-slate-900 opacity-60'
                }`}
              >
                {/* Trophy Badge */}
                <div
                  className={`w-14 h-14 shrink-0 border-2 border-black rounded-xl flex items-center justify-center text-3xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] select-none ${
                    isUnlocked ? `bg-gradient-to-br ${t.unlockedColor}` : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isUnlocked ? t.icon : <Lock className="w-5 h-5 text-slate-600" />}
                </div>

                {/* Trophy Details */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-sm sm:text-base font-black font-sports uppercase tracking-tight truncate ${
                      isUnlocked ? 'text-white' : 'text-slate-500'
                    }`}
                  >
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-tight mt-0.5">
                    {t.description}
                  </p>
                  
                  {/* Status Indicator */}
                  <div className="mt-1 flex items-center">
                    {isUnlocked ? (
                      <span className="inline-flex items-center px-1.5 py-0.2 bg-emerald-500/10 text-emerald-400 text-[9px] font-sports font-bold rounded uppercase border border-emerald-500/20">
                        <Sparkles className="w-2.5 h-2.5 mr-1" />
                        UNLOCKED
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-1.5 py-0.2 bg-slate-900 text-slate-500 text-[9px] font-sports font-bold rounded uppercase border border-slate-800">
                        LOCKED
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-3 border-t-2 border-black text-center text-[11px] font-sports text-yellow-300 uppercase tracking-widest">
          🏆 Play and win matches to complete your Trophy Museum!
        </div>

      </div>
    </div>
  );
};
