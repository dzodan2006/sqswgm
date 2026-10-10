import React, { useEffect, useState } from 'react';
import { Card, Coach, MatchMode } from '../types';
import { CardView } from './CardView';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Sparkles, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface GameOverModalProps {
  playerWonDeck: Card[];
  opponentWonDeck: Card[];
  coach: Coach;
  matchMode: MatchMode;
  onRestart: () => void;
}

const FallingParticles: React.FC<{ type: 'victory' | 'defeat' }> = ({ type }) => {
  const [particles, setParticles] = React.useState<Array<{ id: number; char: string; left: number; delay: number; duration: number; size: number }>>([]);

  React.useEffect(() => {
    const chars = type === 'victory' 
      ? ['🏆', '⚽', '⭐', '🔥', '✨', '👑', '🎉', '🥇'] 
      : ['😭', '💔', '🌧️', '🟥', '⚽', '🥀', '💤', '🟨'];
    
    const list = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 5,
      size: 16 + Math.random() * 24,
    }));
    setParticles(list);
  }, [type]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-center opacity-0 select-none pointer-events-none"
          style={{
            left: `${p.left}%`,
            top: `-50px`,
            fontSize: `${p.size}px`,
            animation: `fall ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.char}
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          90% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export const GameOverModal: React.FC<GameOverModalProps> = ({
  playerWonDeck,
  opponentWonDeck,
  coach,
  matchMode,
  onRestart,
}) => {
  const [activeTab, setActiveTab] = useState<'PLAYER' | 'OPPONENT'>('PLAYER');

  // Select Top 11 sorted by rating descending
  const getTop11 = (deck: Card[]) => {
    return [...deck].sort((a, b) => b.rating - a.rating).slice(0, 11);
  };

  const playerTop11 = getTop11(playerWonDeck);
  const opponentTop11 = getTop11(opponentWonDeck);

  const playerTop11Score = playerTop11.reduce((acc, c) => acc + c.rating, 0);
  const opponentTop11Score = opponentTop11.reduce((acc, c) => acc + c.rating, 0);

  const isPlayerChamp = playerTop11Score >= opponentTop11Score;

  useEffect(() => {
    if (isPlayerChamp) {
      soundFx.playGoalFanfare();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899'],
        });
      } catch {}
    } else {
      soundFx.playWhistle();
    }
  }, [isPlayerChamp]);

  const currentTop11 = activeTab === 'PLAYER' ? playerTop11 : opponentTop11;

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-lg z-50 flex items-center justify-center p-3 sm:p-6 select-none overflow-y-auto">
      <FallingParticles type={isPlayerChamp ? 'victory' : 'defeat'} />
      <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-3xl max-w-5xl w-full p-4 sm:p-8 shadow-2xl relative flex flex-col my-6 z-10">
        
        {/* Match Final Banner */}
        <div className="text-center">
          <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/40 text-amber-400 font-mono text-xs font-black rounded-full tracking-widest uppercase">
            MATCH OVER (90' MINUTES)
          </span>
          <h2 className="text-2xl sm:text-5xl font-black text-white mt-3 uppercase font-mono tracking-tight">
            {isPlayerChamp ? '🏆 MATCH CHAMPION! 🏆' : '💥 DEFEAT IN THE ENDGAME! 💥'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto">
            The <strong className="text-amber-400">Top 11 best players</strong> selected from the won Squad Decks for each team. The higher total rating wins!
          </p>
        </div>

        {/* Big Score Arena */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 shadow-inner items-center">
          
          <div className={`p-4 rounded-xl flex flex-col items-center border ${
            isPlayerChamp ? 'bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'bg-slate-900 border-slate-800'
          }`}>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Your Top 11 Total</span>
            <span className="text-3xl sm:text-5xl font-black font-mono text-white mt-1">
              {playerTop11Score}
            </span>
            <span className="text-[10px] text-slate-400 mt-1">
              ({playerWonDeck.length} cards in deck)
            </span>
          </div>

          <div className="flex flex-col items-center justify-center py-2">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-slate-400 text-lg">
              VS
            </div>
            <span className={`text-xs font-bold font-mono mt-2 ${isPlayerChamp ? 'text-emerald-400' : 'text-rose-400'}`}>
              {Math.abs(playerTop11Score - opponentTop11Score)} pts diff
            </span>
          </div>

          <div className={`p-4 rounded-xl flex flex-col items-center border ${
            !isPlayerChamp ? 'bg-rose-950/40 border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : 'bg-slate-900 border-slate-800'
          }`}>
            <span className="text-xs font-mono text-rose-400 font-bold uppercase">{coach.name} Top 11</span>
            <span className="text-3xl sm:text-5xl font-black font-mono text-white mt-1">
              {opponentTop11Score}
            </span>
            <span className="text-[10px] text-slate-400 mt-1">
              ({opponentWonDeck.length} cards in deck)
            </span>
          </div>

        </div>

         {/* AI Coach Final Reaction Quote */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center space-x-4 mb-6">
          {coach.image ? (
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${coach.avatarBg} border-3 border-yellow-400 overflow-hidden shrink-0 shadow-lg`}>
              <img
                src={coach.image.startsWith('/') ? `${import.meta.env.BASE_URL}${coach.image.slice(1)}` : coach.image}
                alt={coach.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          ) : (
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${coach.avatarBg} border-3 border-yellow-400 overflow-hidden shrink-0 shadow-lg flex items-center justify-center text-5xl`}>
              <span className="filter drop-shadow-md">{coach.emoji}</span>
            </div>
          )}
          <div className="text-xs sm:text-sm text-slate-300 italic flex-1">
            "{isPlayerChamp ? coach.quotes.matchWin : coach.quotes.matchLose}"
            <span className="block text-[11px] font-mono font-bold not-italic text-emerald-400 mt-1">
              — {coach.name}
            </span>
          </div>
        </div>

        {/* Tab Switcher for Top 11 Squad View */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('PLAYER')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition ${
                activeTab === 'PLAYER'
                  ? 'bg-emerald-600 text-slate-950 shadow'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              ⭐ Your Top 11 ({playerTop11.length})
            </button>
            <button
              onClick={() => setActiveTab('OPPONENT')}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition ${
                activeTab === 'OPPONENT'
                  ? 'bg-rose-600 text-slate-950 shadow'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              🛡️ {coach.name} Top 11 ({opponentTop11.length})
            </button>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline font-mono">
            Showing highest ratings in the Squad Deck
          </span>
        </div>

        {/* Top 11 Grid */}
        <div className="bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80 min-h-[220px]">
          {currentTop11.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500 text-sm">
              <Sparkles className="w-8 h-8 mb-2 opacity-50" />
              Not enough cards in this Squad Deck.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5 overflow-x-auto pb-2">
              {currentTop11.map((c, idx) => (
                <div key={`${c.id}_${idx}`} className="flex flex-col items-center">
                  <span className="text-[9px] font-mono text-amber-300 font-bold mb-1">
                    #{idx + 1}
                  </span>
                  <CardView card={c} size="sm" disabled />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex justify-center space-x-4">
          <button
            onClick={onRestart}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:opacity-95 text-slate-950 font-black font-mono text-sm uppercase tracking-wider transition shadow-xl transform hover:scale-105 flex items-center space-x-2"
          >
            {matchMode === 'QUICK_MATCH' ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>Play Again (New Match)</span>
              </>
            ) : matchMode === 'TOURNAMENT' ? (
              isPlayerChamp ? (
                <>
                  <ArrowRight className="w-4 h-4" />
                  <span>Continue Campaign (Next Round)</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>Eliminated! Back to Main Menu</span>
                </>
              )
            ) : (
              <>
                <ArrowRight className="w-4 h-4" />
                <span>Continue (Back to Overview)</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
