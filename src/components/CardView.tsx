import React, { useState } from 'react';
import { Card } from '../types';
import { getCountryFlag } from '../utils/flags';
import { getPlayerCaricature } from '../utils/caricatures';

// Eager load all available player images at build time to prevent 404 network requests or console.error outputs
const AVAILABLE_PLAYERS = (import.meta as any).glob('/public/players/*.{webp,png,jpg,jpeg}', { eager: true });

const resolveExistingImage = (candidates: string | string[]): string => {
  if (!candidates) return "";
  const list = Array.isArray(candidates) ? candidates : [candidates];
  const existingKeys = Object.keys(AVAILABLE_PLAYERS);

  // 1. Exact path or exact filename match
  for (const raw of list) {
    if (!raw) continue;
    const directPath = `/public/players/${raw}`;
    if (AVAILABLE_PLAYERS[directPath]) return raw;

    const targetStem = raw.replace(/\.[^/.]+$/, "").toLowerCase().trim();
    for (const path of existingKeys) {
      const file = path.split('/').pop() || '';
      const fileStem = file.replace(/\.[^/.]+$/, "").toLowerCase().trim();
      if (fileStem === targetStem) {
        return file;
      }
    }
  }

  // 2. Substring matching for player last names (min 4 chars to prevent false positives)
  for (const raw of list) {
    if (!raw) continue;
    const targetStem = raw.replace(/\.[^/.]+$/, "").toLowerCase().trim();
    if (targetStem.length < 4) continue;
    for (const path of existingKeys) {
      const file = path.split('/').pop() || '';
      const fileStem = file.replace(/\.[^/.]+$/, "").toLowerCase().trim();
      if (fileStem.includes(targetStem) || targetStem.includes(fileStem)) {
        return file;
      }
    }
  }

  // Return empty string if no candidate exists in available files to prevent 404 network errors
  return "";
};

