import React, { useState } from 'react';
import { Card, Coach, RoundEvaluation, GamePhase } from '../types';
import { CardView } from './CardView';
import { SquadSwapEngine } from '../utils/engine';
import { Layers, Clock, ArrowRight, Pause, Play, RotateCcw, HelpCircle, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/sound';

const getCardPhysics = (card: Card) => {
  // Use card rating to generate stable but unique physical spring behaviors
  const seed = card.rating + (card.name.charCodeAt(0) || 0);
  const stiffness = 140 + (seed % 60);  // 140 to 200 (stiffness)
  const damping = 12 + (seed % 8);      // 12 to 20 (damping)
  const mass = 0.85 + ((seed % 4) * 0.1); // 0.85 to 1.15 (inertia/weight)
  return { type: 'spring', stiffness, damping, mass };
};

interface PitchBoardProps {
  coach: Coach;
  minute: number;
  turn: number;
  gamePhase?: GamePhase;
  playerHand: Card[];
  opponentHand: Card[];
  opponentHandCount: number;
  playerSquadDeckCount: number;
  opponentSquadDeckCount: number;
  playedPlayerCard: Card | null;
  playedOpponentCard: Card | null;
  turnResult: RoundEvaluation | null;
  isPlayerTurnToPickFirst: boolean;
  isWaitingForCoach: boolean;
  onPlayerSelectCard: (card: Card) => void;
  onNextTurn: () => void;
  onDrawClick?: () => void;
  onRestart: () => void;
  onOpenRules: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  canPlayerAssist?: boolean;
  onPlayerAssist?: (card: Card) => void;
  onPassAssist?: () => void;
  playedPlayerAssistCard: Card | null;
  playedOpponentAssistCard: Card | null;
  playedOpponentCardIndex: number | null;
  drawDeckCount: number;
  hasStartedDealing?: boolean;
  isShuffling?: boolean;
}

export const PitchBoard: React.FC<PitchBoardProps> = ({
  coach,
  minute,
  turn,
  gamePhase,
  playerHand,
  opponentHand,
  opponentHandCount,
  playerSquadDeckCount,
  opponentSquadDeckCount,
  playedPlayerCard,
  playedOpponentCard,
  turnResult,
  isPlayerTurnToPickFirst,
  isWaitingForCoach,
  onPlayerSelectCard,
  onNextTurn,
  onDrawClick,
  onRestart,
  onOpenRules,
  soundEnabled,
  onToggleSound,
  canPlayerAssist = false,
  onPlayerAssist,
  onPassAssist,
  playedPlayerAssistCard,
  playedOpponentAssistCard,
  playedOpponentCardIndex,
  drawDeckCount,
  hasStartedDealing = false,
  isShuffling = false,
}) => {
  const [showPause, setShowPause] = useState(false);
  const [flyWinner, setFlyWinner] = useState<'PLAYER' | 'OPPONENT' | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  // Computes precise flight coordinates to deck piles on any screen aspect ratio
  const getFlyCoords = (target: 'PLAYER' | 'OPPONENT', isCardOwnerPlayer: boolean) => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    const w = Math.min(window.innerWidth, 1024);
    const h = Math.min(window.innerHeight, 750);
    
    // Decks are inside padding, approx 45px from edges.
    const targetX = target === 'PLAYER' ? (-w / 2 + 45) : (w / 2 - 45);
    
    // Cards slots are at approx w/6 from center.
    const currentX = isCardOwnerPlayer ? (-w / 6) : (w / 6);
    const deltaX = targetX - currentX;
    
    // Top decks are near top-2 (y approx -h * 0.42 from centered stage).
    const deltaY = -h * 0.42;
    
    return { x: deltaX, y: deltaY };
  };

  const handlePlayCard = (c: Card) => {
    if (gamePhase === 'DRAW' || isWaitingForCoach) return;
    
    const isValidAssist = canPlayerAssist && playedPlayerCard && c.nationality === playedPlayerCard.nationality;
    if (canPlayerAssist) {
      if (isValidAssist && onPlayerAssist) {
        onPlayerAssist(c);
      }
    } else if (!playedPlayerCard) {
      if (!isPlayerTurnToPickFirst && !playedOpponentCard) return; // Cannot play before opponent in their turn
      onPlayerSelectCard(c);
    }
  };

  const handleNextTurnWithAnimation = () => {
    if (!turnResult) return;
    const winner = turnResult.winner === 'SHOOTOUT' ? 'PLAYER' : turnResult.winner;
    setFlyWinner(winner);
    soundFx.playCardSwoosh();
    setTimeout(() => {
      onNextTurn();
      setFlyWinner(null);
    }, 600);
  };

  // Automate next turn transition for super fluid gameplay (no "Dalje" button needed!)
  React.useEffect(() => {
    if (turnResult && !canPlayerAssist) {
      const timer = setTimeout(() => {
        handleNextTurnWithAnimation();
      }, 1200); // Snappy, dynamic flow (1.2 seconds review/celebration time)
      return () => clearTimeout(timer);
    }
  }, [turnResult, canPlayerAssist]);

  const getCoachSpeech = () => {
    if (turn === 1 && !playedPlayerCard && !playedOpponentCard) return coach.quotes.start;
    if (turnResult) {
      if (turnResult.isDoubleUp) return coach.quotes.doubleUp;
      if (turnResult.winner === 'SHOOTOUT') return coach.quotes.shootout;
      if (turnResult.winner === 'PLAYER') return coach.quotes.loseRound;
      return coach.quotes.winRound;
    }
    return isPlayerTurnToPickFirst ? "Your turn to pick first..." : "I'm playing first!";
  };

  // Lepeza / kružna rotacija za karte u ruci
  const getHandCardTransform = (idx: number, total: number) => {
    if (total <= 1) return '';
    const center = (total - 1) / 2;
    const offset = idx - center;
    const rotate = offset * 4; // npr -8deg, -4deg, 0, +4deg, +8deg
    const translateY = Math.abs(offset) * 3; // zakrivljenje prema dole
    return `rotate(${rotate}deg) translateY(${translateY}px)`;
  };

  return (
    <div className="w-full h-full flex flex-col justify-between gap-1 sm:gap-1.5 p-1 sm:p-2 select-none overflow-hidden shrink-0 relative">
      
      {/* TOP BAR: AI COACH PANEL & OPPONENT HAND & PAUSE BTN */}
      <div className="bg-[#1b2f23] border-2 sm:border-4 border-black rounded-xl p-1 sm:px-3 sm:py-1.5 flex items-center justify-between shadow-md shrink-0 z-20 gap-1.5 sm:gap-2">
        
        {/* Pause Button */}
        <button
          onClick={() => setShowPause(true)}
          className="p-1 sm:p-2 rounded-lg bg-yellow-400 hover:bg-yellow-300 border-2 border-black text-black font-bold shadow shrink-0 active:scale-95 transition flex items-center space-x-1"
          title="Pause / Menu"
        >
          <Pause className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-black" />
        </button>

        {/* Coach Profile */}
        <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0 min-w-0">
          <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center text-2xl sm:text-3xl relative shrink-0">
            {coach.image ? (
              <img
                src={coach.image.startsWith('/') ? `${import.meta.env.BASE_URL}${coach.image.slice(1)}` : coach.image}
                alt={coach.name}
                className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] scale-[1.2] -translate-y-0.5 transform hover:scale-130 transition-transform duration-200"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="scale-[1.1] filter drop-shadow-md">{coach.emoji}</span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-cartoon text-white text-[11px] sm:text-sm md:text-base font-black uppercase tracking-tight leading-none truncate max-w-[100px] sm:max-w-[180px]">
              {coach.name}
            </h3>
            <p className="text-[7.5px] sm:text-[10px] text-amber-400 font-bold font-cartoon mt-0.5 truncate">{coach.difficulty}</p>
          </div>

          {/* OPPONENT HAND CARDS (Pored imena trenera sa istom poleđinom kao u decku, skupljene bez praznina) */}
          <div className="flex items-center ml-1 sm:ml-3 pl-1.5 sm:pl-3 border-l-2 border-black/50 shrink-0" title={`Opponent Hand: ${opponentHand.length} cards`}>
            <div className="flex items-center -space-x-2.5 sm:-space-x-4">
              {opponentHand.map((c, idx) => (
                <div
                  key={c.id || idx}
                  className="w-5 h-7 sm:w-7 sm:h-10 md:w-9 md:h-13 bg-gradient-to-br from-[#1a2f23] via-[#0b1610] to-[#040806] border border-amber-400/90 sm:border-2 rounded sm:rounded-lg shadow-[1px_1px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:z-30 hover:scale-105 select-none"
                  style={{ zIndex: idx }}
                >
                  {/* Fine gold mesh / diagonal soccer net pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:4px_4px]" />
                  
                  {/* Inner gold frame with trophy */}
                  <div className="absolute inset-0.5 border border-amber-500/30 rounded flex flex-col items-center justify-center bg-black/45 p-0.5">
                    <span className="text-[7px] sm:text-xs drop-shadow leading-none">🏆</span>
                  </div>
                </div>
              ))}
            </div>
            {opponentHand.length > 0 && (
              <span className="ml-1 sm:ml-2 text-[7px] sm:text-[9px] font-sports font-black text-amber-300 bg-black/80 px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded border border-amber-500/40 hidden md:inline-block">
                {opponentHand.length}
              </span>
            )}
          </div>
        </div>

        {/* Coach Quote Bubble */}
        <div className="flex-1 max-w-sm mx-1 bg-black border-2 border-yellow-500/80 px-2 py-0.5 sm:py-1 rounded-lg text-[9px] sm:text-xs text-yellow-100 font-sports shadow hidden lg:flex items-center space-x-1.5 truncate">
          <span>💬</span>
          <span className="truncate">"{getCoachSpeech()}"</span>
        </div>

      </div>

      {/* CENTER STADIUM PITCH (GREEN FOOTBALL TURF) */}
      <div className="flex-[1.4] w-full bg-[#1b8036] border-2 sm:border-4 border-black rounded-2xl sm:rounded-3xl relative overflow-hidden shadow-[inset_0_4px_20px_rgba(0,0,0,0.6)] flex flex-col justify-center items-center p-1.5 sm:p-4 min-h-[160px] sm:min-h-[240px] md:min-h-[360px]">
        
        {/* DYNAMIC TURN STATUS BAR */}
        <div className="absolute top-1 sm:top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <div className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-black sm:border-2 shadow-[1px_1px_0px_rgba(0,0,0,1)] text-[8px] sm:text-xs font-black font-sports uppercase tracking-wider text-white ${
            gamePhase === 'DRAW' ? 'bg-indigo-600 animate-pulse' :
            turnResult ? 'bg-purple-600 animate-bounce' :
            isWaitingForCoach ? 'bg-orange-500 animate-pulse' :
            playedPlayerCard && !playedOpponentCard ? 'bg-blue-600' :
            !playedPlayerCard && playedOpponentCard ? 'bg-amber-500 animate-pulse' :
            isPlayerTurnToPickFirst ? 'bg-emerald-600' : 'bg-red-600'
          }`}>
            {gamePhase === 'DRAW' ? (
              <span>{isShuffling ? 'SHUFFLING SQUAD DECK... 🔀' : 'DEALING CARDS... 🃏'}</span>
            ) : turnResult ? (
              <span>DUEL RESULT</span>
            ) : isWaitingForCoach ? (
              <span>Coach {coach.name} is thinking... 🧠</span>
            ) : playedPlayerCard && !playedOpponentCard ? (
              <span>{coach.name} is picking response...</span>
            ) : !playedPlayerCard && playedOpponentCard ? (
              <span>{coach.name} has played! Your turn...</span>
            ) : isPlayerTurnToPickFirst ? (
              <span>YOU PLAY FIRST! Select a card... 🎯</span>
            ) : (
              <span>{coach.name} plays first...</span>
            )}
          </div>
        </div>

        {/* 2D Pitch Turf Markings */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
          <div className="w-full h-full bg-[linear-gradient(rgba(0,0,0,0.06)_50%,transparent_50%)] [background-size:100%_36px]" />
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/50 transform -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-36 sm:w-52 h-36 sm:h-52 border-4 border-white/50 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <div className="w-3 h-3 bg-white/70 rounded-full" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-14 border-b-4 border-x-4 border-white/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-14 border-t-4 border-x-4 border-white/40" />
        </div>

        {/* SHARED DRAW DECK (Zajednički fiksni 3D špil) */}
        {drawDeckCount > 0 && (
          <div 
            className="absolute right-2 sm:right-4 top-[64%] -translate-y-1/2 flex flex-col items-center z-40 select-none"
          >
            {/* Label for the shared deck */}
            <div className="mb-1 bg-black/90 border border-amber-500/50 px-1.5 py-0.2 rounded text-[7px] sm:text-[9px] text-amber-400 font-sports font-black uppercase tracking-wider shadow">
              DECK
            </div>

            <div className={`relative w-8 h-12 sm:w-11 sm:h-16 md:w-15 md:h-22 select-none transition-all duration-300 ${isShuffling ? 'ring-2 ring-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.8)] rounded-lg animate-pulse' : ''}`}>
              <div className="relative w-full h-full">
                {/* 3D layers of the deck */}
                {Array.from({ length: 4 }).map((_, i) => {
                  const offset = i * 1.2;
                  return (
                    <div
                      key={i}
                      className="absolute inset-0 bg-gradient-to-br from-[#1a2f23] via-[#0b1610] to-[#040806] border border-amber-400/70 rounded-md shadow-[1px_1px_0px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center overflow-hidden"
                      style={{
                        transform: `translate(${-offset}px, ${-offset}px)`,
                        zIndex: i,
                      }}
                    >
                      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:4px_4px] w-full h-full" />
                      <div className="absolute inset-1 border border-amber-500/20 rounded bg-black/40 flex flex-col items-center justify-center p-0.5">
                        <span className="text-[9px] sm:text-xs drop-shadow opacity-40">🏆</span>
                      </div>
                    </div>
                  );
                })}

                {/* Top card of the stack */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#203c2a] via-[#0e1f16] to-[#050b08] border-1.5 sm:border-2 border-amber-400 rounded-md shadow-[1px_1px_0px_rgba(0,0,0,0.85)] flex flex-col items-center justify-center overflow-hidden"
                  style={{
                    transform: `translate(-6px, -6px)`,
                    zIndex: 20,
                  }}
                >
                  <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:6px_6px] w-full h-full" />
                  <div className="absolute inset-0.5 border border-amber-500/30 rounded bg-black/60 flex flex-col items-center justify-center p-0.5">
                    <span className="text-xs sm:text-base drop-shadow">🏆</span>
                    <span className="text-[6px] sm:text-[8px] text-amber-400/90 font-sports font-black uppercase mt-0.5 tracking-wider">
                      PLAY
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* HUD SCOREBOARDS TOP LEFT & TOP RIGHT */}
        <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-3 flex flex-col space-y-1 z-10">
          <div className="bg-black border border-yellow-400 sm:border-2 px-1.5 py-0.2 rounded text-white font-sports text-[8px] sm:text-[10px] font-bold flex items-center space-x-1 shadow">
            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 shrink-0" />
            <span>MIN {minute}'</span>
          </div>
          <div className="bg-blue-600 border border-black sm:border-2 px-1.5 py-0.2 rounded shadow text-white text-[7.5px] sm:text-[9px] font-sports font-black">
            YOUR: <span className="text-yellow-300 text-[9px] sm:text-xs">{playerSquadDeckCount}</span>
          </div>
          
          {/* USER SQUAD DECK PILE */}
          <div className="relative w-8 h-12 sm:w-11 sm:h-16 md:w-14 md:h-20 mt-0.5 ml-0.5 select-none">
            {playerSquadDeckCount > 0 ? (
              <motion.div 
                key={`pdeck-${playerSquadDeckCount}`}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1], rotate: [0, -3, 3, 0] }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative w-full h-full"
              >
                {Array.from({ length: Math.min(3, Math.ceil(playerSquadDeckCount / 3)) }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 bg-gradient-to-br from-[#1a2f23] via-[#0b1610] to-[#040806] border border-amber-400/70 rounded shadow-[1px_1px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center overflow-hidden transition-all duration-300"
                    style={{
                      transform: `translate(${i * 1.2}px, ${i * -1.8}px)`,
                      zIndex: i,
                    }}
                  >
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:4px_4px] w-full h-full" />
                    <div className="absolute inset-0.5 border border-amber-500/20 rounded bg-black/40 flex flex-col items-center justify-center p-0.5">
                      <span className="text-[7px] drop-shadow">🏆</span>
                    </div>
                  </div>
                ))}
                <div 
                  className="absolute bg-yellow-400 text-black text-[7px] font-mono font-black px-1 py-0.2 rounded-full border border-black z-30 shadow-md"
                  style={{
                    bottom: '-3px',
                    right: '-3px',
                    transform: `translate(${Math.min(3, Math.ceil(playerSquadDeckCount / 3)) * 1.2}px, ${Math.min(3, Math.ceil(playerSquadDeckCount / 3)) * -1.8}px)`
                  }}
                >
                  {playerSquadDeckCount}
                </div>
              </motion.div>
            ) : (
              <div className="w-full h-full border border-dashed border-white/20 rounded bg-black/40 flex items-center justify-center text-[6px] text-slate-500 font-mono text-center leading-tight">
                Empty
              </div>
            )}
          </div>
        </div>

        <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-3 flex flex-col space-y-1 items-end z-10">
          <div className={`px-1.5 py-0.2 rounded font-sports text-[7.5px] sm:text-[9px] font-black border border-black sm:border-2 shadow text-white uppercase ${
            isPlayerTurnToPickFirst ? 'bg-emerald-600 animate-pulse' : 'bg-red-600'
          }`}>
            {isPlayerTurnToPickFirst ? '⭐ YOUR TURN' : `🤖 ${coach.name}`}
          </div>
          <div className="bg-red-600 border border-black sm:border-2 px-1.5 py-0.2 rounded shadow text-white text-[7.5px] sm:text-[9px] font-sports font-black">
            OPPONENT: <span className="text-yellow-300 text-[9px] sm:text-xs">{opponentSquadDeckCount}</span>
          </div>

          {/* OPPONENT SQUAD DECK PILE */}
          <div className="relative w-8 h-12 sm:w-11 sm:h-16 md:w-14 md:h-20 mt-0.5 mr-0.5 select-none">
            {opponentSquadDeckCount > 0 ? (
              <motion.div 
                key={`odeck-${opponentSquadDeckCount}`}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative w-full h-full"
              >
                {Array.from({ length: Math.min(3, Math.ceil(opponentSquadDeckCount / 3)) }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 bg-gradient-to-br from-[#1a2f23] via-[#0b1610] to-[#040806] border border-amber-400/70 rounded shadow-[1px_1px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center overflow-hidden transition-all duration-300"
                    style={{
                      transform: `translate(${i * -1.2}px, ${i * -1.8}px)`,
                      zIndex: i,
                    }}
                  >
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:4px_4px] w-full h-full" />
                    <div className="absolute inset-0.5 border border-amber-500/20 rounded bg-black/40 flex flex-col items-center justify-center p-0.5">
                      <span className="text-[7px] drop-shadow">🏆</span>
                    </div>
                  </div>
                ))}
                <div 
                  className="absolute bg-red-600 text-white text-[7px] font-mono font-black px-1 py-0.2 rounded-full border border-black z-30 shadow-md"
                  style={{
                    bottom: '-3px',
                    left: '-3px',
                    transform: `translate(${Math.min(3, Math.ceil(opponentSquadDeckCount / 3)) * -1.2}px, ${Math.min(3, Math.ceil(opponentSquadDeckCount / 3)) * -1.8}px)`
                  }}
                >
                  {opponentSquadDeckCount}
                </div>
              </motion.div>
            ) : (
              <div className="w-full h-full border border-dashed border-red-500/20 rounded bg-black/40 flex items-center justify-center text-[6px] text-slate-500 font-mono text-center leading-tight">
                Empty
              </div>
            )}
          </div>
        </div>

        {/* DUEL BATTLE STAGE (CENTER 2 CARD SLOTS - COMPACT 16:9 RATIO) */}
        <div className="relative z-10 flex items-center justify-center gap-3 sm:gap-10 md:gap-20 lg:gap-28 my-auto w-full px-2 sm:px-4">
          
          {/* USER CARD SLOT (LEFT) */}
          <div className="flex flex-col items-center">
            <span className="text-[7.5px] sm:text-[9px] font-sports font-black text-yellow-300 mb-0.5 bg-black px-1.5 py-0.2 rounded border border-white/20 shadow">
              YOUR CARD
            </span>
            <div 
              className={`transition-all duration-300 ${playedPlayerAssistCard ? 'p-1 sm:p-1.5' : 'w-18 h-27 sm:w-23 sm:h-35 md:w-28 md:h-42'} rounded-xl border-2 sm:border-4 ${isDraggingOver ? 'border-yellow-400 bg-yellow-400/20 scale-105 shadow-[0_0_20px_rgba(250,204,21,0.5)]' : 'border-dashed border-white/40 bg-black/20'} flex items-center justify-center relative shadow-inner gap-1 sm:gap-2 min-h-[108px] sm:min-h-[140px] md:min-h-[168px]`}
              onDragOver={(e) => {
                if (!playedPlayerCard || (canPlayerAssist && !playedPlayerAssistCard)) {
                  e.preventDefault();
                }
              }}
              onDragEnter={() => {
                if (!playedPlayerCard || (canPlayerAssist && !playedPlayerAssistCard)) {
                  setIsDraggingOver(true);
                }
              }}
              onDragLeave={() => {
                setIsDraggingOver(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingOver(false);
                const id = e.dataTransfer.getData('text/plain');
                const found = playerHand.find(card => card.id === id);
                if (found) {
                  const isValidAssist = canPlayerAssist && playedPlayerCard && found.nationality === playedPlayerCard.nationality;
                  const isCardDisabled = isWaitingForCoach ||
                    (turnResult !== null && !canPlayerAssist) ||
                    (canPlayerAssist 
                      ? !isValidAssist 
                      : (playedPlayerCard !== null || (!isPlayerTurnToPickFirst && !playedOpponentCard)));
                  if (!isCardDisabled) {
                    handlePlayCard(found);
                  }
                }
              }}
            >
              {playedPlayerCard ? (
                <div className="flex items-center gap-1 sm:gap-2 relative">
                  {/* Floating Winner Trophy Above Player Card */}
                  {turnResult && turnResult.winner === 'PLAYER' && (
                    <motion.div
                      initial={{ scale: 0, y: 10 }}
                      animate={{ scale: [1, 1.15, 1], y: 0 }}
                      transition={{ scale: { repeat: Infinity, duration: 1.5 } }}
                      className="absolute -top-8 sm:-top-11 left-1/2 -translate-x-1/2 bg-yellow-400 border-2 border-black rounded-full w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center shadow-lg z-30 animate-bounce"
                    >
                      <span className="text-sm sm:text-base drop-shadow">🏆</span>
                    </motion.div>
                  )}

                  {/* Glavna karta s motion blurom */}
                  <motion.div
                    initial={{ scale: 1.5, y: 60, rotate: -15, opacity: 0, filter: 'blur(4px)' }}
                    animate={
                      flyWinner === 'PLAYER'
                        ? { ...getFlyCoords('PLAYER', true), scale: 0.05, opacity: 0, rotate: -60, filter: 'blur(8px)' }
                        : flyWinner === 'OPPONENT'
                        ? { ...getFlyCoords('OPPONENT', true), scale: 0.05, opacity: 0, rotate: 60, filter: 'blur(8px)' }
                        : { scale: 1, y: 0, rotate: 0, opacity: 1, filter: 'blur(0px)' }
                    }
                    transition={
                      flyWinner 
                        ? { duration: 0.45, ease: 'easeIn' }
                        : { type: 'spring', damping: 13, stiffness: 185 }
                    }
                    className="z-10"
                  >
                    <CardView card={playedPlayerCard} size={playedPlayerAssistCard ? 'sm' : 'md'} disabled />
                  </motion.div>

                  {/* Asistencija karta s motion blurom */}
                  {playedPlayerAssistCard && (
                    <motion.div
                      initial={{ scale: 1.2, x: 40, opacity: 0, filter: 'blur(4px)' }}
                      animate={
                        flyWinner === 'PLAYER'
                          ? { ...getFlyCoords('PLAYER', true), scale: 0.05, opacity: 0, rotate: -60, filter: 'blur(8px)' }
                          : flyWinner === 'OPPONENT'
                          ? { ...getFlyCoords('OPPONENT', true), scale: 0.05, opacity: 0, rotate: 60, filter: 'blur(8px)' }
                          : { scale: 1, x: 0, opacity: 1, filter: 'blur(0px)' }
                      }
                      transition={
                        flyWinner
                          ? { duration: 0.45, ease: 'easeIn' }
                          : { type: 'spring', damping: 13, stiffness: 185 }
                      }
                      className="z-20"
                    >
                      <CardView card={playedPlayerAssistCard} size="sm" disabled />
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center p-1 text-center select-none pointer-events-none">
                  <span className="text-xl sm:text-2xl mb-1 opacity-60">📥</span>
                  <span className="text-[8px] sm:text-[10px] font-sports font-bold text-white/80 animate-pulse uppercase leading-tight">
                    {isPlayerTurnToPickFirst ? 'Play Card' : 'Drop Here'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* VS OR RESULT BADGE */}
          <div className="flex flex-col items-center justify-center shrink-0">
            {!turnResult ? (
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black border-2 sm:border-3 border-yellow-400 shadow-md flex items-center justify-center scale-105">
                <span className="text-[9px] sm:text-xs font-black font-sports text-yellow-400 animate-pulse">VS</span>
              </div>
            ) : (
              <div className="flex flex-col items-center animate-bounce">
                <div className={`w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl border-2 sm:border-3 border-black shadow-lg flex flex-col items-center justify-center p-0.5 text-center font-black font-sports ${
                  turnResult.winner === 'PLAYER'
                    ? 'bg-yellow-400 text-black'
                    : turnResult.winner === 'OPPONENT'
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-500 text-white'
                }`}>
                  <span className="text-xs sm:text-base leading-none">
                    {turnResult.winner === 'PLAYER' ? '🏆' : turnResult.winner === 'OPPONENT' ? '💥' : '⚖️'}
                  </span>
                  <span className="text-[6px] sm:text-[8px] leading-tight mt-0.5">
                    {turnResult.winner === 'PLAYER' ? 'WIN' : turnResult.winner === 'OPPONENT' ? 'LOSS' : 'PENS'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* AI OPPONENT CARD SLOT (RIGHT) */}
          <div className="flex flex-col items-center">
            <span className="text-[7.5px] sm:text-[9px] font-sports font-black text-red-200 mb-0.5 bg-black px-1.5 py-0.2 rounded border border-white/20 shadow">
              OPPONENT
            </span>
            <div className={`transition-all duration-300 ${playedOpponentAssistCard ? 'p-1 sm:p-1.5' : 'w-18 h-27 sm:w-23 sm:h-35 md:w-28 md:h-42'} rounded-xl border-2 sm:border-4 border-dashed border-red-300/60 bg-black/20 flex items-center justify-center relative shadow-inner gap-1 sm:gap-2 min-h-[108px] sm:min-h-[140px] md:min-h-[168px]`}>
              {playedOpponentCard ? (
                <div className="flex items-center justify-center relative gap-1 sm:gap-2">
                  {/* Floating Winner Trophy Above Opponent Card */}
                  {turnResult && turnResult.winner === 'OPPONENT' && (
                    <motion.div
                      initial={{ scale: 0, y: 10 }}
                      animate={{ scale: [1, 1.15, 1], y: 0 }}
                      transition={{ scale: { repeat: Infinity, duration: 1.5 } }}
                      className="absolute -top-8 sm:-top-11 left-1/2 -translate-x-1/2 bg-yellow-400 border-2 border-black rounded-full w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center shadow-lg z-30 animate-bounce"
                    >
                      <span className="text-sm sm:text-base drop-shadow">🏆</span>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ scale: 1.5, y: -60, rotate: 15, opacity: 0, filter: 'blur(4px)' }}
                    animate={
                      flyWinner === 'PLAYER'
                        ? { ...getFlyCoords('PLAYER', false), scale: 0.05, opacity: 0, rotate: -60, filter: 'blur(8px)' }
                        : flyWinner === 'OPPONENT'
                        ? { ...getFlyCoords('OPPONENT', false), scale: 0.05, opacity: 0, rotate: 60, filter: 'blur(8px)' }
                        : { scale: 1, y: 0, rotate: 0, opacity: 1, filter: 'blur(0px)' }
                    }
                    transition={
                      flyWinner 
                        ? { duration: 0.45, ease: 'easeIn' }
                        : { type: 'spring', damping: 13, stiffness: 185 }
                    }
                    className="z-10"
                  >
                    <CardView 
                      card={playedOpponentCard} 
                      size={playedOpponentAssistCard ? 'sm' : 'md'} 
                      isFaceDown={false}
                      disabled 
                    />
                  </motion.div>

                  {/* Protivnik Asistencija karta s motion blurom */}
                  {playedOpponentAssistCard && (
                    <motion.div
                      initial={{ scale: 1.2, x: -40, opacity: 0, filter: 'blur(4px)' }}
                      animate={
                        flyWinner === 'PLAYER'
                          ? { ...getFlyCoords('PLAYER', false), scale: 0.05, opacity: 0, rotate: -60, filter: 'blur(8px)' }
                          : flyWinner === 'OPPONENT'
                          ? { ...getFlyCoords('OPPONENT', false), scale: 0.05, opacity: 0, rotate: 60, filter: 'blur(8px)' }
                          : { scale: 1, x: 0, opacity: 1, filter: 'blur(0px)' }
                      }
                      transition={
                        flyWinner
                          ? { duration: 0.45, ease: 'easeIn' }
                          : { type: 'spring', damping: 13, stiffness: 185 }
                      }
                      className="z-20"
                    >
                      <CardView card={playedOpponentAssistCard} size="sm" disabled />
                    </motion.div>
                  )}
                </div>
              ) : isWaitingForCoach ? (
                <div className="flex flex-col items-center space-y-0.5 px-1">
                  <span className="text-lg sm:text-xl animate-bounce">🧠</span>
                  <span className="text-[7px] sm:text-[8px] font-sports font-black text-yellow-400 bg-black px-1 py-0.2 rounded text-center leading-none uppercase tracking-wider">
                    {coach.name} CHOOSING...
                  </span>
                </div>
              ) : (
                <span className="text-[8px] sm:text-[10px] font-sports font-black text-red-400/70 text-center px-1 uppercase tracking-wider animate-pulse">
                  {coach.name} WAITING
                </span>
              )}
            </div>
          </div>

        </div>

        {/* ASSIST MECHANIC DIALOG & DEDICATED ORANGE PASS BUTTON */}
        {canPlayerAssist ? (
          <>
            {/* Assist explanation banner on the bottom-left */}
            <div className="absolute bottom-10 sm:bottom-16 left-2 sm:left-4 max-w-[170px] sm:max-w-xs bg-[#1a0e0a] border-2 sm:border-4 border-amber-500 rounded-lg sm:rounded-xl p-1.5 sm:px-3 sm:py-2 shadow-2xl flex flex-col items-center justify-center z-40 animate-card-slide gap-0.5 sm:gap-1">
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                <span className="text-xs sm:text-sm">🤝</span>
                <span className="text-[9px] sm:text-xs font-sports font-black text-amber-400 uppercase tracking-wide">
                  Assist Available!
                </span>
              </div>
              <p className="text-[7.5px] sm:text-[9px] text-slate-300 text-center leading-tight">
                Duel lost! Select an <b className="text-yellow-400 font-bold">Assistant</b> or press <b className="text-orange-500 font-bold">PASS</b>!
              </p>
            </div>

            {/* Retro Orange prominent PASS button on the bottom-right action area */}
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              onClick={onPassAssist}
              className="absolute bottom-10 sm:bottom-16 right-2 sm:right-6 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 border-2 sm:border-4 border-black text-black font-black font-sports text-xs sm:text-sm px-3.5 py-1 sm:px-5 sm:py-2 rounded-lg sm:rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all z-50 uppercase tracking-wider leading-none flex items-center space-x-1"
            >
              <span className="text-sm sm:text-base">🛑</span>
              <span>PASS</span>
            </motion.button>
          </>
        ) : null}

        {/* ⏸️ PAUSE MODAL OVERLAY */}
        {showPause && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-3 animate-pop">
            <div className="bg-[#1b2f23] border-4 border-black rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col items-center max-w-xs w-full gap-2.5 max-h-[92vh] overflow-y-auto">
              <h2 className="text-xl sm:text-2xl font-black font-sports text-yellow-400 mb-1">⏸️ PAUSE</h2>
              
              <button
                onClick={() => setShowPause(false)}
                className="w-full py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 border-2 border-black font-sports font-black text-black uppercase flex items-center justify-center space-x-2 shadow text-xs sm:text-sm"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>CONTINUE</span>
              </button>
              
              <button
                onClick={() => { setShowPause(false); onOpenRules(); }}
                className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 border-2 border-black font-sports font-black text-white uppercase flex items-center justify-center space-x-2 shadow text-xs sm:text-sm"
              >
                <HelpCircle className="w-4 h-4" />
                <span>RULES</span>
              </button>

              <button
                onClick={onToggleSound}
                className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border-2 border-black font-sports font-black text-yellow-300 uppercase flex items-center justify-center space-x-2 shadow text-xs sm:text-sm"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>SOUND: {soundEnabled ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => { setShowPause(false); onRestart(); }}
                className="w-full py-2 px-3 rounded-xl bg-red-600 hover:bg-red-500 border-2 border-black font-sports font-black text-white uppercase flex items-center justify-center space-x-2 shadow mt-1 text-xs sm:text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>MAIN MENU</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* BOTTOM BAR: USER HAND (5 CARDS SA LEPEZA / KRUŽNIM EFEKTOM) */}
      <div className="bg-[#1b2f23] border border-black sm:border-3 rounded-lg sm:rounded-xl p-1 sm:p-1.5 shadow-md z-20 shrink-0">
        <div className="flex items-center justify-between mb-0.5 px-1">
          <div className="flex items-center space-x-1 sm:space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
            <h3 className="font-black text-white text-[8.5px] sm:text-[11px] font-sports uppercase tracking-wide">
              YOUR HAND ({playerHand.length}/5)
            </h3>
          </div>
          <span className="text-[8.5px] text-yellow-300 font-sports font-bold hidden sm:inline truncate">
            {canPlayerAssist ? '🤝 Select assistant card!' : isPlayerTurnToPickFirst ? '⭐ Play your card!' : '⚡ Beat their rating or match country!'}
          </span>
        </div>

        {/* 5 Cards Row in Arc / Circle Fan */}
        <div className="flex items-center justify-center gap-0.5 sm:gap-1.5 pt-0.5 pb-0.5 px-0.5 overflow-x-visible min-h-[78px] sm:min-h-[96px] md:min-h-[120px]">
          {playerHand.map((c, idx) => {
            const canDoubleUpTrigger = !isPlayerTurnToPickFirst 
              && playedOpponentCard !== null 
              && c.nationality === playedOpponentCard.nationality 
              && SquadSwapEngine.hasDoubleUpPartner(playerHand, c.id, c.nationality);

            const isPlayed = playedPlayerCard?.id === c.id;
            if (isPlayed) return null;

            const isValidAssist = canPlayerAssist && playedPlayerCard && c.nationality === playedPlayerCard.nationality;

            const securesVictory = !canPlayerAssist && playedOpponentCard !== null && !playedPlayerCard && c.rating > playedOpponentCard.rating;
            const securesPenalties = !canPlayerAssist && playedOpponentCard !== null && !playedPlayerCard && c.rating === playedOpponentCard.rating;

            const isCardDisabled = isWaitingForCoach ||
              gamePhase === 'DRAW' ||
              (turnResult !== null && !canPlayerAssist) ||
              (canPlayerAssist 
                ? !isValidAssist 
                : (playedPlayerCard !== null || (!isPlayerTurnToPickFirst && !playedOpponentCard)));

            return (
              <motion.div
                key={c.id}
                initial={{ x: "30vw", y: "-20vh", scale: 0.1, rotate: -45, opacity: 0, filter: 'blur(6px)' }}
                animate={{
                  x: 0,
                  y: Math.abs(idx - (playerHand.length - 1) / 2) * 2,
                  scale: 1,
                  rotate: (idx - (playerHand.length - 1) / 2) * 3,
                  opacity: 1,
                  filter: 'blur(0px)'
                }}
                transition={{
                  ...getCardPhysics(c),
                  delay: idx * 0.03,
                }}
                className={`relative transition-all duration-150 origin-bottom hover:-translate-y-3 hover:rotate-0 hover:scale-110 hover:z-30 ${!isCardDisabled ? 'cursor-grab active:cursor-grabbing' : ''}`}
                draggable={!isCardDisabled}
                onDragStart={(e) => {
                  if (!isCardDisabled) {
                    e.dataTransfer.setData('text/plain', c.id);
                    soundFx.playCardSwoosh();
                  }
                }}
              >
                {isValidAssist && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[6px] sm:text-[7.5px] font-black font-mono px-1 py-0.2 rounded-full border border-black z-30 shadow animate-bounce uppercase whitespace-nowrap">
                    👉 ASSIST!
                  </div>
                )}
                {securesVictory && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-[6px] sm:text-[7.5px] font-black font-cartoon px-1 py-0.2 rounded-full border border-black z-30 shadow animate-pulse flex items-center space-x-0.5 whitespace-nowrap">
                    <span>🏆 WIN</span>
                  </div>
                )}
                {securesPenalties && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[6px] sm:text-[7.5px] font-black font-cartoon px-1 py-0.2 rounded-full border border-black z-30 shadow animate-pulse flex items-center space-x-0.5 whitespace-nowrap">
                    <span>👟 PENS</span>
                  </div>
                )}
                <CardView
                  card={c}
                  onClick={() => handlePlayCard(c)}
                  canDoubleUp={canDoubleUpTrigger}
                  disabled={isCardDisabled}
                  size="sm"
                />
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

