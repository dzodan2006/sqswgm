import React, { useEffect, useState } from 'react';
import { CardView } from './CardView';
import { Card } from '../types';
import { soundFx } from '../utils/sound';
import { Trophy, Swords, Zap, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShootoutModalProps {
  playerOriginal: Card;
  opponentOriginal: Card;
  playerDrawn: Card[];
  opponentDrawn: Card[];
  onComplete: () => void;
  reason: string;
}

export const ShootoutModal: React.FC<ShootoutModalProps> = ({
  playerOriginal,
  opponentOriginal,
  playerDrawn,
  opponentDrawn,
  onComplete,
  reason,
}) => {
  const [revealCount, setRevealCount] = useState<number>(0); // 0 to 3

  // Initialize and play opening sounds, start fast card reveal loop
  useEffect(() => {
    soundFx.playStadiumHorn();
    const whistleTimeout = setTimeout(() => {
      soundFx.playWhistle();
    }, 150);

    const interval = setInterval(() => {
      setRevealCount((prev) => {
        if (prev < 3) {
          soundFx.playBoosterReveal();
          return prev + 1;
        } else {
          clearInterval(interval);
          return 3;
        }
      });
    }, 550); // Speed up slightly (550ms instead of 800ms)

    return () => {
      clearTimeout(whistleTimeout);
      clearInterval(interval);
    };
  }, []);

  const playerAll = [playerOriginal, ...playerDrawn.slice(0, revealCount)];
  const opponentAll = [opponentOriginal, ...opponentDrawn.slice(0, revealCount)];

  const playerTotal = playerAll.reduce((acc, c) => acc + c.rating, 0);
  const opponentTotal = opponentAll.reduce((acc, c) => acc + c.rating, 0);

  const isFinished = revealCount === 3;
  const isPlayerWin = playerTotal >= opponentTotal;

  // Play final game-over stadium audio based on win or loss outcome
  useEffect(() => {
    if (isFinished) {
      if (isPlayerWin) {
        soundFx.playGoalFanfare();
        const cheerTimeout = setTimeout(() => {
          soundFx.playCheer();
        }, 100);
        return () => clearTimeout(cheerTimeout);
      } else {
        soundFx.playCrowdDisappointment();
      }
    }
  }, [isFinished, isPlayerWin]);

  return (
    <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 select-none overflow-y-auto animate-fade-in">
      
      {/* Cartoon-Themed Outer Border Card */}
      <div className="bg-[#0b1911] border-4 border-black rounded-3xl max-w-4xl w-full p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative flex flex-col items-center my-6 overflow-hidden">
        
        {/* Subtle Soccer Pitch White Marking Line Accents */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/5 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-white/5 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-yellow-400 border-b-2 border-black" />
        <div className="absolute top-2.5 left-0 right-0 h-1 bg-black/10" />

        {/* Siren Header */}
        <div className="flex items-center space-x-2 bg-yellow-400 text-black border-2 border-black px-5 py-2 rounded-xl font-cartoon font-black text-xs sm:text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] z-10 transform -rotate-1">
          <Zap className="w-4 h-4 text-black fill-black animate-bounce" />
          <span>🚨 PENALTY SHOOTOUT 🚨</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-cartoon font-black text-white mt-5 uppercase text-center tracking-tight z-10 leading-none drop-shadow-[0_3px_0_rgba(0,0,0,1)]">
          DRAMATIC PENALTY DUEL!
        </h2>
        
        <p className="text-xs sm:text-sm text-yellow-300 text-center mt-3 px-4 max-w-xl font-cartoon font-bold uppercase tracking-wide leading-relaxed z-10">
          {reason} The winner takes <strong className="text-white underline">all 8 cards</strong> directly into their deck!
        </p>

        {/* Score Comparison Display */}
        <div className="flex items-center justify-center space-x-6 sm:space-x-12 my-6 bg-slate-900 px-8 py-5 rounded-3xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-lg relative overflow-hidden z-10">
          <div className="text-center">
            <span className="text-[10px] sm:text-xs font-cartoon font-black text-emerald-400 uppercase tracking-wider block mb-1">YOUR TEAM</span>
            <div className={`text-4xl sm:text-6xl font-cartoon font-black tracking-tight transition-all duration-150 ${isPlayerWin && isFinished ? 'text-emerald-400 scale-110 drop-shadow-[0_2px_0_rgba(0,0,0,1)] animate-pulse' : 'text-slate-500'}`}>
              {playerTotal}
            </div>
          </div>

          <div className="w-12 h-12 rounded-full bg-yellow-400 border-2 border-black flex items-center justify-center font-cartoon font-black text-base text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            VS
          </div>

          <div className="text-center">
            <span className="text-[10px] sm:text-xs font-cartoon font-black text-rose-400 uppercase tracking-wider block mb-1">OPPONENT</span>
            <div className={`text-4xl sm:text-6xl font-cartoon font-black tracking-tight transition-all duration-150 ${!isPlayerWin && isFinished ? 'text-rose-400 scale-110 drop-shadow-[0_2px_0_rgba(0,0,0,1)] animate-pulse' : 'text-slate-500'}`}>
              {opponentTotal}
            </div>
          </div>
        </div>

        {/* Drawn Cards Comparison Arena */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 my-2 z-10">
          
          {/* Player Side (Left) */}
          <div className="bg-slate-950 border-3 border-black rounded-2xl p-4 flex flex-col items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
            <span className="text-xs font-cartoon font-black text-emerald-400 uppercase tracking-wider mb-3 flex items-center">
              <Trophy className="w-4 h-4 mr-1.5 text-emerald-400 animate-pulse" /> YOUR PENALTY CARDS
            </span>
            <div className="flex justify-center gap-1.5 sm:gap-2">
              <motion.div
                initial={{ scale: 0.2, y: 200, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 120 }}
              >
                <CardView card={playerOriginal} size="sm" disabled />
              </motion.div>
              {[0, 1, 2].map((idx) => {
                const c = playerDrawn[idx];
                const revealed = idx < revealCount;
                return (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.2, y: 200, rotate: -45, opacity: 0 }}
                    animate={revealed ? { scale: 1, y: 0, rotate: 0, opacity: 1 } : { scale: 0.95, y: -5, opacity: 0.6 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 140 }}
                  >
                    <CardView
                      card={revealed ? c : undefined}
                      isFaceDown={!revealed}
                      size="sm"
                      disabled
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Opponent Side (Right) */}
          <div className="bg-slate-950 border-3 border-black rounded-2xl p-4 flex flex-col items-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
            <span className="text-xs font-cartoon font-black text-rose-400 uppercase tracking-wider mb-3 flex items-center">
              <ShieldAlert className="w-4 h-4 mr-1.5 text-rose-400 animate-pulse" /> OPPONENT CARDS
            </span>
            <div className="flex justify-center gap-1.5 sm:gap-2">
              <motion.div
                initial={{ scale: 0.2, y: -200, rotate: 45, opacity: 0 }}
                animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 120 }}
              >
                <CardView card={opponentOriginal} size="sm" disabled />
              </motion.div>
              {[0, 1, 2].map((idx) => {
                const c = opponentDrawn[idx];
                const revealed = idx < revealCount;
                return (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.2, y: -200, rotate: 45, opacity: 0 }}
                    animate={revealed ? { scale: 1, y: 0, rotate: 0, opacity: 1 } : { scale: 0.95, y: 5, opacity: 0.6 }}
                    transition={{ type: 'spring', damping: 14, stiffness: 140 }}
                  >
                    <CardView
                      card={revealed ? c : undefined}
                      isFaceDown={!revealed}
                      size="sm"
                      disabled
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Winner Banner */}
        {isFinished && (
          <div className="mt-6 w-full flex flex-col items-center animate-card-drop z-10">
            <div className={`px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-cartoon font-black tracking-wide uppercase border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
              isPlayerWin 
                ? 'bg-emerald-500 text-black' 
                : 'bg-rose-500 text-white'
            }`}>
              {isPlayerWin ? '🎉 HUGE PENALTY WIN! (+8 CARDS) 🎉' : '💥 OPPONENT CLAIMS VICTORY! (+8 CARDS) 💥'}
            </div>

            <button
              onClick={onComplete}
              className="mt-6 px-10 py-4 rounded-2xl bg-yellow-400 hover:bg-yellow-300 text-black border-3 border-black font-cartoon font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            >
              Continue Match & Claim Cards ➔
            </button>
          </div>
        )}

        {!isFinished && (
          <div className="mt-8 text-xs font-cartoon font-bold text-amber-300 animate-pulse flex items-center space-x-2 bg-black/40 px-5 py-2.5 rounded-xl border-2 border-black z-10 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span>SHOOTOUT... DRAWING ADDITIONAL CARDS FROM THE DECK</span>
          </div>
        )}

      </div>
    </div>
  );
};