const getPlayerImageFilename = (card: Card): string => {
  const name = card.realName || card.name;
  
  if (name) {
    const normalized = (name + " " + (card.name || "")).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    let chosen: string | string[] = "";

    // Specific player priority checks to avoid collisions (e.g., rodrygo before rodri, hakimi before hakim, ederson vs eder militao)
    if (normalized.includes("rodrygo") || normalized.includes("rodry")) chosen = ["rodry.webp", "Rodrygo.webp"];
    else if (normalized.includes("rodri")) chosen = ["Rodri.webp"];

    else if (normalized.includes("hakimi")) chosen = ["Hakimi.webp"];
    else if (normalized.includes("ziyech") || normalized.includes("zyieh") || normalized.includes("hakim wizard")) chosen = ["Zyieh.webp", "ziyech.webp"];

    else if (normalized.includes("romero") || normalized.includes("cuti")) chosen = ["Romero.webp", "cuti.webp"];
    else if (normalized.includes("samuel eto") || normalized.includes("eto'o") || normalized.includes("etoo") || normalized.includes("sammy panther")) chosen = ["samuel eto.webp", "eto.webp", "etoo.webp"];
    else if (normalized.includes("sane") || normalized.includes("leroy")) chosen = ["Sane.webp", "sane.webp"];
    else if (normalized.includes("tomiyasu") || normalized.includes("tomi wall")) chosen = ["tomiyasu.webp"];
    else if (normalized.includes("alexander-arnold") || normalized.includes("trent")) chosen = ["trent.webp"];
    else if (normalized.includes("nistelrooy") || normalized.includes("nistelroy") || normalized.includes("ruud dread") || normalized.includes("gullit")) chosen = ["van nistelroy.webp", "vannistelrooy.webp"];
    else if (normalized.includes("vidic") || normalized.includes("vida terminator")) chosen = ["vidic.webp", "vidić.webp", "Vidic.webp"];
    else if (normalized.includes("bounou") || normalized.includes("bono")) chosen = ["Yassine Bounou.webp", "bono.webp", "bounou.webp"];

    // Legends requested by user
    else if (normalized.includes("cruyff") || normalized.includes("crujf") || normalized.includes("flying dutchman")) chosen = ["johan crujf.webp", "cruyff.webp"];
    else if (normalized.includes("yashin") || normalized.includes("jasin") || normalized.includes("black spider")) chosen = ["lev yashin.webp", "yashin.webp"];
    else if (normalized.includes("henry") || normalized.includes("titi express")) chosen = ["henry.webp"];
    else if (normalized.includes("matthaus") || normalized.includes("mateus") || normalized.includes("lothar")) chosen = ["mateus.webp", "matthaus.webp"];
    else if (normalized.includes("buffon") || normalized.includes("gigi wall")) chosen = ["buffon.webp"];
    else if (normalized.includes("iniesta") || normalized.includes("andres illusion")) chosen = ["iniesta.webp"];
    else if (normalized.includes("kahn") || normalized.includes("titan olli")) chosen = ["kahn.webp"];
    else if (normalized.includes("beckenbauer") || normalized.includes("kaiser franz") || normalized.includes("bekenbauer")) chosen = ["bekenbauer.webp", "beckenbauer.webp"];
    else if (normalized.includes("baggio") || normalized.includes("divine ponytail")) chosen = ["Baggio.webp", "baggio.webp"];
    else if (normalized.includes("del piero") || normalized.includes("pinturicchio") || normalized.includes("piero")) chosen = ["del piero.webp"];
    else if (normalized.includes("carlos") && (normalized.includes("roberto") || normalized.includes("bullet"))) chosen = ["carlos.webp"];
    else if (normalized.includes("drogba") || normalized.includes("didi king")) chosen = ["drogba.webp"];
    else if (normalized.includes("puyol") || normalized.includes("tarzan carles")) chosen = ["puyol.webp"];
    else if (normalized.includes("foden") || normalized.includes("philly sniper")) chosen = ["foden.webp"];
    else if (normalized.includes("araujo") || normalized.includes("roni tower")) chosen = ["Araujo.webp", "araujo.webp"];
    else if (normalized.includes("maignan") || normalized.includes("magan") || normalized.includes("magic mike")) chosen = ["Mike magnan.webp", "maignan.webp"];
    else if (normalized.includes("ederson") || normalized.includes("eder wall")) chosen = ["Ederson.webp", "ederson.webp"];
    else if (normalized.includes("militao")) chosen = ["militao.webp"];
    else if (normalized.includes("kim min-jae") || normalized.includes("kim min jae") || normalized.includes("monster kim") || normalized.includes("min-jae")) chosen = ["Kim min jae.webp", "kim.webp"];
    else if (normalized.includes("neuer") || normalized.includes("manu sweeper")) chosen = ["neuer.webp"];
    else if (normalized.includes("gakpo") || normalized.includes("cody strike")) chosen = ["Gakpo.webp", "gakpo.webp"];
    else if (normalized.includes("nico williams") || normalized.includes("nico wiliams") || normalized.includes("nico jet") || (normalized.includes("williams") && normalized.includes("nico"))) chosen = ["nico wiliams.webp", "williams.webp"];
    else if (normalized.includes("olmo") || normalized.includes("danny skill")) chosen = ["olmo.webp"];
    else if (normalized.includes("nunez") || normalized.includes("darwin chaos")) chosen = ["darwin nunez.webp", "nunez.webp"];
    else if (normalized.includes("maldini") || normalized.includes("paolo the wall") || normalized.includes("paolo wall")) chosen = ["maldini.webp"];

    // Other legends & active players
    else if (normalized.includes("nazario") || normalized.includes("r9 phenomenon")) chosen = ["r9.webp"];
    else if (normalized.includes("bergkamp") || normalized.includes("non-flying dutch")) chosen = ["bergkamp.webp"];
    else if (normalized.includes("kaka") || normalized.includes("ricky magic")) chosen = ["kaka.webp"];
    else if (normalized.includes("ochoa") || normalized.includes("memo wall-choa")) chosen = ["ochoa.webp"];
    else if (normalized.includes("riquelme")) chosen = ["riquelme.webp"];
    else if (normalized.includes("martinelli") || normalized.includes("gabi pace") || normalized.includes("gabriel jesus")) chosen = ["martinelli.webp", "gabriel jesus.webp"];
    else if (normalized.includes("tchouameni") || normalized.includes("tcoumeni") || normalized.includes("aurel shield")) chosen = ["tcoumeni.webp", "tchouameni.webp"];
    else if (normalized.includes("mac allister") || normalized.includes("mac playmaker") || normalized.includes("macallister")) chosen = ["mac alister.webp", "macallister.webp"];
    else if (normalized.includes("guimaraes") || normalized.includes("bruno g")) chosen = ["bruno g.webp", "guimaraes.webp"];
    else if (normalized.includes("stones") || normalized.includes("johnny rock")) chosen = ["john stones.webp", "stones.webp"];
    else if (normalized.includes("dembele") || normalized.includes("ousmane flash")) chosen = ["dembele.webp"];
    else if (normalized.includes("enzo") || normalized.includes("enzo engine")) chosen = ["enzo.webp"];
    else if (normalized.includes("havertz") || normalized.includes("kai glide")) chosen = ["kai havertz.webp", "havertz.webp"];
    else if (normalized.includes("diogo jota") || normalized.includes("jota goal") || normalized.includes("jota") || normalized.includes("diego jota")) chosen = ["diego jota.webp", "jota.webp"];
    else if (normalized.includes("palmer") || normalized.includes("cold cole")) chosen = ["palmer.webp"];
    else if (normalized.includes("lisandro") || normalized.includes("licha butcher")) chosen = ["lisandro martinez.webp", "lisandro.webp"];
    else if (normalized.includes("morata") || normalized.includes("alva strike")) chosen = ["alvaro morata.webp", "morata.webp"];
    else if (normalized.includes("kubo") || normalized.includes("takefusa ninja") || normalized.includes("takefusa")) chosen = ["takefusa.webp", "kubo.webp"];
    else if (normalized.includes("koulibaly") || normalized.includes("kouli-boulder")) chosen = ["Koulibaly.webp", "koulibaly.webp"];
    else if (normalized.includes("schick") || normalized.includes("patrik strike") || normalized.includes("patrik")) chosen = ["patrik.webp", "schick.webp"];
    else if (normalized.includes("dawsari") || normalized.includes("salem desert") || normalized.includes("salem")) chosen = ["Salem Al-Dawsari.webp", "dawsari.webp"];
    else if (normalized.includes("afif") || normalized.includes("akram magician") || normalized.includes("akram")) chosen = ["Akram Afif.webp", "afif.webp"];
    else if (normalized.includes("tamari") || normalized.includes("mousa falcon") || normalized.includes("mousa")) chosen = ["Mousa Al-Tamari.webp", "tamari.webp"];
    else if (normalized.includes("shomurodov") || normalized.includes("eldor wolf") || normalized.includes("eldor")) chosen = ["Eldor Shomurodov.webp", "shomurodov.webp"];
    else if (normalized.includes("aymen hussein") || normalized.includes("aymen header") || normalized.includes("aymen")) chosen = ["Aymen Hussein.webp", "hussein.webp"];
    else if (normalized.includes("carrasquilla") || normalized.includes("coco dribble") || normalized.includes("adalberto")) chosen = ["Adalberto Carrasquilla.webp", "carrasquilla.webp"];
    else if (normalized.includes("pierrot") || normalized.includes("frantz tower") || normalized.includes("frantzdy")) chosen = ["Frantzdy Pierrot.webp", "pierrot.webp"];
    else if (normalized.includes("eloy room") || normalized.includes("eloy gloves") || normalized.includes("room")) chosen = ["Eloy Room .webp", "room.webp"];
    else if (normalized.includes("bailey") || normalized.includes("leon blaze") || normalized.includes("leon")) chosen = ["leon.webp", "bailey.webp"];
    else if (normalized.includes("chris wood") || normalized.includes("woodman chopper") || normalized.includes("wood")) chosen = ["chris wood.webp", "wood.webp"];

    // Alvarez disambiguation
    else if (normalized.includes("edson") && normalized.includes("alvarez")) chosen = ["Edson Alvarez.webp", "edson alvarez.png"];
    else if (normalized.includes("julian") && normalized.includes("alvarez")) chosen = ["Alvarez.webp", "alvarez.png", "julian alvarez.png"];
    else if (normalized.includes("alvarez")) chosen = ["Alvarez.webp", "alvarez.png"];

    // Global stars
    else if (normalized.includes("messi")) chosen = ["Messi.webp", "messi.png"];
    else if (normalized.includes("mbappe") || normalized.includes("donatello")) chosen = ["Mbape.webp", "mbappe.png", "mbape.png"];
    else if (normalized.includes("ronaldo") && !normalized.includes("nazario")) chosen = ["Ronaldo.webp", "ronaldo.png", "cr7.png"];
    else if (normalized.includes("kane")) chosen = ["Kane.webp", "kane.png"];
    else if (normalized.includes("vinicius") || normalized.includes("vini dazzle")) chosen = ["Vinicius.webp", "vinicius.png"];
    else if (normalized.includes("bellingham")) chosen = ["Jude.webp", "jude.png", "bellingham.png"];
    else if (normalized.includes("bruyne")) chosen = ["DeBruyne.webp", "debruyne.png"];
    else if (normalized.includes("davies")) chosen = ["Davis.webp", "davies.png", "davis.png"];
    else if (normalized.includes("pulisic")) chosen = ["Pulisic.webp", "pulisic.png"];
    else if (normalized.includes("modric")) chosen = ["modric.webp", "modric.png"];
    else if (normalized.includes("van dijk")) chosen = ["van djk.webp", "van dijk.png", "vandijk.png"];
    else if (normalized.includes("gavi")) chosen = ["Gavi.webp", "gavi.png"];
    else if (normalized.includes("pedri")) chosen = ["Pedri.webp", "pedri.png"];
    else if (normalized.includes("valverde")) chosen = ["valverde.webp", "valverde.png"];
    else if (normalized.includes("musiala")) chosen = ["Musaila.webp", "musiala.png", "musaila.png"];
    else if (normalized.includes("kroos")) chosen = ["toni Kros.webp", "kroos.png", "toni kroos.png"];
    else if (normalized.includes("son heung-min") || normalized.includes("heung-min")) chosen = ["Son.webp", "son.png"];
    else if (normalized.includes("mitoma")) chosen = ["Mitoma.webp", "mitoma.png"];
    else if (normalized.includes("mane")) chosen = ["Sadio Mane.webp", "mane.png"];
    else if (normalized.includes("martinez") && normalized.includes("emiliano")) chosen = ["Emiliano Martinez.webp", "martinez.png"];
    else if (normalized.includes("griezmann")) chosen = ["Griezman.webp", "griezmann.png", "griezman.png"];
    else if (normalized.includes("mckennie")) chosen = ["MCkenney.webp", "mckennie.png"];
    else if (normalized.includes("ederson")) chosen = ["Ederson.webp", "ederson.png"];
    else if (normalized.includes("pele")) chosen = ["Pele.webp", "pele.png"];
    else if (normalized.includes("maradona")) chosen = ["Maradona.webp", "maradona.png"];
    else if (normalized.includes("zidane")) chosen = ["Zidane.webp", "zidane.png"];
    else if (normalized.includes("ronaldinho")) chosen = ["ronaldinho.webp", "ronaldinho.png"];
    else if (normalized.includes("beckham")) chosen = ["Beckham.webp", "beckham.png"];
    else if (normalized.includes("saka")) chosen = ["Saka.webp", "saka.png"];
    else if (normalized.includes("yamal") || normalized.includes("lamine")) chosen = ["Lamine.webp", "yamal.png", "lamine.png"];
    else if (normalized.includes("wirtz")) chosen = ["Wirtz.webp", "wirtz.png"];
    else if (normalized.includes("fernandes")) chosen = ["Bruno.webp", "bruno.png", "fernandes.png"];
    else if (normalized.includes("simons")) chosen = ["Simons.webp", "simons.png"];
    else if (normalized.includes("gvardiol")) chosen = ["Gvardiol.webp", "gvardiol.png"];
    else if (normalized.includes("alisson")) chosen = ["Alison.webp", "alisson.png"];
    else if (normalized.includes("diaz") && normalized.includes("luis")) chosen = ["Luis Diaz.webp", "luis diaz.png"];
    else if (normalized.includes("gimenez")) chosen = ["Gimenez.webp", "gimenez.png"];
    else if (normalized.includes("david") && normalized.includes("jonathan")) chosen = ["Jonathan David.webp", "david.png"];
    else if (normalized.includes("haaland") || normalized.includes("cyberborg")) chosen = ["Halland.webp", "haaland.png"];
    else if (normalized.includes("xhaka")) chosen = ["Xhaka.webp", "xhaka.png"];
    else if (normalized.includes("sabitzer")) chosen = ["sabitzer.webp", "sabitzer.png"];
    else if (normalized.includes("robertson")) chosen = ["Robertson.webp", "robertson.png"];
    else if (normalized.includes("isak")) chosen = ["Isak.webp", "isak.png"];
    else if (normalized.includes("dzeko")) chosen = ["Dzeko.webp", "dzeko.png"];
    else if (normalized.includes("lewandowski")) chosen = ["levandowski.webp", "lewandowski.png"];
    else if (normalized.includes("caicedo")) chosen = ["Caciedo.webp", "caicedo.png"];
    else if (normalized.includes("almiron")) chosen = ["Almiron.webp", "almiron.png"];
    else if (normalized.includes("salah")) chosen = ["Salah.webp", "salah.png"];
    else if (normalized.includes("kessie")) chosen = ["kessie.webp", "kessie.png"];
    else if (normalized.includes("kudus")) chosen = ["kudus.webp", "kudus.png"];
    else if (normalized.includes("mahrez")) chosen = ["Mahrez.webp", "mahrez.png"];
    else if (normalized.includes("ryan") && normalized.includes("maty")) chosen = ["matty ryan.webp", "ryan.png"];
    else if (normalized.includes("mendes") && normalized.includes("ryan")) chosen = ["Ryan Mendes.webp", "mendes.png"];
    else if (normalized.includes("saliba")) chosen = ["Saliba.webp", "saliba.png"];
    else if (normalized.includes("suarez")) chosen = ["Suarez legend.webp", "suarez.png"];
    else if (normalized.includes("taremi")) chosen = ["Taremi.webp", "taremi.png"];

    if (chosen) {
      return resolveExistingImage(chosen);
    }
  }

  return "";
};


