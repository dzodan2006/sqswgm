import React from 'react';
import { X, HelpCircle, Flame, ShieldAlert, Trophy, Sparkles } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto select-none">
      <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col text-slate-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-mono">
                Game Rules: Squad Swap 2026
              </h2>
              <p className="text-xs text-slate-400">Complete guide for matches and card duels</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto py-4 space-y-6 pr-1 text-sm leading-relaxed">
          
          {/* Section 1: Core Loop */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h3 className="text-base font-black text-emerald-400 uppercase font-mono flex items-center mb-2">
              ⚽ 1. Match Flow (18 Turns / 90 Minutes)
            </h3>
            <p className="text-slate-300">
              The match lasts exactly <strong className="text-white">18 turns</strong> (a 90-minute simulation where each turn represents 5 minutes). Each player always holds exactly <strong className="text-white">4 cards</strong> in hand. Turns are played alternately.
            </p>
            <p className="mt-2 text-slate-400 text-xs">
              When the first player plays a card on the pitch, the second player responds with a card of their choice. The card with the higher <strong className="text-amber-300 font-mono">Rating (1-100)</strong> wins the duel, and the winner claims <strong className="text-white">BOTH cards</strong> and places them into their <strong className="text-emerald-300">Squad Deck</strong> (pile of won cards).
            </p>
          </div>

          {/* Section 2: Double Up Special Rule */}
          <div className="bg-gradient-to-br from-rose-950/40 via-slate-950 to-slate-950 p-4 rounded-2xl border border-rose-500/40 shadow-lg">
            <h3 className="text-base font-black text-rose-400 uppercase font-mono flex items-center space-x-1.5 mb-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <span>2. Special Rule: DOUBLE UP</span>
            </h3>
            <p className="text-slate-200">
              This is the most crucial tactical element in the game! <strong className="text-rose-300">Available EXCLUSIVELY to the player responding second on a turn!</strong>
            </p>
            <div className="mt-2 pl-3 border-l-2 border-rose-500 text-xs text-rose-200/90 space-y-1">
              <p>
                👉 If the player playing second plays a card of the <strong className="text-white">SAME NATIONALITY</strong> (e.g., BRA vs BRA) as the first player...
              </p>
              <p>
                👉 <strong className="text-white">AND still has at least one more card of that same country</strong> in their hand as backup...
              </p>
              <p className="font-bold text-rose-300 pt-1">
                💥 They activate "DOUBLE UP" and AUTOMATICALLY WIN the duel, regardless of card ratings!
              </p>
            </div>
          </div>

          {/* Section 3: Penalty Shootout */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-amber-500/30">
            <h3 className="text-base font-black text-amber-400 uppercase font-mono flex items-center space-x-1.5 mb-2">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
              <span>3. Penalty Shootout Mechanics</span>
            </h3>
            <p className="text-slate-300">
              Penalties are moments of maximum risk and drama! They are triggered in two cases:
            </p>
            <ul className="list-disc list-inside text-xs text-slate-300 mt-2 space-y-1 pl-2">
              <li>When the played cards have the <strong className="text-amber-300">EXACT SAME RATING</strong> (e.g., 88 vs 88).</li>
              <li>When the played cards have the <strong className="text-amber-300">SAME NATIONALITY</strong> (and Double Up is not activated).</li>
            </ul>
            <p className="mt-2 text-xs text-slate-400">
              When this happens, play is paused. Both players randomly draw <strong className="text-white">3 extra cards</strong> from the remaining draw deck. The ratings of all 4 cards (1 original + 3 drawn) are added up, and the winner of the shootout takes <strong className="text-amber-400 font-bold">ALL 8 CARDS</strong> into their Squad Deck!
            </p>
          </div>

          {/* Section 4: End Game Top 11 */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-sky-500/30">
            <h3 className="text-base font-black text-sky-400 uppercase font-mono flex items-center space-x-1.5 mb-2">
              <Trophy className="w-5 h-5 text-sky-400" />
              <span>4. End Game Showdown (Top 11)</span>
            </h3>
            <p className="text-slate-300">
              After the 18th turn, any remaining cards in hand are discarded. The system examines the Squad Decks of both teams and selects the highest <strong className="text-sky-300 font-mono">11 rated cards (Top 11)</strong> for each side. The ratings of these 11 cards are summed up, and the player with the higher total wins the match!
            </p>
          </div>

          {/* Section 5: Rarities */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h3 className="text-base font-black text-fuchsia-400 uppercase font-mono flex items-center space-x-1.5 mb-2">
              <Sparkles className="w-5 h-5 text-fuchsia-400" />
              <span>5. Card Rarity Classes</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                🔹 COMMON: Sleek silver-blue clean border.
              </div>
              <div className="p-2 rounded bg-amber-950/40 border border-amber-400 text-amber-200 font-mono animate-shimmer">
                ✨ SHINEY: Shimmering gold gradient layout.
              </div>
              <div className="p-2 rounded bg-purple-950/50 border border-fuchsia-500 text-fuchsia-200 font-mono shadow-[0_0_10px_rgba(217,70,239,0.3)]">
                👑 LEGEND: Neon fuchsia glowing borders.
              </div>
              <div className="p-2 rounded bg-yellow-950/50 border border-amber-500 text-amber-200 font-mono sepia-[0.2]">
                🏆 LEGEND RETRO: Classic Panini-style sepia theme from the 80s.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Close */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-[10px] text-amber-400/80 font-mono">
            ⚖️ 100% Satirical parody protected under statutory Fair Use & Parody exceptions (17 U.S.C. § 107 & EU Directive 2019/790)
          </span>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black font-mono text-xs uppercase tracking-wider transition"
          >
            Understood, Let's Play!
          </button>
        </div>

      </div>
    </div>
  );
};
