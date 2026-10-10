import React, { useState, useMemo, useEffect } from 'react';
import { ALL_CARDS } from '../data/cards';
import { CardView } from './CardView';
import { Trophy, X, Search, Sparkles, Loader2 } from 'lucide-react';

interface AwardsGalleryModalProps {
  onClose: () => void;
}

export const AwardsGalleryModal: React.FC<AwardsGalleryModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<string>('ALL');
  const [selectedRarity, setSelectedRarity] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 1-second loading timer to allow cards & images to cleanly parse and preload in memory
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Load all cards and sort them by rating descending
  const sortedCards = useMemo(() => {
    return [...ALL_CARDS].sort((a, b) => b.rating - a.rating);
  }, []);

  // Filter cards based on user search and filters
  const filteredCards = useMemo(() => {
    return sortedCards.filter(card => {
      const matchesSearch = 
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.realName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.nationality.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPosition = selectedPosition === 'ALL' || card.position === selectedPosition;
      
      const matchesRarity = selectedRarity === 'ALL' || 
        (selectedRarity === 'LEGEND' && (card.rarity === 'LEGEND' || card.rarity === 'LEGEND_RETRO')) ||
        (selectedRarity === 'SHINEY' && card.rarity === 'SHINEY') ||
        (selectedRarity === 'COMMON' && card.rarity !== 'LEGEND' && card.rarity !== 'LEGEND_RETRO' && card.rarity !== 'SHINEY');

      return matchesSearch && matchesPosition && matchesRarity;
    });
  }, [sortedCards, searchTerm, selectedPosition, selectedRarity]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none animate-pop">
      <div className="w-full max-w-5xl bg-[#1b2f23] border-4 border-black rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-4 border-black mb-4 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-400 border-2 border-black rounded-xl text-black">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-sports tracking-tight text-white uppercase">
                SQUAD SWAP PLAYERS ({filteredCards.length} / {ALL_CARDS.length})
              </h2>
              <p className="text-xs text-yellow-300 font-sports uppercase tracking-wider">
                Explore the complete collection of World Cup 2026 football cards
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

        {/* Filter Toolbar */}
        <div className="bg-black/40 border border-slate-800/60 p-3 rounded-xl mb-4 flex flex-col md:flex-row gap-3 items-center justify-between shrink-0">
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#111e16] border-2 border-black rounded-lg py-1.5 pl-9 pr-4 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 shadow-inner"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center w-full md:w-auto justify-center md:justify-end">
            {/* Position filter */}
            <div className="flex bg-[#111e16] border-2 border-black rounded-lg p-0.5 overflow-hidden">
              {['ALL', 'ATT', 'MID', 'DEF'].map((pos) => (
                <button
                  key={pos}
                  onClick={() => setSelectedPosition(pos)}
                  className={`px-2.5 py-1 text-[10px] font-sports font-bold rounded uppercase transition-all duration-150 ${
                    selectedPosition === pos
                      ? 'bg-yellow-400 text-black font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>

            {/* Rarity Filter */}
            <div className="flex bg-[#111e16] border-2 border-black rounded-lg p-0.5 overflow-hidden">
              {['ALL', 'LEGEND', 'SHINEY', 'COMMON'].map((rar) => (
                <button
                  key={rar}
                  onClick={() => setSelectedRarity(rar)}
                  className={`px-2.5 py-1 text-[10px] font-sports font-bold rounded uppercase transition-all duration-150 ${
                    selectedRarity === rar
                      ? 'bg-amber-500 text-black font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {rar}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Content with 1-second preloading state */}
        {isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center space-y-4 overflow-hidden">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-yellow-400 border-4 border-black flex items-center justify-center animate-bounce shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Trophy className="w-7 h-7 text-black" />
              </div>
              <Loader2 className="w-6 h-6 text-yellow-300 animate-spin absolute -bottom-2 -right-2" />
            </div>

            <div>
              <h3 className="text-xl font-sports font-black text-yellow-300 uppercase tracking-wider animate-pulse">
                PRELOADING ALBUM & CARDS...
              </h3>
              <p className="text-xs font-mono text-slate-300 mt-0.5">
                Loading caricatures, attributes & special edition artworks
              </p>
            </div>

            {/* Shimmer skeleton grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 w-full max-w-4xl opacity-50 overflow-hidden py-2 justify-items-center">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-24 sm:w-28 md:w-32 h-36 sm:h-40 md:h-44 rounded-xl bg-white/10 animate-pulse border-2 border-white/20 flex flex-col justify-between p-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="w-6 h-4 bg-white/20 rounded" />
                    <div className="w-6 h-4 bg-white/20 rounded" />
                  </div>
                  <div className="w-14 h-14 bg-white/15 rounded-full mx-auto self-center" />
                  <div className="w-full h-3 bg-white/20 rounded mt-auto" />
                </div>
              ))}
            </div>
          </div>
        ) : filteredCards.length > 0 ? (
          <div className="overflow-y-auto flex-1 py-2 pr-1 flex flex-col">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4 justify-items-center">
              {filteredCards.map(c => (
                <div key={c.id} className="flex flex-col items-center">
                  <CardView card={c} size="md" />
                </div>
              ))}

              {/* Mystery "MORE PLAYERS COMING SOON" Card inside grid */}
              <div className="flex flex-col items-center">
                <div className="w-24 sm:w-28 md:w-32 h-36 sm:h-40 md:h-44 rounded-xl border-3 border-dashed border-yellow-400 bg-gradient-to-b from-yellow-500/20 via-amber-950/40 to-black/90 flex flex-col items-center justify-between p-2 text-center shadow-[4px_6px_0px_0px_rgba(0,0,0,1)] group hover:scale-105 hover:-translate-y-1 transition select-none relative overflow-hidden">
                  {/* Card top bar */}
                  <div className="flex items-center justify-between w-full px-1 z-10">
                    <span className="text-xs font-black font-sports text-yellow-400 tracking-tighter">
                      ??
                    </span>
                    <span className="text-[7px] font-black px-1 py-0.5 rounded border border-yellow-400/60 text-yellow-300 bg-yellow-400/10 uppercase">
                      SOON
                    </span>
                  </div>

                  {/* Centered mystery icon & text */}
                  <div className="flex flex-col items-center justify-center my-auto z-10">
                    <span className="text-3xl mb-1 animate-bounce">✨</span>
                    <span className="text-[9px] sm:text-[10px] font-sports font-black text-yellow-300 uppercase tracking-tight leading-tight px-1">
                      MORE PLAYERS COMING SOON
                    </span>
                    <span className="text-[7px] font-mono text-slate-300 mt-0.5">
                      Stay Tuned!
                    </span>
                  </div>

                  {/* Bottom nameplate */}
                  <div className="w-full py-0.5 px-1 bg-black/80 border border-yellow-400/40 rounded text-center z-10">
                    <span className="text-[8px] font-sports font-bold text-yellow-300 uppercase tracking-wide truncate block">
                      COMING SOON
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom "More Coming Soon" Banner */}
            <div className="mt-6 mb-2 p-3 bg-gradient-to-r from-yellow-500/20 via-amber-500/30 to-yellow-500/20 border-2 border-dashed border-yellow-400/50 rounded-xl flex items-center justify-center space-x-2 text-yellow-300 font-sports font-black text-xs sm:text-sm uppercase tracking-widest text-center shadow">
              <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>MORE PLAYERS COMING SOON!</span>
              <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-black/20 rounded-xl border border-dashed border-slate-800">
            <span className="text-4xl mb-2">🔍</span>
            <h3 className="text-lg font-sports font-black text-white uppercase">No Players Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Try adjusting your search criteria or filters to see more cards.
            </p>
          </div>
        )}

        <div className="mt-4 pt-3 border-t-2 border-black text-center text-xs font-sports text-yellow-300 flex justify-between items-center px-1 shrink-0">
          <span>⭐ Showing {filteredCards.length} of {ALL_CARDS.length} total players</span>
          <span className="hidden sm:inline">Squad Swap 2026 Engine</span>
        </div>

      </div>
    </div>
  );
};