interface CardViewProps {
  card?: Card;
  onClick?: () => void;
  isFaceDown?: boolean;
  isSelected?: boolean;
  canDoubleUp?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const SoccerJersey: React.FC<{ card: Card; size: 'sm' | 'md' | 'lg' }> = ({ card, size }) => {
  let primaryColor = '#475569'; 
  let secondaryColor = '#cbd5e1'; 
  let stripeColor = '#94a3b8'; 

  if (card.rarity === 'LEGEND' || card.rarity === 'LEGEND_RETRO') {
    primaryColor = '#b45309'; 
    secondaryColor = '#fef3c7'; 
    stripeColor = '#f59e0b'; 
  } else if (card.rarity === 'SHINEY') {
    primaryColor = '#0284c7'; 
    secondaryColor = '#e0f2fe'; 
    stripeColor = '#38bdf8'; 
  } else {
    if (card.position === 'ATT') {
      primaryColor = '#dc2626'; 
      secondaryColor = '#fee2e2'; 
      stripeColor = '#ef4444'; 
    } else if (card.position === 'MID') {
      primaryColor = '#059669'; 
      secondaryColor = '#d1fae5'; 
      stripeColor = '#10b981'; 
    } else {
      primaryColor = '#2563eb'; 
      secondaryColor = '#dbeafe'; 
      stripeColor = '#3b82f6'; 
    }
  }

  const svgSizeClass = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14 sm:w-16 sm:h-16',
    lg: 'w-18 h-18 sm:w-22 sm:h-22',
  }[size];

