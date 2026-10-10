import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { getCountryFlag } from '../utils/flags';

export interface Nation {
  id: string;
  name: string;
  emoji: string;
  groupName: string;
  flagCode: string;
  bgGradient: string;
}

export const AVAILABLE_NATIONS: Nation[] = [
  {
    id: 'usa',
    name: 'USA',
    emoji: '🇺🇸',
    groupName: 'Group A',
    flagCode: 'USA',
    bgGradient: 'from-blue-900 to-red-950',
  },
  {
    id: 'mex',
    name: 'MEXICO',
    emoji: '🇲🇽',
    groupName: 'Group A',
    flagCode: 'MEX',
    bgGradient: 'from-emerald-900 to-stone-950',
  },
  {
    id: 'can',
    name: 'CANADA',
    emoji: '🇨🇦',
    groupName: 'Group A',
    flagCode: 'CAN',
    bgGradient: 'from-rose-900 to-stone-950',
  },
  {
    id: 'bra',
    name: 'BRAZIL',
    emoji: '🇧🇷',
    groupName: 'Group B',
    flagCode: 'BRA',
    bgGradient: 'from-emerald-800 to-yellow-950',
  },
  {
    id: 'arg',
    name: 'ARGENTINA',
    emoji: '🇦🇷',
    groupName: 'Group B',
    flagCode: 'ARG',
    bgGradient: 'from-sky-800 to-slate-950',
  },
  {
    id: 'fra',
    name: 'FRANCE',
    emoji: '🇫🇷',
    groupName: 'Group C',
    flagCode: 'FRA',
    bgGradient: 'from-indigo-900 to-stone-950',
  },
  {
    id: 'ger',
    name: 'GERMANY',
    emoji: '🇩🇪',
    groupName: 'Group C',
    flagCode: 'GER',
    bgGradient: 'from-stone-800 to-amber-950',
  },
  {
    id: 'cro',
    name: 'CROATIA',
    emoji: '🇭🇷',
    groupName: 'Group D',
    flagCode: 'CRO',
    bgGradient: 'from-red-800 to-slate-900',
  },
  {
    id: 'esp',
    name: 'SPAIN',
    emoji: '🇪🇸',
    groupName: 'Group D',
    flagCode: 'ESP',
    bgGradient: 'from-amber-800 to-red-950',
  },
  {
    id: 'por',
    name: 'PORTUGAL',
    emoji: '🇵🇹',
    groupName: 'Group E',
    flagCode: 'POR',
    bgGradient: 'from-emerald-900 to-red-950',
  },
  {
    id: 'eng',
    name: 'ENGLAND',
    emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    groupName: 'Group E',
    flagCode: 'ENG',
    bgGradient: 'from-slate-800 to-blue-950',
  },
  {
    id: 'ned',
    name: 'NETHERLANDS',
    emoji: '🇳🇱',
    groupName: 'Group F',
    flagCode: 'NED',
    bgGradient: 'from-orange-800 to-stone-950',
  },
  {
    id: 'bel',
    name: 'BELGIUM',
    emoji: '🇧🇪',
    groupName: 'Group G',
    flagCode: 'BEL',
    bgGradient: 'from-red-900 to-amber-950',
  },
  {
    id: 'nor',
    name: 'NORWAY',
    emoji: '🇳🇴',
    groupName: 'Group H',
    flagCode: 'NOR',
    bgGradient: 'from-red-900 to-blue-900',
  },
  {
    id: 'egy',
    name: 'EGYPT',
    emoji: '🇪🇬',
    groupName: 'Group H',
    flagCode: 'EGY',
    bgGradient: 'from-red-950 to-stone-900',
  },
  {
    id: 'mar',
    name: 'MOROCCO',
    emoji: '🇲🇦',
    groupName: 'Group I',
    flagCode: 'MAR',
    bgGradient: 'from-emerald-950 to-red-950',
  },
  {
    id: 'sen',
    name: 'SENEGAL',
    emoji: '🇸🇳',
    groupName: 'Group I',
    flagCode: 'SEN',
    bgGradient: 'from-emerald-900 to-amber-950',
  },
  {
    id: 'jpn',
    name: 'JAPAN',
    emoji: '🇯🇵',
    groupName: 'Group J',
    flagCode: 'JPN',
    bgGradient: 'from-blue-950 to-stone-950',
  },
  {
    id: 'kor',
    name: 'KOREA',
    emoji: '🇰🇷',
    groupName: 'Group J',
    flagCode: 'KOR',
    bgGradient: 'from-red-950 to-blue-950',
  },
  {
    id: 'uru',
    name: 'URUGUAY',
    emoji: '🇺🇾',
    groupName: 'Group K',
    flagCode: 'URU',
    bgGradient: 'from-sky-900 to-stone-900',
  },
  {
    id: 'col',
    name: 'COLOMBIA',
    emoji: '🇨🇴',
    groupName: 'Group K',
    flagCode: 'COL',
    bgGradient: 'from-yellow-900 to-stone-900',
  },
  {
    id: 'ita',
    name: 'ITALY',
    emoji: '🇮🇹',
    groupName: 'Group L',
    flagCode: 'ITA',
    bgGradient: 'from-blue-800 to-emerald-950',
  },
  {
    id: 'srb',
    name: 'SERBIA',
    emoji: '🇷🇸',
    groupName: 'Group L',
    flagCode: 'SRB',
    bgGradient: 'from-red-800 to-blue-950',
  },
  {
    id: 'sui',
    name: 'SWITZERLAND',
    emoji: '🇨🇭',
    groupName: 'Group M',
    flagCode: 'SUI',
    bgGradient: 'from-red-800 to-stone-950',
  },
  {
    id: 'aut',
    name: 'AUSTRIA',
    emoji: '🇦🇹',
    groupName: 'Group M',
    flagCode: 'AUT',
    bgGradient: 'from-red-900 to-slate-900',
  },
  {
    id: 'pol',
    name: 'POLAND',
    emoji: '🇵🇱',
    groupName: 'Group N',
    flagCode: 'POL',
    bgGradient: 'from-rose-800 to-slate-900',
  },
  {
    id: 'swe',
    name: 'SWEDEN',
    emoji: '🇸🇪',
    groupName: 'Group N',
    flagCode: 'SWE',
    bgGradient: 'from-blue-800 to-yellow-950',
  },
  {
    id: 'den',
    name: 'DENMARK',
    emoji: '🇩🇰',
    groupName: 'Group O',
    flagCode: 'DEN',
    bgGradient: 'from-red-800 to-zinc-950',
  },
  {
    id: 'tur',
    name: 'TURKEY',
    emoji: '🇹🇷',
    groupName: 'Group O',
    flagCode: 'TUR',
    bgGradient: 'from-red-900 to-stone-950',
  },
  {
    id: 'ecu',
    name: 'ECUADOR',
    emoji: '🇪🇨',
    groupName: 'Group P',
    flagCode: 'ECU',
    bgGradient: 'from-yellow-800 to-blue-950',
  },
  {
    id: 'par',
    name: 'PARAGUAY',
    emoji: '🇵🇾',
    groupName: 'Group P',
    flagCode: 'PAR',
    bgGradient: 'from-red-800 to-blue-950',
  },
  {
    id: 'civ',
    name: 'IVORY COAST',
    emoji: '🇨🇮',
    groupName: 'Group Q',
    flagCode: 'CIV',
    bgGradient: 'from-orange-800 to-emerald-950',
  },
  {
    id: 'gha',
    name: 'GHANA',
    emoji: '🇬🇭',
    groupName: 'Group Q',
    flagCode: 'GHA',
    bgGradient: 'from-yellow-800 to-emerald-950',
  },
  {
    id: 'alg',
    name: 'ALGERIA',
    emoji: '🇩🇿',
    groupName: 'Group R',
    flagCode: 'ALG',
    bgGradient: 'from-emerald-900 to-stone-950',
  },
  {
    id: 'cmr',
    name: 'CAMEROON',
    emoji: '🇨🇲',
    groupName: 'Group R',
    flagCode: 'CMR',
    bgGradient: 'from-emerald-800 to-red-950',
  },
  {
    id: 'nga',
    name: 'NIGERIA',
    emoji: '🇳🇬',
    groupName: 'Group S',
    flagCode: 'NGA',
    bgGradient: 'from-emerald-900 to-stone-900',
  },
  {
    id: 'chi',
    name: 'CHILE',
    emoji: '🇨🇱',
    groupName: 'Group S',
    flagCode: 'CHI',
    bgGradient: 'from-red-800 to-blue-950',
  },
  {
    id: 'aus',
    name: 'AUSTRALIA',
    emoji: '🇦🇺',
    groupName: 'Group T',
    flagCode: 'AUS',
    bgGradient: 'from-amber-800 to-emerald-950',
  },
  {
    id: 'irn',
    name: 'IRAN',
    emoji: '🇮🇷',
    groupName: 'Group T',
    flagCode: 'IRN',
    bgGradient: 'from-emerald-900 to-red-950',
  },
  {
    id: 'ksa',
    name: 'SAUDI ARABIA',
    emoji: '🇸🇦',
    groupName: 'Group U',
    flagCode: 'KSA',
    bgGradient: 'from-emerald-800 to-stone-950',
  },
  {
    id: 'qat',
    name: 'QATAR',
    emoji: '🇶🇦',
    groupName: 'Group U',
    flagCode: 'QAT',
    bgGradient: 'from-amber-950 to-stone-950',
  },
  {
    id: 'jor',
    name: 'JORDAN',
    emoji: '🇯🇴',
    groupName: 'Group V',
    flagCode: 'JOR',
    bgGradient: 'from-emerald-900 to-red-950',
  },
  {
    id: 'uzb',
    name: 'UZBEKISTAN',
    emoji: '🇺🇿',
    groupName: 'Group V',
    flagCode: 'UZB',
    bgGradient: 'from-blue-800 to-emerald-950',
  },
  {
    id: 'irq',
    name: 'IRAQ',
    emoji: '🇮🇶',
    groupName: 'Group W',
    flagCode: 'IRQ',
    bgGradient: 'from-red-900 to-emerald-950',
  },
  {
    id: 'pan',
    name: 'PANAMA',
    emoji: '🇵🇦',
    groupName: 'Group W',
    flagCode: 'PAN',
    bgGradient: 'from-red-800 to-blue-950',
  },
  {
    id: 'jam',
    name: 'JAMAICA',
    emoji: '🇯🇲',
    groupName: 'Group X',
    flagCode: 'JAM',
    bgGradient: 'from-yellow-800 to-emerald-950',
  },
  {
    id: 'nzl',
    name: 'NEW ZEALAND',
    emoji: '🇳🇿',
    groupName: 'Group X',
    flagCode: 'NZL',
    bgGradient: 'from-neutral-900 to-slate-950',
  },
  {
    id: 'sco',
    name: 'SCOTLAND',
    emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    groupName: 'Group Y',
    flagCode: 'SCO',
    bgGradient: 'from-blue-900 to-indigo-950',
  },
  {
    id: 'cze',
    name: 'CZECH REPUBLIC',
    emoji: '🇨🇿',
    groupName: 'Group Y',
    flagCode: 'CZE',
    bgGradient: 'from-blue-900 to-red-950',
  },
  {
    id: 'bih',
    name: 'BOSNIA & HERZEGOVINA',
    emoji: '🇧🇦',
    groupName: 'Group Z',
    flagCode: 'BIH',
    bgGradient: 'from-blue-900 to-yellow-950',
  },
  {
    id: 'ukr',
    name: 'UKRAINE',
    emoji: '🇺🇦',
    groupName: 'Group Z',
    flagCode: 'UKR',
    bgGradient: 'from-blue-900 to-amber-950',
  },
  {
    id: 'gre',
    name: 'GREECE',
    emoji: '🇬🇷',
    groupName: 'Group AA',
    flagCode: 'GRE',
    bgGradient: 'from-blue-800 to-cyan-950',
  },
  {
    id: 'hun',
    name: 'HUNGARY',
    emoji: '🇭🇺',
    groupName: 'Group AA',
    flagCode: 'HUN',
    bgGradient: 'from-red-900 to-emerald-950',
  },
  {
    id: 'rou',
    name: 'ROMANIA',
    emoji: '🇷🇴',
    groupName: 'Group AB',
    flagCode: 'ROU',
    bgGradient: 'from-blue-900 to-amber-950',
  },
  {
    id: 'svk',
    name: 'SLOVAKIA',
    emoji: '🇸🇰',
    groupName: 'Group AB',
    flagCode: 'SVK',
    bgGradient: 'from-blue-900 to-red-950',
  },
  {
    id: 'svn',
    name: 'SLOVENIA',
    emoji: '🇸🇮',
    groupName: 'Group AC',
    flagCode: 'SVN',
    bgGradient: 'from-blue-900 to-teal-950',
  },
  {
    id: 'rsa',
    name: 'SOUTH AFRICA',
    emoji: '🇿🇦',
    groupName: 'Group AC',
    flagCode: 'RSA',
    bgGradient: 'from-emerald-900 to-amber-950',
  },
  {
    id: 'tun',
    name: 'TUNISIA',
    emoji: '🇹🇳',
    groupName: 'Group AD',
    flagCode: 'TUN',
    bgGradient: 'from-red-900 to-stone-950',
  },
  {
    id: 'cpv',
    name: 'CAPE VERDE',
    emoji: '🇨🇻',
    groupName: 'Group AD',
    flagCode: 'CPV',
    bgGradient: 'from-blue-900 to-amber-950',
  },
  {
    id: 'hai',
    name: 'HAITI',
    emoji: '🇭🇹',
    groupName: 'Group AE',
    flagCode: 'HAI',
    bgGradient: 'from-blue-900 to-red-950',
  },
  {
    id: 'cuw',
    name: 'CURAÇAO',
    emoji: '🇨🇼',
    groupName: 'Group AE',
    flagCode: 'CUW',
    bgGradient: 'from-blue-950 to-amber-950',
  },
];

