import React from 'react';
import { Trophy, ArrowRight, Play } from 'lucide-react';

interface TournamentBracketProps {
  currentStage: 'QUARTER_FINAL' | 'SEMI_FINAL' | 'FINAL' | 'CHAMPION' | 'ELIMINATED';
  onStartMatch: () => void;
  onReset: () => void;
  playerTeamName?: string;
  playerTeamEmoji?: string;
}

export const TournamentBracket: React.FC<TournamentBracketProps> = ({
  currentStage,
  onStartMatch,
  onReset,
  playerTeamName = 'YOUR TEAM',
  playerTeamEmoji = '⭐️',
}) => {
  // Let's model the static/dynamic bracket
  const isQFPlayed = currentStage !== 'QUARTER_FINAL';
  const isSFPlayed = currentStage === 'FINAL' || currentStage === 'CHAMPION';
  const isFPlayed = currentStage === 'CHAMPION';

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0b1911] border-2 sm:border-4 border-black rounded-xl sm:rounded-2xl p-2 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none text-slate-100 flex flex-col items-center animate-pop">
      
      {/* Title */}
      <div className="text-center mb-2 sm:mb-4">
        <h2 className="text-xl sm:text-3xl font-black font-sports text-white tracking-tight uppercase leading-none flex items-center justify-center space-x-2">
          <span>🏆</span>
          <span>KNOCKOUT TOURNAMENT</span>
        </h2>
        <p className="text-[9px] sm:text-xs text-yellow-300 font-sports font-bold mt-0.5 uppercase tracking-wider">
          Defeat all opponents in a row to win the Gold Trophy!
        </p>
      </div>

      {/* Bracket Tree Grid */}
      <div className="w-full grid grid-cols-3 gap-3 sm:gap-6 items-center bg-black/40 border-2 border-slate-800 rounded-xl p-3 sm:p-6 min-h-[320px] overflow-x-auto">
        
        {/* ROUND 1: QUARTER-FINALS */}
        <div className="flex flex-col space-y-6 min-w-[150px]">
          <h3 className="text-[10px] font-sports font-black text-amber-500 border-b border-amber-500/30 pb-1 uppercase tracking-wider text-center">
            Quarter-final
          </h3>

          {/* Match 1 */}
          <div className="flex flex-col bg-slate-900 border border-slate-700 rounded-lg p-2 space-y-1 shadow">
            <div className={`flex items-center justify-between text-xs px-1 py-0.5 rounded ${currentStage === 'QUARTER_FINAL' ? 'bg-yellow-500/20 text-yellow-300 animate-pulse font-black' : isQFPlayed ? 'bg-emerald-500/10 text-emerald-400' : ''}`}>
              <span className="truncate">{playerTeamEmoji} {playerTeamName}</span>
              {isQFPlayed && <span className="font-bold">✓</span>}
            </div>
            <div className="flex items-center justify-between text-xs px-1 py-0.5 text-slate-400">
              <span>😁 Smile Kloppo</span>
              {isQFPlayed && <span className="text-xs">Poraz</span>}
            </div>
          </div>

          {/* Match 2 */}
          <div className="flex flex-col bg-slate-900 border border-slate-700 rounded-lg p-2 space-y-1 shadow">
            <div className={`flex items-center justify-between text-xs px-1 py-0.5 rounded ${isQFPlayed ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-200'}`}>
              <span>🤨 Don Carlo</span>
              {isQFPlayed && <span className="font-bold">✓</span>}
            </div>
            <div className="flex items-center justify-between text-xs px-1 py-0.5 text-slate-400">
              <span>🥸 Coach Happy</span>
              {isQFPlayed && <span className="text-xs">Poraz</span>}
            </div>
          </div>

          {/* Match 3 */}
          <div className="flex flex-col bg-slate-900 border border-slate-700 rounded-lg p-2 space-y-1 shadow">
            <div className={`flex items-center justify-between text-xs px-1 py-0.5 rounded ${isQFPlayed ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-200'}`}>
              <span>🧠 Profesor Baldy</span>
              {isQFPlayed && <span className="font-bold">✓</span>}
            </div>
            <div className="flex items-center justify-between text-xs px-1 py-0.5 text-slate-400">
              <span>🤫 Special Bus</span>
              {isQFPlayed && <span className="text-xs">Poraz</span>}
            </div>
          </div>

          {/* Match 4 */}
          <div className="flex flex-col bg-slate-900 border border-slate-700 rounded-lg p-2 space-y-1 shadow">
            <div className={`flex items-center justify-between text-xs px-1 py-0.5 rounded ${isQFPlayed ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-200'}`}>
              <span>France</span>
              {isQFPlayed && <span className="font-bold">✓</span>}
            </div>
            <div className="flex items-center justify-between text-xs px-1 py-0.5 text-slate-400">
              <span>Croatia</span>
              {isQFPlayed && <span className="text-xs">Loss</span>}
            </div>
          </div>
        </div>

        {/* ROUND 2: SEMI-FINALS */}
        <div className="flex flex-col space-y-16 min-w-[150px]">
          <h3 className="text-[10px] font-sports font-black text-amber-500 border-b border-amber-500/30 pb-1 uppercase tracking-wider text-center">
            Semifinals
          </h3>

          {/* Semi Match 1 */}
          <div className="flex flex-col bg-slate-900 border-2 border-yellow-500/30 rounded-lg p-2 space-y-1 shadow-lg relative">
            {!isQFPlayed ? (
              <div className="text-center py-2 text-[10px] text-slate-500 font-sports font-bold">Waiting for Quarter-final</div>
            ) : (
              <>
                <div className={`flex items-center justify-between text-xs px-1 py-0.5 rounded ${currentStage === 'SEMI_FINAL' ? 'bg-yellow-500/20 text-yellow-300 animate-pulse font-black' : isSFPlayed ? 'bg-emerald-500/10 text-emerald-400' : ''}`}>
                  <span className="truncate">{playerTeamEmoji} {playerTeamName}</span>
                  {isSFPlayed && <span className="font-bold">✓</span>}
                </div>
                <div className="flex items-center justify-between text-xs px-1 py-0.5 text-slate-300">
                  <span>🤨 Don Carlo</span>
                  {isSFPlayed && <span className="text-xs">Loss</span>}
                </div>
              </>
            )}
          </div>

          {/* Semi Match 2 */}
          <div className="flex flex-col bg-slate-900 border border-slate-700 rounded-lg p-2 space-y-1 shadow-lg">
            {!isQFPlayed ? (
              <div className="text-center py-2 text-[10px] text-slate-500 font-sports font-bold">Waiting for Quarter-final</div>
            ) : (
              <>
                <div className={`flex items-center justify-between text-xs px-1 py-0.5 rounded ${isSFPlayed ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-200'}`}>
                  <span>🧠 Profesor Baldy</span>
                  {isSFPlayed && <span className="font-bold">✓</span>}
                </div>
                <div className="flex items-center justify-between text-xs px-1 py-0.5 text-slate-400">
                  <span>France</span>
                  {isSFPlayed && <span className="text-xs">Loss</span>}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ROUND 3: GRAND FINAL */}
        <div className="flex flex-col space-y-24 min-w-[150px]">
          <h3 className="text-[10px] font-sports font-black text-amber-500 border-b border-amber-500/30 pb-1 uppercase tracking-wider text-center">
            FINALS
          </h3>

          <div className="flex flex-col bg-slate-900 border-4 border-yellow-400 rounded-xl p-3 space-y-2 shadow-2xl relative">
            {!isSFPlayed ? (
              <div className="text-center py-4 text-[10px] text-slate-500 font-sports font-bold">Waiting for Semifinals</div>
            ) : (
              <>
                <div className={`flex items-center justify-between text-sm px-1 py-0.5 rounded ${currentStage === 'FINAL' ? 'bg-yellow-500/20 text-yellow-300 animate-pulse font-black' : isFPlayed ? 'bg-emerald-500/10 text-emerald-400 font-black' : ''}`}>
                  <span className="truncate">{playerTeamEmoji} {playerTeamName}</span>
                  {isFPlayed && <span className="text-yellow-400 font-black">🏆 WINNER</span>}
                </div>
                <div className="flex items-center justify-between text-sm px-1 py-0.5 text-slate-300">
                  <span>🧠 Profesor Baldy</span>
                  {isFPlayed && <span className="text-xs text-rose-500">Runner-up</span>}
                </div>
              </>
            )}
          </div>
        </div>

      </div>

      {/* Navigation / Action Footer */}
      <div className="w-full mt-6 pt-4 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {currentStage === 'CHAMPION' ? (
          <div className="text-center sm:text-left flex-1">
            <span className="text-2xl">🎉</span>
            <span className="text-emerald-400 font-sports font-black text-lg sm:text-xl ml-2 uppercase">
              CONGRATULATIONS! YOU WON THE TOURNAMENT!
            </span>
            <p className="text-xs text-slate-400 mt-1">You outsmarted all managers and claimed the ultimate title in 2026!</p>
          </div>
        ) : currentStage === 'ELIMINATED' ? (
          <div className="text-center sm:text-left flex-1">
            <span className="text-2xl">😢</span>
            <span className="text-red-500 font-sports font-black text-lg sm:text-xl ml-2 uppercase">
              ELIMINATED FROM THE TOURNAMENT
            </span>
            <p className="text-xs text-slate-400 mt-1">Better luck next time. Your defense or attack fell short!</p>
          </div>
        ) : (
          <div className="text-center sm:text-left flex-1">
            <span className="text-xs font-mono text-slate-400 uppercase">Next Match:</span>
            <h4 className="text-lg sm:text-xl font-black text-white leading-none mt-1">
              {currentStage === 'QUARTER_FINAL' && '⚽ QUARTER-FINAL vs Smile Kloppo (L3)'}
              {currentStage === 'SEMI_FINAL' && '⚽ SEMI-FINAL vs Don Carlo (L4)'}
              {currentStage === 'FINAL' && '🔥 GRAND FINAL vs Profesor Baldy (L5)'}
            </h4>
          </div>
        )}

        <div className="flex space-x-3 shrink-0">
          <button
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-300 border-2 border-black font-sports font-black text-xs uppercase shadow tracking-wider active:scale-95 transition"
          >
            Main Menu
          </button>

          {currentStage !== 'CHAMPION' && currentStage !== 'ELIMINATED' && (
            <button
              onClick={onStartMatch}
              className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black font-sports font-black text-xs uppercase shadow-[3px_3px_0px_rgba(0,0,0,1)] tracking-wider flex items-center space-x-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Start Match</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