  return (
    <svg
      viewBox="0 0 100 100"
      className={`${svgSizeClass} filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110 z-10`}
    >
      <path
        d="M 25 25 L 35 15 L 42 18 L 45 15 L 55 15 L 58 18 L 65 15 L 75 25 L 72 38 L 66 35 L 66 85 L 34 85 L 34 35 L 28 38 Z"
        fill={primaryColor}
        stroke="#000"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M 42 18 L 50 28 L 58 18"
        fill="none"
        stroke={secondaryColor}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 25 25 L 28 38 M 75 25 L 72 38"
        stroke={secondaryColor}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line x1="42" y1="30" x2="42" y2="83" stroke={stripeColor} strokeWidth="3" />
      <line x1="50" y1="32" x2="50" y2="83" stroke={secondaryColor} strokeWidth="4" />
      <line x1="58" y1="30" x2="58" y2="83" stroke={stripeColor} strokeWidth="3" />
      <path
        d="M 39 33 L 43 31 L 43 37 Q 39 39 39 33"
        fill={secondaryColor}
        stroke="#000"
        strokeWidth="1"
      />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fill={secondaryColor}
        fontSize="20"
        fontWeight="900"
        fontFamily="monospace"
        stroke="#000"
        strokeWidth="1"
      >
        {card.rating >= 95 ? "10" : card.position === "ATT" ? "9" : card.position === "MID" ? "8" : "4"}
      </text>
    </svg>
  );
};