interface WCNationSelectProps {
  onSelectNation: (nation: Nation) => void;
  onBack: () => void;
}

export const WCNationSelect: React.FC<WCNationSelectProps> = ({
  onSelectNation,
  onBack,
}) => {
  return (
    <div className="w-full min-h-screen bg-[#06120b] text-slate-100 flex flex-col p-4 sm:p-6 relative select-none">
      
      {/* 2026 hosts banners / decorative elements top */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />
      
      {/* Stadium / Flags of hosts layout */}
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center relative z-10">
        
        {/* Back navigation button */}
        <button
          onClick={onBack}
          className="self-start mb-2 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border-2 border-black text-[10px] sm:text-xs text-yellow-400 font-cartoon font-black uppercase flex items-center space-x-1 transition active:scale-95 shadow"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Back</span>
        </button>

        {/* Title */}
        <div className="text-center mb-3 sm:mb-5">
          <div className="inline-block px-2 py-0.5 bg-yellow-400 text-black border border-black rounded-lg mb-1 font-cartoon font-black text-xs uppercase tracking-wider shadow">
            SELECT NATIONAL TEAM
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black font-cartoon tracking-tight text-white uppercase leading-none drop-shadow">
            WHO WILL YOU LEAD TO THE THRONE?
          </h2>
          <p className="text-[9px] sm:text-xs text-yellow-300 font-cartoon font-bold mt-1 uppercase tracking-wider">
            Choose your team for the World Cup and start the group stage!
          </p>
        </div>

        {/* Grid of Nations */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3 w-full">
          {AVAILABLE_NATIONS.map((nation, idx) => (
            <motion.div
              key={nation.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02, duration: 0.2 }}
              onClick={() => onSelectNation(nation)}
              className={`cursor-pointer rounded-xl border-2 border-black p-2 bg-gradient-to-b ${nation.bgGradient} shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 relative overflow-hidden group flex flex-col items-center justify-center h-28 sm:h-34`}
            >
              {/* Card visual elements: subtle outline card border inside */}
              <div className="absolute inset-1 border border-white/10 rounded-lg pointer-events-none group-hover:border-yellow-400/30 transition duration-150" />

              {/* High Quality Flag Image Centered */}
              <div className="w-12 h-7 sm:w-16 sm:h-10 mb-1.5 transform group-hover:scale-105 transition duration-200 filter drop-shadow overflow-hidden rounded border border-black/30 flex items-center justify-center bg-black/20">
                <img
                  src={getCountryFlag(nation.flagCode)}
                  alt={nation.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Nation Name below the flag */}
              <h3 className="text-xs sm:text-sm font-black font-cartoon text-white leading-none uppercase tracking-wide text-center group-hover:text-yellow-300 transition duration-150 truncate max-w-full">
                {nation.name}
              </h3>
              
              <span className="text-[7.5px] sm:text-[9px] bg-black/40 border border-white/20 px-1 py-0.2 rounded font-mono text-slate-400 mt-1">
                {nation.flagCode}
              </span>

              {/* Hover highlight overlay */}
              <div className="absolute bottom-1 right-1.5 opacity-0 group-hover:opacity-100 transition duration-150 flex items-center space-x-0.5">
                <span className="text-[7.5px] font-cartoon font-black uppercase text-yellow-400">PICK</span>
                <ShieldCheck className="w-2.5 h-2.5 text-yellow-400" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
