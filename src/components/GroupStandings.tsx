import React from 'react';
import { Trophy, Globe, Play } from 'lucide-react';

interface StandingTeam {
  id: string;
  name: string;
  emoji: string;
  p: number;
  w: number;
  d: number;
  l: number;
  pts: number;
}

interface GroupStandingsProps {
  standings: StandingTeam[];
  currentMatchIndex: number; // 0, 1, 2 for group matches
  onStartMatch: () => void;
  onReset: () => void;
  onStartKnockoutStage?: () => void;
  isGroupOver: boolean;
  didPlayerQualify: boolean;
}

export const GroupStandings: React.FC<GroupStandingsProps> = ({
  standings,
  currentMatchIndex,
  onStartMatch,
  onReset,
  onStartKnockoutStage,
  isGroupOver,
  didPlayerQualify,
}) => {
  // Sort teams by Points descending, then Wins descending, then Alphabetical
  const sortedStandings = [...standings].sort((a, b) => {
    if (b.pts !== a.pts) return b.pts - a.pts;
    if (b.w !== a.w) return b.w - a.w;
    return a.name.localeCompare(b.name);
  });

  const playerTeam = standings.find(t => t.id === 'player');

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#0b1911] border-2 sm:border-4 border-black rounded-xl sm:rounded-2xl p-2 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none text-slate-100 flex flex-col items-center animate-pop">
      
      {/* Unified 2026 hosts banner */}
      <div className="w-full bg-gradient-to-r from-red-600 via-stone-100 to-emerald-600 p-1 rounded-lg mb-2 sm:mb-4 border border-black sm:border-2 flex items-center justify-between px-2 sm:px-3 text-black text-[8px] sm:text-xs font-black font-sports uppercase tracking-wider shadow">
        <div className="flex items-center space-x-1">
          <span>🇨🇦</span>
          <span className="text-stone-900">CAN</span>
        </div>
        <div className="bg-black text-yellow-300 px-1.5 py-0.2 rounded border border-yellow-400 text-[7px] sm:text-[9px] font-mono">
          🏆 MUNDO COPA 2026
        </div>
        <div className="flex items-center space-x-1 text-stone-900">
          <span>USA 🇺🇸</span>
          <span className="text-blue-700 font-bold">★</span>
          <span>🇲🇽 MEX</span>
        </div>
      </div>

      {/* Title Banner */}
      <div className="text-center mb-2 sm:mb-4">
        <h2 className="text-lg sm:text-2xl font-black font-sports text-white tracking-tight uppercase leading-none flex items-center justify-center space-x-1.5">
          <span>🌍</span>
          <span>SVETSKO PRVENSTVO — GRUPA A</span>
        </h2>
        <p className="text-[8.5px] sm:text-xs text-yellow-300 font-sports font-bold mt-0.5 uppercase tracking-wider">
          Odigraj 3 meča. Prva 2 mesta prolaze u Polufinale!
        </p>
      </div>

      {/* Standings Table */}
      <div className="w-full bg-black/45 border-2 border-slate-800 rounded-xl p-3 sm:p-5 mb-6 overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b-2 border-slate-700 text-slate-400 font-sports text-[10px] sm:text-xs uppercase">
              <th className="py-2 px-1 text-center w-8">#</th>
              <th className="py-2 px-2">Reprezentacija</th>
              <th className="py-2 px-2 text-center">Odigrano</th>
              <th className="py-2 px-2 text-center">Pobeda</th>
              <th className="py-2 px-2 text-center">Nerešeno</th>
              <th className="py-2 px-2 text-center">Poraz</th>
              <th className="py-2 px-2 text-center font-bold text-yellow-400">Bodovi</th>
            </tr>
          </thead>
          <tbody>
            {sortedStandings.map((team, idx) => {
              const isQualifiedZone = idx < 2;
              const isPlayer = team.id === 'player';

              return (
                <tr
                  key={team.id}
                  className={`border-b border-slate-850/50 transition-colors ${
                    isPlayer ? 'bg-yellow-400/10' : ''
                  }`}
                >
                  <td className="py-3 px-1 text-center font-mono font-bold">
                    <span className={`inline-flex w-6 h-6 items-center justify-center rounded-md font-black ${
                      isQualifiedZone ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                      {idx + 1}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-bold flex items-center space-x-2">
                    <span className="text-lg">{team.emoji}</span>
                    <span className={isPlayer ? 'text-yellow-300 font-black' : 'text-slate-200'}>
                      {team.name}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-center font-mono">{team.p}</td>
                  <td className="py-3 px-2 text-center font-mono text-emerald-400">{team.w}</td>
                  <td className="py-3 px-2 text-center font-mono text-slate-400">{team.d}</td>
                  <td className="py-3 px-2 text-center font-mono text-rose-400">{team.l}</td>
                  <td className="py-3 px-2 text-center font-mono font-black text-yellow-300 bg-yellow-400/5">
                    {team.pts}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500 font-mono px-1">
          <span>🟢 Prve dve ekipe prolaze u eliminacionu rundu</span>
          <span>{playerTeam ? `${playerTeam.name}` : 'Tvoj tim'}</span>
        </div>
      </div>

      {/* Match Schedule / Phase Info */}
      <div className="w-full bg-slate-900 border border-slate-850 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          {isGroupOver ? (
            didPlayerQualify ? (
              <div>
                <span className="text-xl">🔥</span>
                <span className="font-sports font-black text-emerald-400 uppercase text-lg ml-2">
                  PLASMAN OSTVAREN!
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  Zauzeli ste jedno od prva dva mesta i plasirali se u polufinale prvenstva!
                </p>
              </div>
            ) : (
              <div>
                <span className="text-xl">😢</span>
                <span className="font-sports font-black text-red-500 uppercase text-lg ml-2">
                  ISPADANJE IZ GRUPE
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  Niste sakupili dovoljno bodova za plasman u sledeću rundu. Pokušajte ponovo!
                </p>
              </div>
            )
          ) : (
            <div>
              <span className="text-xs font-mono text-slate-400 uppercase">Grupa A — Kolo {currentMatchIndex + 1} od 3:</span>
              <h4 className="text-lg sm:text-xl font-black text-white leading-none mt-1 uppercase">
                {currentMatchIndex === 0 && 'Protivnik: Coach Happy 🥸 (Ted Lasso)'}
                {currentMatchIndex === 1 && 'Protivnik: The Special Bus 🤫 (Mourinho)'}
                {currentMatchIndex === 2 && 'Protivnik: Giga Smile Kloppo 😁 (Jürgen Klopp)'}
              </h4>
            </div>
          )}
        </div>

        <div className="flex space-x-3 shrink-0">
          <button
            onClick={onReset}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-300 border-2 border-black font-sports font-black text-xs uppercase shadow tracking-wider active:scale-95 transition"
          >
            Meni
          </button>

          {isGroupOver ? (
            didPlayerQualify && onStartKnockoutStage && (
              <button
                onClick={onStartKnockoutStage}
                className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black font-sports font-black text-xs uppercase shadow-[3px_3px_0px_rgba(0,0,0,1)] tracking-wider flex items-center space-x-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>U polufinale!</span>
              </button>
            )
          ) : (
            <button
              onClick={onStartMatch}
              className="px-6 py-2.5 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black border-2 border-black font-sports font-black text-xs uppercase shadow-[3px_3px_0px_rgba(0,0,0,1)] tracking-wider flex items-center space-x-1.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Igraj meč</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