export const CardView: React.FC<CardViewProps> = ({
  card,
  onClick,
  isFaceDown = false,
  isSelected = false,
  canDoubleUp = false,
  size = 'md',
  disabled = false,
}) => {
  const [imageError, setImageError] = useState(false);

  React.useEffect(() => {
    setImageError(false);
  }, [card?.id]);

  const sizeClasses = {
    sm: 'w-18 h-28 sm:w-22 sm:h-34 text-xs rounded-xl',
    md: 'w-24 h-38 sm:w-28 sm:h-44 md:w-32 md:h-50 text-sm rounded-2xl',
    lg: 'w-32 h-50 sm:w-36 sm:h-56 md:w-40 md:h-64 text-base rounded-2xl sm:rounded-3xl',
  }[size];

  if (isFaceDown || !card) {
    return (
      <div
        className={`${sizeClasses} bg-gradient-to-br from-[#1a2f23] via-[#0b1610] to-[#040806] border-2 sm:border-3 border-amber-400/90 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center relative overflow-hidden select-none transition-all duration-150 ${
          onClick && !disabled ? 'cursor-pointer hover:-translate-y-1 hover:shadow-[3px_5px_0px_0px_rgba(0,0,0,1)]' : ''
        }`}
        onClick={!disabled ? onClick : undefined}
      >
        {/* Fine gold mesh / diagonal soccer net pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:10px_10px]" />
        
        {/* Inner gold frame */}
        <div className="absolute inset-1 border border-amber-500/30 rounded-lg flex flex-col items-center justify-center bg-black/40 p-1 text-center">
          {/* Centered Golden Emblem */}
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-gradient-to-b from-amber-300 to-yellow-500 border-2 border-black flex items-center justify-center shadow-md transform -rotate-6 hover:rotate-0 transition-transform duration-300">
            <span className="text-lg sm:text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">🏆</span>
          </div>
          
          <div className="mt-1 sm:mt-2 bg-black px-1.5 py-0.5 rounded border border-amber-500/30 flex items-center justify-center">
            <span className="text-[6px] sm:text-[8px] font-sports text-yellow-300 font-black tracking-widest uppercase">
              SQUAD SWAP
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 2D Flash Style Frame Colors
  const getFrameStyle = () => {
    switch (card.rarity) {
      case 'COMMON':
        return 'border-2 sm:border-3 border-slate-600 bg-slate-100 text-slate-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]';
      case 'SHINEY':
        return 'border-2 sm:border-3 border-blue-500 bg-gradient-to-b from-sky-200 via-white to-blue-200 text-sky-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]';
      case 'LEGEND':
        return 'border-2 sm:border-3 border-amber-500 bg-gradient-to-b from-amber-300 via-yellow-100 to-amber-200 text-amber-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]';
      case 'LEGEND_RETRO':
        return 'border-2 sm:border-3 border-amber-800 bg-gradient-to-b from-[#e6d0a7] to-[#bfa179] text-amber-950 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]';
      default:
        return 'border-2 sm:border-3 border-black bg-white text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]';
    }
  };

  const getHeaderStyle = () => {
    switch (card.rarity) {
      case 'COMMON':
        return 'bg-slate-800 text-white border-b-2 border-slate-700';
      case 'SHINEY':
        return 'bg-gradient-to-r from-blue-600 to-sky-500 text-white border-b-2 border-blue-900';
      case 'LEGEND':
        return 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-black border-b-2 border-amber-800';
      case 'LEGEND_RETRO':
        return 'bg-[#917557] text-[#fffdf2] border-b-2 border-[#5c442d]';
      default:
        return 'bg-black text-white border-b-2 border-black';
    }
  };

  const getRatingStyle = () => {
    switch (card.rarity) {
      case 'COMMON':
        return 'text-white';
      case 'SHINEY':
        return 'text-cyan-200 font-extrabold';
      case 'LEGEND':
        return 'text-amber-950 font-black';
      case 'LEGEND_RETRO':
        return 'text-[#eedcb3] font-black';
      default:
        return 'text-yellow-400';
    }
  };

  const getFooterStyle = () => {
    switch (card.rarity) {
      case 'COMMON':
        return 'bg-slate-50 border-t border-slate-200';
      case 'SHINEY':
        return 'bg-sky-50 border-t border-sky-200';
      case 'LEGEND':
        return 'bg-amber-50 border-t border-amber-200';
      case 'LEGEND_RETRO':
        return 'bg-[#ebdcb9] border-t border-[#c5b597]';
      default:
        return 'bg-white';
    }
  };

  const getPosBadgeColor = () => {
    switch (card.position) {
      case 'ATT':
        return 'bg-red-600 text-white border-black';
      case 'MID':
        return 'bg-emerald-600 text-white border-black';
      case 'DEF':
        return 'bg-blue-600 text-white border-black';
    }
  };

  const getRarityText = () => {
    switch (card.rarity) {
      case 'LEGEND':
        return <span className="text-[8px] sm:text-[9px] font-black text-amber-700 tracking-tighter">👑 LEGEND</span>;
      case 'LEGEND_RETRO':
        return <span className="text-[8px] sm:text-[9px] font-black text-amber-800 tracking-tighter">🏆 RETRO</span>;
      case 'SHINEY':
        return <span className="text-[8px] sm:text-[9px] font-black text-blue-600 tracking-tighter">✨ RARE</span>;
      default:
        return null;
    }
  };

  const caricature = getPlayerCaricature(card.id, card.position);
  const flag = getCountryFlag(card.nationality);
  const detectedFilename = getPlayerImageFilename(card);
  let finalImageSrc = '';
  if (detectedFilename) {
    finalImageSrc = `/players/${encodeURI(detectedFilename)}`;
  } else if (card.image) {
    let clean = card.image;
    if (clean.includes('players-list')) {
      clean = clean.replace('players-list', 'players');
    }
    if (!clean.startsWith('/')) {
      clean = `/${clean}`;
    }
    finalImageSrc = encodeURI(clean);
  }
  
  // Noticeably larger image sizes for better look & feel
  const imgSizeClass = {
    sm: 'h-18 sm:h-22',
    md: 'h-28 sm:h-34 md:h-38',
    lg: 'h-38 sm:h-44 md:h-50',
  }[size];

  return (
    <div
      title={card.name}
      className={`${sizeClasses} ${getFrameStyle()} flex flex-col relative overflow-hidden select-none transition-all duration-150 ${
        onClick && !disabled ? 'cursor-pointer hover:-translate-y-2 hover:scale-105 hover:shadow-[4px_7px_0px_0px_rgba(0,0,0,1)] z-10' : ''
      } ${isSelected ? 'ring-4 ring-sky-400 -translate-y-3 scale-110 z-20 shadow-[5px_9px_0px_0px_rgba(0,0,0,1)]' : ''} ${
        canDoubleUp ? 'ring-4 ring-red-600 animate-bounce z-20 shadow-[0_0_20px_rgba(239,68,68,1)]' : ''
      }`}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Top Header Bar: Rating & Position */}
      <div className={`flex items-center justify-between px-1.5 py-1 z-10 ${getHeaderStyle()}`}>
        <span className={`text-xs sm:text-base font-black font-sports tracking-tighter leading-none ${getRatingStyle()}`}>
          {card.rating}
        </span>
        <span className={`text-[8px] sm:text-[9px] font-black px-1 py-0.5 rounded border ${getPosBadgeColor()} leading-none`}>
          {card.position}
        </span>
      </div>

      {/* Caricature / Puppet Soccer Big Head Stage */}
      <div className={`flex-1 w-full bg-gradient-to-t ${card.avatarBg || 'from-emerald-400 to-sky-300'} flex items-center justify-center relative overflow-hidden border-b-2 border-black`}>
        {/* Country Flag Background behind halftone dots */}
        <img
          src={flag}
          alt={card.nationality}
          className="absolute inset-0 w-full h-full object-cover opacity-85"
          referrerPolicy="no-referrer"
          draggable="false"
        />

        {/* Half-tone texture background */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#000_1.5px,transparent_1.5px)] [background-size:6px_6px]" />
        
        {/* Rarity Specific Sweeps & Particles overlays (squad swap flash game feel) */}
        {card.rarity === 'LEGEND' && (
          <>
            <div className="sweep-shimmer" />
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              <span className="absolute text-[9px] text-yellow-400 sparkle-slow top-3 left-2">✨</span>
              <span className="absolute text-[8px] text-yellow-300 sparkle-fast top-8 right-2">⭐</span>
              <span className="absolute text-[7px] text-amber-300 sparkle-slow bottom-5 left-3">✨</span>
              <span className="absolute text-[8px] text-yellow-200 sparkle-fast bottom-9 right-3">⭐</span>
              <span className="absolute text-[7px] text-yellow-400 sparkle-slow top-1/2 left-2">✨</span>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-yellow-400 opacity-60 bottom-1 left-4 particle-float" />
              <div className="absolute w-1 h-1 rounded-full bg-amber-400 opacity-70 bottom-3 right-5 particle-float-delay-1" />
              <div className="absolute w-2 h-2 rounded-full bg-yellow-300 opacity-50 bottom-1 left-1/2 particle-float-delay-2" />
              <div className="absolute w-1 h-1 rounded-full bg-amber-300 opacity-80 bottom-2 left-2 particle-float-delay-3" />
            </div>
          </>
        )}

        {card.rarity === 'SHINEY' && (
          <>
            <div className="sweep-shimmer-blue" />
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              <span className="absolute text-[9px] text-sky-400 sparkle-slow top-5 left-3">💎</span>
              <span className="absolute text-[7px] text-cyan-300 sparkle-fast top-2 right-3">✦</span>
              <span className="absolute text-[6px] text-blue-300 sparkle-slow bottom-4 left-3">✦</span>
              <span className="absolute text-[8px] text-cyan-200 sparkle-fast bottom-7 right-3">💎</span>
              <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60 bottom-1 left-3 particle-float" />
              <div className="absolute w-1 h-1 rounded-full bg-blue-400 opacity-70 bottom-3 right-4 particle-float-delay-1" />
              <div className="absolute w-2 h-2 rounded-full bg-sky-300 opacity-55 bottom-1 left-1/3 particle-float-delay-2" />
            </div>
          </>
        )}

        {card.rarity === 'LEGEND_RETRO' && (
          <>
            <div className="sweep-shimmer-retro" />
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden retro-scanlines">
              <span className="absolute text-[6px] text-amber-800 opacity-60 top-2 left-6 font-mono">•</span>
              <span className="absolute text-[7px] text-amber-700 opacity-50 top-10 right-4 font-mono">+</span>
              <span className="absolute text-[5px] text-amber-900 opacity-40 bottom-6 left-2 font-mono">x</span>
              <span className="absolute text-[6px] text-orange-800 opacity-50 bottom-2 right-4 font-mono">•</span>
              <div className="absolute w-1 h-1 rounded-full bg-amber-600 opacity-40 bottom-1 left-3 particle-float" />
              <div className="absolute w-1.5 h-1.5 rounded-full bg-[#b45309] opacity-30 bottom-4 right-5 particle-float-delay-1" />
            </div>
          </>
        )}

        {finalImageSrc && !imageError ? (
          <img
            key={card.id}
            src={`${finalImageSrc}?v=1.2`}
            alt={card.name}
            className={`${imgSizeClass} w-auto object-contain filter drop-shadow-[0_6px_8px_rgba(0,0,0,0.65)] z-10 transition-transform duration-300 group-hover:scale-110`}
            referrerPolicy="no-referrer"
            draggable="false"
            onError={() => {
              console.error("Failed to load image:", finalImageSrc);
              setImageError(true);
            }}
            onLoad={() => setImageError(false)}
          />
        ) : (
          <SoccerJersey card={card} size={size} />
        )}

        {/* Double up badge */}
        {canDoubleUp && (
          <div className="absolute top-1 right-1 bg-red-600 border border-black text-white text-[7px] sm:text-[8px] font-black px-1 py-0.5 rounded animate-pulse shadow z-20">
            DOUBLE!
          </div>
        )}
      </div>

      {/* Bottom Bar: Player Parody Name */}
      <div className={`p-1 sm:px-1.5 sm:py-0.5 flex flex-col items-center justify-center text-center z-10 min-h-[28px] sm:min-h-[34px] ${getFooterStyle()}`}>
        <span className="font-black text-[8px] sm:text-[9px] md:text-[10px] text-black uppercase tracking-tighter break-words w-full leading-[1.1] font-sports max-w-full">
          {card.name}
        </span>
        {getRarityText() && (
          <div className="leading-none mt-0.5">
            {getRarityText()}
          </div>
        )}
      </div>
    </div>
  );
};
