export type Position = 'ATT' | 'MID' | 'DEF';
export type Rarity = 'COMMON' | 'SHINEY' | 'LEGEND' | 'LEGEND_RETRO';

export interface Card {
  id: string;
  name: string; // Parody name e.g., "Kylan Donatello"
  realName?: string;
  rating: number; // 1-100
  nationality: string; // ISO 3-letter code e.g. "BRA"
  position: Position;
  rarity: Rarity;
  quote?: string;
  avatarBg?: string; // Tailwind gradient or solid color
  image?: string; // Player image URL from public/players-list/ e.g. "/players-list/Messi.webp"
}

export interface Coach {
  id: string;
  realName: string;
  name: string; // Parody name
  difficulty: string;
  level: number; // 1 to 5
  tacticDescription: string;
  avatarBg: string;
  emoji: string;
  image?: string;
  quotes: {
    start: string;
    winRound: string;
    loseRound: string;
    doubleUp: string;
    shootout: string;
    matchWin: string;
    matchLose: string;
  };
}

export type DuelWinner = 'PLAYER' | 'OPPONENT' | 'SHOOTOUT';

export interface RoundEvaluation {
  winner: DuelWinner;
  isDoubleUp: boolean;
  reason: string;
}

export interface ShootoutResult {
  playerOriginal: Card;
  opponentOriginal: Card;
  playerDrawn: Card[];
  opponentDrawn: Card[];
  playerScore: number;
  opponentScore: number;
  winner: 'PLAYER' | 'OPPONENT';
}

export interface TurnLog {
  turn: number;
  minute: number;
  playerCard: Card;
  opponentCard: Card;
  winner: 'PLAYER' | 'OPPONENT';
  cardsWonCount: number;
  isDoubleUp: boolean;
  isShootout: boolean;
  summaryText: string;
}

export type GamePhase = 
  | 'MAIN_MENU'
  | 'COACH_SELECT' 
  | 'DRAW'
  | 'DUEL_PICK' 
  | 'DUEL_REVEAL' 
  | 'SHOOTOUT_ANIMATING' 
  | 'TURN_RESULT' 
  | 'MATCH_OVER'
  | 'AWARDS_GALLERY'
  | 'TOURNAMENT_BRACKET'
  | 'GROUP_STANDINGS'
  | 'WC_NATION_SELECT';

export type MatchMode = 'TOURNAMENT' | 'QUICK_MATCH' | 'WORLD_CUP';

export interface GameStats {
  totalWins: number;
  currentStreak: number;
  maxStreak: number;
  tournamentWins: number;
  worldCupWins: number;
}

