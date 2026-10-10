import React, { useState, useEffect, useCallback } from 'react';
import { Card, Coach, GamePhase, MatchMode, RoundEvaluation, GameStats } from './types';
import { ALL_CARDS } from './data/cards';
import { OFFICIAL_COACHES } from './data/coaches';
import { SquadSwapEngine } from './utils/engine';
import { soundFx } from './utils/sound';
import { Navbar } from './components/Navbar';
import { PitchBoard } from './components/PitchBoard';
import { CoachSelectModal } from './components/CoachSelectModal';
import { RulesModal } from './components/RulesModal';
import { ShootoutModal } from './components/ShootoutModal';
import { GameOverModal } from './components/GameOverModal';
import { MainMenu } from './components/MainMenu';
import { AwardsGalleryModal } from './components/AwardsGalleryModal';
import { TrophiesModal } from './components/TrophiesModal';
import { TournamentBracket } from './components/TournamentBracket';
import { GroupStandings } from './components/GroupStandings';
import { WCNationSelect, Nation, AVAILABLE_NATIONS } from './components/WCNationSelect';
import { MobileOrientationPrompt } from './components/MobileOrientationPrompt';

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  // Config & Audio with Local Storage Cache
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('soundEnabled');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });
  const [matchMode, setMatchMode] = useState<MatchMode>('TOURNAMENT');
  const [showRules, setShowRules] = useState<boolean>(false);
  
  const [gameStats, setGameStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem('squadSwapStats');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return {
      totalWins: 0,
      currentStreak: 0,
      maxStreak: 0,
      tournamentWins: 0,
      worldCupWins: 0,
    };
  });
  const [isTrophiesOpen, setIsTrophiesOpen] = useState<boolean>(false);
  const [hasRecordedMatchStats, setHasRecordedMatchStats] = useState<boolean>(false);
  const [forceCssLandscape, setForceCssLandscape] = useState<boolean>(false);

  // Preload and cache flag images in browser memory for instant rendering
  useEffect(() => {
    const flagUrls = [
      'https://flagcdn.com/ar.svg', 'https://flagcdn.com/fr.svg', 'https://flagcdn.com/pt.svg',
      'https://flagcdn.com/gb-eng.svg', 'https://flagcdn.com/no.svg', 'https://flagcdn.com/eg.svg',
      'https://flagcdn.com/be.svg', 'https://flagcdn.com/br.svg', 'https://flagcdn.com/pl.svg',
      'https://flagcdn.com/es.svg', 'https://flagcdn.com/de.svg', 'https://flagcdn.com/nl.svg',
      'https://flagcdn.com/it.svg', 'https://flagcdn.com/hr.svg', 'https://flagcdn.com/rs.svg'
    ];
    flagUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
    
    // Initialize sound volume
    soundFx.setEnabled(soundEnabled);

    // Disable right click across the entire game
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Match Core State
  const [gamePhase, setGamePhase] = useState<GamePhase>('MAIN_MENU');
  const [coach, setCoach] = useState<Coach>(OFFICIAL_COACHES[0]);
  const [turn, setTurn] = useState<number>(1);
  
  // Card Pools
  const [drawDeck, setDrawDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [opponentHand, setOpponentHand] = useState<Card[]>([]);
  const [playerWonDeck, setPlayerWonDeck] = useState<Card[]>([]);
  const [opponentWonDeck, setOpponentWonDeck] = useState<Card[]>([]);

  // Active Turn Board State
  const [playedPlayerCard, setPlayedPlayerCard] = useState<Card | null>(null);
  const [playedOpponentCard, setPlayedOpponentCard] = useState<Card | null>(null);
  const [playedPlayerAssistCard, setPlayedPlayerAssistCard] = useState<Card | null>(null);
  const [playedOpponentAssistCard, setPlayedOpponentAssistCard] = useState<Card | null>(null);
  const [playedOpponentCardIndex, setPlayedOpponentCardIndex] = useState<number | null>(null);
  const [canPlayerAssist, setCanPlayerAssist] = useState<boolean>(false);
  const [turnResult, setTurnResult] = useState<RoundEvaluation | null>(null);
  const [isWaitingForCoach, setIsWaitingForCoach] = useState<boolean>(false);
  const [hasStartedDealing, setHasStartedDealing] = useState<boolean>(false);
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [drawnCountP, setDrawnCountP] = useState<number>(0);
  const [drawnCountO, setDrawnCountO] = useState<number>(0);

  // Tournament / World Cup Stages
  const [tournamentStage, setTournamentStage] = useState<'QUARTER_FINAL' | 'SEMI_FINAL' | 'FINAL' | 'CHAMPION' | 'ELIMINATED' | null>(null);
  const [worldCupStage, setWorldCupStage] = useState<'GROUP_1' | 'GROUP_2' | 'GROUP_3' | 'SEMI_FINAL' | 'FINAL' | 'CHAMPION' | 'ELIMINATED' | null>(null);
  const [groupStandings, setGroupStandings] = useState<Array<{ id: string; name: string; emoji: string; p: number; w: number; d: number; l: number; pts: number }>>([
    { id: 'player', name: 'YOUR TEAM', emoji: '⭐️', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { id: 'lasso', name: 'Coach Happy', emoji: '🥸', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { id: 'mourinho', name: 'Special Bus', emoji: '🤫', p: 0, w: 0, d: 0, l: 0, pts: 0 },
    { id: 'klopp', name: 'Smile Kloppo', emoji: '😁', p: 0, w: 0, d: 0, l: 0, pts: 0 },
  ]);

  // Shootout Temporary State
  const [shootoutData, setShootoutData] = useState<{
    playerOriginal: Card;
    opponentOriginal: Card;
    playerDrawn: Card[];
    opponentDrawn: Card[];
    reason: string;
  } | null>(null);

  const minute = Math.min(90, Math.floor(turn * 5));
  // Turn 1, 3, 5... Player picks first. Turn 2, 4, 6... Coach picks first.
  const isPlayerTurnToPickFirst = turn % 2 !== 0;

  // Disable right click across the entire game
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const handleToggleSound = () => {
    const newValue = !soundEnabled;
    soundFx.setEnabled(newValue);
    setSoundEnabled(newValue);
    try {
      localStorage.setItem('soundEnabled', JSON.stringify(newValue));
    } catch (e) {
      console.warn(e);
    }
  };

  // Start or Restart Match
  const startMatch = useCallback((selectedCoach: Coach) => {
    setCoach(selectedCoach);
    const shuffled = shuffleArray(ALL_CARDS);

    setPlayerHand([]);
    setOpponentHand([]);
    setDrawDeck(shuffled);
    setPlayerWonDeck([]);
    setOpponentWonDeck([]);
    setTurn(1);
    setPlayedPlayerCard(null);
    setPlayedOpponentCard(null);
    setPlayedPlayerAssistCard(null);
    setPlayedOpponentAssistCard(null);
    setPlayedOpponentCardIndex(null);
    setCanPlayerAssist(false);
    setTurnResult(null);
    setShootoutData(null);
    setGamePhase('DRAW');
    setHasStartedDealing(false);
    setHasRecordedMatchStats(false);
    soundFx.playWhistle();
  }, []);

  // AI Coach Card Choice Logic
  const executeCoachTurn = useCallback((currentOppHand: Card[], pCard: Card | null) => {
    if (currentOppHand.length === 0) return null;

    // Responding second to Player's card
    if (pCard !== null) {
      // 1. Check if Coach can trigger Double Up
      const sameNationCards = currentOppHand.filter(c => c.nationality === pCard.nationality);
      if (sameNationCards.length >= 2) {
        // Play one of them to trigger Double Up!
        soundFx.playDoubleUpAlarm();
        return sameNationCards[0];
      }

      // 2. Try to find the lowest card that beats Player's rating
      const beatingCards = currentOppHand
        .filter(c => c.rating > pCard.rating)
        .sort((a, b) => a.rating - b.rating);

      if (beatingCards.length > 0) {
        return beatingCards[0];
      }

      // 3. Otherwise sacrifice the lowest card in hand
      const sortedByLow = [...currentOppHand].sort((a, b) => a.rating - b.rating);
      return sortedByLow[0];
    }

    // Coach picking first
    // Level logic
    const sortedDesc = [...currentOppHand].sort((a, b) => b.rating - a.rating);
    const sortedAsc = [...currentOppHand].sort((a, b) => a.rating - b.rating);

    switch (coach.level) {
      case 1: // Ted Lasso (random)
        return currentOppHand[Math.floor(Math.random() * currentOppHand.length)];
      case 2: // Mourinho (prefer DEF or lowest)
        const defs = currentOppHand.filter(c => c.position === 'DEF');
        return defs.length > 0 ? defs[0] : sortedAsc[0];
      case 3: // Klopp (Gegenpress highest!)
        return sortedDesc[0];
      case 4: // Ancelotti (synergy BRA / ESP)
        const syns = currentOppHand.filter(c => c.nationality === 'BRA' || c.nationality === 'ESP');
        return syns.length > 0 ? syns[0] : sortedDesc[Math.floor(sortedDesc.length / 2)];
      case 5: // Guardiola (Save best for end)
        return turn > 12 ? sortedDesc[0] : sortedAsc[Math.min(1, sortedAsc.length - 1)];
      default:
        return currentOppHand[0];
    }
  }, [coach.level, turn]);

  // Evaluate duel when both cards are placed
  const evaluateDuel = useCallback((pCard: Card, oCard: Card, currentPHand: Card[], currentOHand: Card[]) => {
    // Check if player responding second has Double Up partner in hand
    const pHasPartner = SquadSwapEngine.hasDoubleUpPartner(currentPHand, pCard.id, pCard.nationality);
    const oHasPartner = SquadSwapEngine.hasDoubleUpPartner(currentOHand, oCard.id, oCard.nationality);

    const evaluation = SquadSwapEngine.evaluateRound(
      pCard,
      oCard,
      pHasPartner,
      oHasPartner,
      !isPlayerTurnToPickFirst // isPlayerSecond
    );

    if (evaluation.isDoubleUp) {
      soundFx.playDoubleUpAlarm();
    }

    if (evaluation.winner === 'SHOOTOUT') {
      const excludeList = [
        pCard,
        oCard,
        ...currentPHand,
        ...currentOHand,
        ...playerWonDeck,
        ...opponentWonDeck
      ];
      const excludeIds = new Set(excludeList.filter(Boolean).map(c => c.id));
      
      const pDrawn: Card[] = [];
      const oDrawn: Card[] = [];
      const newDraw: Card[] = [];

      for (const card of drawDeck) {
        if (!excludeIds.has(card.id)) {
          if (pDrawn.length < 3) {
            pDrawn.push(card);
            excludeIds.add(card.id);
          } else if (oDrawn.length < 3) {
            oDrawn.push(card);
            excludeIds.add(card.id);
          } else {
            newDraw.push(card);
          }
        } else {
          newDraw.push(card);
        }
      }
      setDrawDeck(newDraw);

      setShootoutData({
        playerOriginal: pCard,
        opponentOriginal: oCard,
        playerDrawn: pDrawn,
        opponentDrawn: oDrawn,
        reason: evaluation.reason,
      });
      setGamePhase('SHOOTOUT_ANIMATING');
      return;
    }

    // Opponent (Coach) Assist detection!
    const oHasSameNationInHand = currentOHand.some(c => c.nationality === oCard.nationality && c.id !== oCard.id);
    if (evaluation.winner === 'PLAYER' && oHasSameNationInHand) {
      const assistCards = currentOHand.filter(c => c.nationality === oCard.nationality && c.id !== oCard.id)
        .sort((a, b) => b.rating - a.rating);
      
      const assistCard = assistCards[0];
      
      setIsWaitingForCoach(true);
      setTimeout(() => {
        soundFx.playCardSwoosh();
        setPlayedOpponentAssistCard(assistCard);
        setOpponentHand(prev => prev.filter(c => c.id !== assistCard.id));
        setTurnResult({
          winner: 'OPPONENT',
          isDoubleUp: false,
          reason: `💥 OPPONENT ASSIST! Coach ${coach.name} brought in backup!`
        });
        setIsWaitingForCoach(false);
      }, 800);

      setCanPlayerAssist(false);
      setTurnResult(evaluation); // Initial evaluation until assist plays
      return;
    }

    // Player Assist detection!
    const hasSameNationInHand = currentPHand.some(c => c.nationality === pCard.nationality && c.id !== pCard.id);
    if (evaluation.winner === 'OPPONENT' && hasSameNationInHand) {
      setCanPlayerAssist(true);
    } else {
      setCanPlayerAssist(false);
    }

    setTurnResult(evaluation);
  }, [drawDeck, isPlayerTurnToPickFirst, coach.name]);

  // Update and save game statistics on MATCH_OVER
  useEffect(() => {
    if (gamePhase === 'MATCH_OVER' && !hasRecordedMatchStats) {
      setHasRecordedMatchStats(true);
      
      const getTop11Score = (deck: Card[]) => {
        return [...deck].sort((a, b) => b.rating - a.rating).slice(0, 11).reduce((acc, c) => acc + c.rating, 0);
      };
      
      const pScore = getTop11Score(playerWonDeck);
      const oScore = getTop11Score(opponentWonDeck);
      const isPlayerWin = pScore >= oScore;

      setGameStats(prev => {
        const nextWins = isPlayerWin ? prev.totalWins + 1 : prev.totalWins;
        const nextStreak = isPlayerWin ? prev.currentStreak + 1 : 0;
        const nextMaxStreak = Math.max(prev.maxStreak, nextStreak);
        const updated = {
          ...prev,
          totalWins: nextWins,
          currentStreak: nextStreak,
          maxStreak: nextMaxStreak,
        };
        try {
          localStorage.setItem('squadSwapStats', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
    }
  }, [gamePhase, hasRecordedMatchStats, playerWonDeck, opponentWonDeck]);

  // Handle Coach playing first on even turns
  useEffect(() => {
    if (gamePhase === 'DUEL_PICK' && !isPlayerTurnToPickFirst && !playedOpponentCard && opponentHand.length > 0) {
      setIsWaitingForCoach(true);
      const timer = setTimeout(() => {
        const chosen = executeCoachTurn(opponentHand, null);
        if (chosen) {
          const originalIdx = opponentHand.findIndex(c => c.id === chosen.id);
          setPlayedOpponentCardIndex(originalIdx !== -1 ? originalIdx : 0);
          soundFx.playCardSwoosh();
          setPlayedOpponentCard(chosen);
          setOpponentHand(prev => prev.filter(c => c.id !== chosen.id));
        }
        setIsWaitingForCoach(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [gamePhase, isPlayerTurnToPickFirst, playedOpponentCard, opponentHand, executeCoachTurn]);

  // Automatically start shuffling and then dealing when DRAW phase starts
  useEffect(() => {
    if (gamePhase === 'DRAW') {
      setIsShuffling(true);
      setHasStartedDealing(false);
      setDrawnCountP(0);
      setDrawnCountO(0);

      soundFx.playWhistle();
      
      // Multi-shuffling sounds for absolute satisfaction
      let count = 0;
      const soundInterval = setInterval(() => {
        if (count < 3) {
          soundFx.playPaperRustle();
          count++;
        } else {
          clearInterval(soundInterval);
        }
      }, 120);

      const timer = setTimeout(() => {
        setIsShuffling(false);
        setHasStartedDealing(true);
      }, 600); // 0.6 seconds of high-fidelity shuffle animation!

      return () => {
        clearInterval(soundInterval);
        clearTimeout(timer);
      };
    } else {
      setIsShuffling(false);
      setHasStartedDealing(false);
    }
  }, [gamePhase]);

  // Beautiful sequential poker-style dealer (Alternating "jedna meni jedna njemu")
  useEffect(() => {
    if (gamePhase !== 'DRAW' || isShuffling || !hasStartedDealing) return;

    // Check if we need to recycle the drawDeck
    if (drawDeck.length < 10) {
      const excludeList = [
        ...playerHand,
        ...opponentHand,
        ...(playedPlayerCard ? [playedPlayerCard] : []),
        ...(playedOpponentCard ? [playedOpponentCard] : []),
        ...(playedPlayerAssistCard ? [playedPlayerAssistCard] : []),
        ...(playedOpponentAssistCard ? [playedOpponentAssistCard] : []),
        ...playerWonDeck,
        ...opponentWonDeck
      ];
      const excludeIds = new Set(excludeList.filter(Boolean).map(c => c.id));
      const recycled = ALL_CARDS.filter(c => !excludeIds.has(c.id));
      const shuffledRecycled = shuffleArray(recycled);
      setDrawDeck(prev => [...prev, ...shuffledRecycled]);
      return;
    }

    const targetDrawP = turn === 1 ? 5 : 1;
    const targetDrawO = turn === 1 ? 5 : 1;

    const neededP = Math.max(0, targetDrawP - drawnCountP);
    const neededO = Math.max(0, targetDrawO - drawnCountO);

    if (neededP === 0 && neededO === 0) {
      // Both hands fully replenished/drawn! Transition to DUEL_PICK phase
      const timer = setTimeout(() => {
        setGamePhase('DUEL_PICK');
      }, 200);
      return () => clearTimeout(timer);
    }

    // Alternating deal: "jedna meni jedna njemu"
    // We deal to the player with fewer cards drawn so far, or if equal, deal to the Player first if they still need cards.
    const isPlayerNext = neededP > 0 && (drawnCountP <= drawnCountO || neededO === 0);

    const timer = setTimeout(() => {
      // Get the next card from drawDeck
      const nextCard = drawDeck[0];
      if (nextCard) {
        soundFx.playCardSwoosh();
        if (isPlayerNext) {
          setPlayerHand(prev => [...prev, nextCard]);
          setDrawnCountP(prev => prev + 1);
        } else {
          setOpponentHand(prev => [...prev, nextCard]);
          setDrawnCountO(prev => prev + 1);
        }
        setDrawDeck(prev => prev.slice(1));
      }
    }, 70); // Rapid deal delay (70ms) to match sfx and feel dynamic

    return () => clearTimeout(timer);
  }, [gamePhase, isShuffling, hasStartedDealing, playerHand.length, opponentHand.length, drawDeck, playedPlayerCard, playedOpponentCard, playedPlayerAssistCard, playedOpponentAssistCard, playerWonDeck, opponentWonDeck, drawnCountP, drawnCountO, turn]);

  // Handle Player selecting a card from hand
  const handlePlayerSelectCard = (selected: Card) => {
    if (playedPlayerCard || gamePhase !== 'DUEL_PICK') return;
    if (!isPlayerTurnToPickFirst && !playedOpponentCard) return; // Cannot play before opponent in their turn!

    soundFx.playPaperRustle();
    soundFx.playCardSwoosh();
    setPlayedPlayerCard(selected);
    const updatedPlayerHand = playerHand.filter(c => c.id !== selected.id);
    setPlayerHand(updatedPlayerHand);

    if (isPlayerTurnToPickFirst) {
      // Player picked first. Now Coach responds.
      setIsWaitingForCoach(true);
      setTimeout(() => {
        const oChoice = executeCoachTurn(opponentHand, selected);
        if (oChoice) {
          const originalIdx = opponentHand.findIndex(c => c.id === oChoice.id);
          setPlayedOpponentCardIndex(originalIdx !== -1 ? originalIdx : 0);
          soundFx.playCardSwoosh();
          setPlayedOpponentCard(oChoice);
          const updatedOppHand = opponentHand.filter(c => c.id !== oChoice.id);
          setOpponentHand(updatedOppHand);
          setIsWaitingForCoach(false);
          evaluateDuel(selected, oChoice, updatedPlayerHand, updatedOppHand);
        }
      }, 750);
    } else {
      // Coach picked first. Player responded second. Evaluate immediately!
      if (playedOpponentCard) {
        evaluateDuel(selected, playedOpponentCard, updatedPlayerHand, opponentHand);
      }
    }
  };

  // Replenish hands to 5 cards from drawDeck with 100% duplicate protection
  const replenishHands = (customPHand: Card[], customOHand: Card[], customDeck?: Card[]) => {
    const activeDeck = customDeck || drawDeck;
    const neededP = Math.max(0, 5 - customPHand.length);
    const neededO = Math.max(0, 5 - customOHand.length);

    // Filter out cards already in player hands, played cards, or won decks
    const excludeList = [
      ...customPHand,
      ...customOHand,
      ...(playedPlayerCard ? [playedPlayerCard] : []),
      ...(playedOpponentCard ? [playedOpponentCard] : []),
      ...(playedPlayerAssistCard ? [playedPlayerAssistCard] : []),
      ...(playedOpponentAssistCard ? [playedOpponentAssistCard] : []),
      ...playerWonDeck,
      ...opponentWonDeck
    ];

    const excludeIds = new Set(excludeList.filter(Boolean).map(c => c.id));

    // Draw unique cards for player
    const cardsForPlayer: Card[] = [];
    const remainingDeckAfterPlayer: Card[] = [];
    
    let drawsP = 0;
    for (const card of activeDeck) {
      if (drawsP < neededP && !excludeIds.has(card.id)) {
        cardsForPlayer.push(card);
        excludeIds.add(card.id);
        drawsP++;
      } else {
        remainingDeckAfterPlayer.push(card);
      }
    }

    // Draw unique cards for opponent
    const cardsForOpponent: Card[] = [];
    let finalRemainingDeck: Card[] = [];
    
    let drawsO = 0;
    for (const card of remainingDeckAfterPlayer) {
      if (drawsO < neededO && !excludeIds.has(card.id)) {
        cardsForOpponent.push(card);
        excludeIds.add(card.id);
        drawsO++;
      } else {
        finalRemainingDeck.push(card);
      }
    }

    // Infinite Deck Recycling
    if (finalRemainingDeck.length < 10) {
      const recycled = ALL_CARDS.filter(c => !excludeIds.has(c.id));
      const shuffledRecycled = shuffleArray(recycled);
      finalRemainingDeck = [...finalRemainingDeck, ...shuffledRecycled];
    }

    setPlayerHand([...customPHand, ...cardsForPlayer]);
    setOpponentHand([...customOHand, ...cardsForOpponent]);
    setDrawDeck(finalRemainingDeck);
    
    setGamePhase('DUEL_PICK');
  };

  // Complete Shootout Modal
  const handleCompleteShootout = () => {
    if (!shootoutData) return;

    const { playerOriginal, opponentOriginal, playerDrawn, opponentDrawn } = shootoutData;
    const pTotal = [playerOriginal, ...playerDrawn].reduce((sum, c) => sum + c.rating, 0);
    const oTotal = [opponentOriginal, ...opponentDrawn].reduce((sum, c) => sum + c.rating, 0);

    const winner: 'PLAYER' | 'OPPONENT' = pTotal >= oTotal ? 'PLAYER' : 'OPPONENT';
    const all8 = [playerOriginal, opponentOriginal, ...playerDrawn, ...opponentDrawn];

    if (winner === 'PLAYER') {
      setPlayerWonDeck(prev => [...prev, ...all8]);
    } else {
      setOpponentWonDeck(prev => [...prev, ...all8]);
    }

    setShootoutData(null);

    // Check if match over
    if (turn >= 18) {
      setGamePhase('MATCH_OVER');
    } else {
      // Next turn
      setTurn(prev => prev + 1);
      setPlayedPlayerCard(null);
      setPlayedOpponentCard(null);
      setPlayedPlayerAssistCard(null);
      setPlayedOpponentAssistCard(null);
      setPlayedOpponentCardIndex(null);
      setCanPlayerAssist(false);
      setTurnResult(null);
      
      // Shuffling the draw deck again as requested after penalties!
      const newShuffledDeck = shuffleArray([...drawDeck]);
      setDrawDeck(newShuffledDeck);
      
      // Instant draw of cards!
      replenishHands(playerHand, opponentHand, newShuffledDeck);
    }
  };

  // Move to Next Turn after standard duel evaluation
  const handleNextTurn = useCallback(() => {
    if (!playedPlayerCard || !playedOpponentCard || !turnResult) return;

    const both = [playedPlayerCard, playedOpponentCard];
    if (playedPlayerAssistCard) {
      both.push(playedPlayerAssistCard);
    }
    if (playedOpponentAssistCard) {
      both.push(playedOpponentAssistCard);
    }

    if (turnResult.winner === 'PLAYER') {
      setPlayerWonDeck(prev => [...prev, ...both]);
    } else {
      setOpponentWonDeck(prev => [...prev, ...both]);
    }

    if (turn >= 18) {
      setGamePhase('MATCH_OVER');
    } else {
      setTurn(prev => prev + 1);
      setPlayedPlayerCard(null);
      setPlayedOpponentCard(null);
      setPlayedPlayerAssistCard(null);
      setPlayedOpponentAssistCard(null);
      setPlayedOpponentCardIndex(null);
      setCanPlayerAssist(false);
      setTurnResult(null);

      // Instant draw of cards!
      replenishHands(playerHand, opponentHand);
    }
  }, [playedPlayerCard, playedOpponentCard, playedPlayerAssistCard, playedOpponentAssistCard, turnResult, turn, playerHand, opponentHand]);

  const handlePlayerAssist = (assistCard: Card) => {
    if (!playedPlayerCard || !playedOpponentCard || !turnResult) return;
    
    soundFx.playWhistle();
    setPlayedPlayerAssistCard(assistCard);
    
    // Remove the assist card from player's hand immediately
    const updatedHand = playerHand.filter(c => c.id !== assistCard.id);
    setPlayerHand(updatedHand);

    // CHECK IF OPPONENT HAS A MATCHING NATIONALITY CARD FOR THEIR FIRST CARD TO TRIGGER DOUBLE ASSIST!
    const oHasSameNationInHand = opponentHand.some(c => c.nationality === playedOpponentCard.nationality && c.id !== playedOpponentCard.id);
    
    if (oHasSameNationInHand) {
      // Find the best matching card in opponent's hand to play as assist
      const oppAssistCards = opponentHand.filter(c => c.nationality === playedOpponentCard.nationality && c.id !== playedOpponentCard.id)
        .sort((a, b) => b.rating - a.rating);
      const oppAssistCard = oppAssistCards[0];

      setIsWaitingForCoach(true);
      setTimeout(() => {
        soundFx.playCardSwoosh();
        soundFx.playDoubleUpAlarm();
        setPlayedOpponentAssistCard(oppAssistCard);
        setOpponentHand(prev => prev.filter(c => c.id !== oppAssistCard.id));
        
        setTurnResult({
          winner: 'OPPONENT',
          isDoubleUp: false,
          reason: `💥 DOUBLE ASSIST! AI Coach matched you and wins!`
        });
        setIsWaitingForCoach(false);
      }, 700);
    } else {
      // Standard Player Assist wins the round
      setTurnResult({
        winner: 'PLAYER',
        isDoubleUp: false,
        reason: `🏆 ASSIST SUCCESSFUL! You secure the win!`
      });
    }

    setCanPlayerAssist(false);
  };

  const handlePassAssist = () => {
    setCanPlayerAssist(false);
  };

  const getMatchWinner = () => {
    const getTop11Score = (deck: Card[]) => {
      return [...deck].sort((a, b) => b.rating - a.rating).slice(0, 11).reduce((acc, c) => acc + c.rating, 0);
    };
    const pScore = getTop11Score(playerWonDeck);
    const oScore = getTop11Score(opponentWonDeck);
    return pScore >= oScore ? 'PLAYER' : 'OPPONENT';
  };

  const handleGameOverClose = () => {
    const isPlayerWin = getMatchWinner() === 'PLAYER';

    if (matchMode === 'QUICK_MATCH') {
      setGamePhase('MAIN_MENU');
      return;
    }

    if (matchMode === 'TOURNAMENT') {
      if (isPlayerWin) {
        if (tournamentStage === 'QUARTER_FINAL') {
          setTournamentStage('SEMI_FINAL');
          setGamePhase('TOURNAMENT_BRACKET');
        } else if (tournamentStage === 'SEMI_FINAL') {
          setTournamentStage('FINAL');
          setGamePhase('TOURNAMENT_BRACKET');
        } else if (tournamentStage === 'FINAL') {
          setTournamentStage('CHAMPION');
          setGameStats(prev => {
            const updated = { ...prev, tournamentWins: prev.tournamentWins + 1 };
            try { localStorage.setItem('squadSwapStats', JSON.stringify(updated)); } catch (e) {}
            return updated;
          });
          setGamePhase('TOURNAMENT_BRACKET');
        }
      } else {
        setTournamentStage('ELIMINATED');
        setGamePhase('TOURNAMENT_BRACKET');
      }
      return;
    }

    if (matchMode === 'WORLD_CUP') {
      if (worldCupStage === 'GROUP_1' || worldCupStage === 'GROUP_2' || worldCupStage === 'GROUP_3') {
        updateWorldCupGroupResults(isPlayerWin);
      } else if (worldCupStage === 'SEMI_FINAL') {
        if (isPlayerWin) {
          setWorldCupStage('FINAL');
          setGamePhase('GROUP_STANDINGS');
        } else {
          setWorldCupStage('ELIMINATED');
          setGamePhase('GROUP_STANDINGS');
        }
      } else if (worldCupStage === 'FINAL') {
        if (isPlayerWin) {
          setWorldCupStage('CHAMPION');
          setGameStats(prev => {
            const updated = { ...prev, worldCupWins: prev.worldCupWins + 1 };
            try { localStorage.setItem('squadSwapStats', JSON.stringify(updated)); } catch (e) {}
            return updated;
          });
          setGamePhase('GROUP_STANDINGS');
        } else {
          setWorldCupStage('ELIMINATED');
          setGamePhase('GROUP_STANDINGS');
        }
      }
    }
  };

  const updateWorldCupGroupResults = (isPlayerWin: boolean) => {
    const getTop11Score = (deck: Card[]) => {
      return [...deck].sort((a, b) => b.rating - a.rating).slice(0, 11).reduce((acc, c) => acc + c.rating, 0);
    };
    const pScore = getTop11Score(playerWonDeck);
    const oScore = getTop11Score(opponentWonDeck);

    let pPts = 0, pW = 0, pD = 0, pL = 0;
    let matchResult: 'W' | 'D' | 'L' = 'D';
    if (pScore > oScore) {
      matchResult = 'W'; pPts = 3; pW = 1;
    } else if (pScore < oScore) {
      matchResult = 'L'; pPts = 0; pL = 1;
    } else {
      matchResult = 'D'; pPts = 1; pD = 1;
    }

    let simId1 = '', simId2 = '', simW = 0, simD = 0, simL = 0, simPts = 0;
    const rand = Math.random();

    if (worldCupStage === 'GROUP_1') {
      simId1 = 'mourinho'; simId2 = 'klopp';
      if (rand < 0.45) { simW = 1; simPts = 3; }
      else if (rand < 0.8) { simL = 1; simPts = 0; }
      else { simD = 1; simPts = 1; }
    } else if (worldCupStage === 'GROUP_2') {
      simId1 = 'lasso'; simId2 = 'klopp';
      if (rand < 0.8) { simW = 1; simPts = 3; }
      else if (rand < 0.9) { simL = 1; simPts = 0; }
      else { simD = 1; simPts = 1; }
    } else {
      simId1 = 'lasso'; simId2 = 'mourinho';
      if (rand < 0.7) { simW = 1; simPts = 3; }
      else if (rand < 0.9) { simL = 1; simPts = 0; }
      else { simD = 1; simPts = 1; }
    }

    const nextStandings = groupStandings.map(t => {
      if (t.id === 'player') {
        return { ...t, p: t.p + 1, w: t.w + pW, d: t.d + pD, l: t.l + pL, pts: t.pts + pPts };
      }
      
      let isPlayingPlayer = false;
      let wonPlayerMatch = false;
      let drewPlayerMatch = false;

      if (worldCupStage === 'GROUP_1' && t.id === 'lasso') { isPlayingPlayer = true; wonPlayerMatch = matchResult === 'L'; drewPlayerMatch = matchResult === 'D'; }
      if (worldCupStage === 'GROUP_2' && t.id === 'mourinho') { isPlayingPlayer = true; wonPlayerMatch = matchResult === 'L'; drewPlayerMatch = matchResult === 'D'; }
      if (worldCupStage === 'GROUP_3' && t.id === 'klopp') { isPlayingPlayer = true; wonPlayerMatch = matchResult === 'L'; drewPlayerMatch = matchResult === 'D'; }

      if (isPlayingPlayer) {
        return {
          ...t,
          p: t.p + 1,
          w: t.w + (wonPlayerMatch ? 1 : 0),
          d: t.d + (drewPlayerMatch ? 1 : 0),
          l: t.l + (!wonPlayerMatch && !drewPlayerMatch ? 1 : 0),
          pts: t.pts + (wonPlayerMatch ? 3 : drewPlayerMatch ? 1 : 0)
        };
      }

      if (t.id === simId1 || t.id === simId2) {
        const isTeam2 = t.id === simId2;
        const isWin = isTeam2 ? simW === 1 : simL === 1;
        const isLoss = isTeam2 ? simL === 1 : simW === 1;
        const isDraw = simD === 1;

        return {
          ...t,
          p: t.p + 1,
          w: t.w + (isWin ? 1 : 0),
          d: t.d + (isDraw ? 1 : 0),
          l: t.l + (isLoss ? 1 : 0),
          pts: t.pts + (isWin ? 3 : isDraw ? 1 : 0)
        };
      }

      return t;
    });

    setGroupStandings(nextStandings);

    if (worldCupStage === 'GROUP_1') {
      setWorldCupStage('GROUP_2');
      setGamePhase('GROUP_STANDINGS');
    } else if (worldCupStage === 'GROUP_2') {
      setWorldCupStage('GROUP_3');
      setGamePhase('GROUP_STANDINGS');
    } else {
      const sorted = [...nextStandings].sort((a, b) => b.pts - a.pts || b.w - a.w);
      const playerIndex = sorted.findIndex(t => t.id === 'player');
      if (playerIndex < 2) {
        setWorldCupStage('SEMI_FINAL');
      } else {
        setWorldCupStage('ELIMINATED');
      }
      setGamePhase('GROUP_STANDINGS');
    }
  };

  const startTournamentMatch = () => {
    let opponentCoach = OFFICIAL_COACHES[2]; // Smile Kloppo L3
    if (tournamentStage === 'SEMI_FINAL') {
      opponentCoach = OFFICIAL_COACHES[3]; // Carlo Ancelotti L4
    } else if (tournamentStage === 'FINAL') {
      opponentCoach = OFFICIAL_COACHES[4]; // Pep Guardiola L5
    }
    startMatch(opponentCoach);
  };

  const startWorldCupMatch = () => {
    let opponentCoach = OFFICIAL_COACHES[0]; // Ted Lasso L1
    if (worldCupStage === 'GROUP_2') {
      opponentCoach = OFFICIAL_COACHES[1]; // Jose Mourinho L2
    } else if (worldCupStage === 'GROUP_3') {
      opponentCoach = OFFICIAL_COACHES[2]; // Jürgen Klopp L3
    } else if (worldCupStage === 'SEMI_FINAL') {
      opponentCoach = OFFICIAL_COACHES[3]; // Carlo Ancelotti L4
    } else if (worldCupStage === 'FINAL') {
      opponentCoach = OFFICIAL_COACHES[4]; // Pep Guardiola L5
    }
    startMatch(opponentCoach);
  };

  const initializeWorldCupGroup = (selectedNation: Nation) => {
    // Filter out player's nation
    const remaining = AVAILABLE_NATIONS.filter(c => c.id !== selectedNation.id);
    const shuffled = [...remaining].sort(() => 0.5 - Math.random());
    
    // Pick 3 random remaining nations
    const opp1 = shuffled[0] || remaining[0];
    const opp2 = shuffled[1] || remaining[1];
    const opp3 = shuffled[2] || remaining[2];

    setGroupStandings([
      { id: 'player', name: `${selectedNation.name} (YOU)`, emoji: selectedNation.emoji, p: 0, w: 0, d: 0, l: 0, pts: 0 },
      { id: 'lasso', name: `${opp1.name} (Happy 🥸)`, emoji: opp1.emoji, p: 0, w: 0, d: 0, l: 0, pts: 0 },
      { id: 'mourinho', name: `${opp2.name} (Special 🤫)`, emoji: opp2.emoji, p: 0, w: 0, d: 0, l: 0, pts: 0 },
      { id: 'klopp', name: `${opp3.name} (Smile 😁)`, emoji: opp3.emoji, p: 0, w: 0, d: 0, l: 0, pts: 0 },
    ]);

    setWorldCupStage('GROUP_1');
    setGamePhase('GROUP_STANDINGS');
  };

  const playerTeam = groupStandings.find(t => t.id === 'player');

  return (
    <div 
      onContextMenu={(e) => e.preventDefault()}
      className={`min-h-screen bg-slate-950 flex flex-col font-sans text-slate-100 antialiased overflow-x-hidden selection:bg-emerald-500 selection:text-slate-950 select-none ${
        forceCssLandscape ? 'force-landscape-container' : ''
      }`}
    >
      {/* Mobile Screen Orientation Prompt & Landscape Controls */}
      <MobileOrientationPrompt 
        forceCssLandscape={forceCssLandscape} 
        onToggleForceCssLandscape={() => setForceCssLandscape(prev => !prev)} 
      />
      
      {/* 1. Glavni Početni Meni (Arkada) */}
      {gamePhase === 'MAIN_MENU' && (
        <MainMenu
          onSelectMode={(mode) => {
            setMatchMode(mode);
            if (mode === 'QUICK_MATCH') {
              setGamePhase('COACH_SELECT');
            } else if (mode === 'TOURNAMENT') {
              setTournamentStage('QUARTER_FINAL');
              setGamePhase('TOURNAMENT_BRACKET');
            } else if (mode === 'WORLD_CUP') {
              setGamePhase('WC_NATION_SELECT');
            }
          }}
          onOpenPlayers={() => setGamePhase('AWARDS_GALLERY')}
          onOpenTrophies={() => setIsTrophiesOpen(true)}
          onOpenRules={() => setShowRules(true)}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}

      {/* 2. Teren i igra (Bez ogromnog gornjeg Navbara, sa kompaktnim ⏸️ Pauza dugmetom!) */}
      {(gamePhase === 'DRAW' || gamePhase === 'DUEL_PICK' || gamePhase === 'DUEL_REVEAL' || gamePhase === 'SHOOTOUT_ANIMATING' || gamePhase === 'TURN_RESULT') && (
        <main className="flex-1 flex flex-col p-0.5 sm:p-2 max-w-5xl w-full mx-auto h-[100dvh] max-h-[100dvh] overflow-hidden justify-between">
          <PitchBoard
            coach={coach}
            minute={minute}
            turn={turn}
            gamePhase={gamePhase}
            playerHand={playerHand}
            opponentHand={opponentHand}
            opponentHandCount={opponentHand.length}
            playerSquadDeckCount={playerWonDeck.length}
            opponentSquadDeckCount={opponentWonDeck.length}
            playedPlayerCard={playedPlayerCard}
            playedOpponentCard={playedOpponentCard}
            playedPlayerAssistCard={playedPlayerAssistCard}
            playedOpponentAssistCard={playedOpponentAssistCard}
            playedOpponentCardIndex={playedOpponentCardIndex}
            turnResult={turnResult}
            isPlayerTurnToPickFirst={isPlayerTurnToPickFirst}
            isWaitingForCoach={isWaitingForCoach}
            onPlayerSelectCard={handlePlayerSelectCard}
            onNextTurn={handleNextTurn}
            isShuffling={isShuffling}
            hasStartedDealing={hasStartedDealing}
            onRestart={() => setGamePhase('MAIN_MENU')}
            onOpenRules={() => setShowRules(true)}
            soundEnabled={soundEnabled}
            onToggleSound={handleToggleSound}
            canPlayerAssist={canPlayerAssist}
            onPlayerAssist={handlePlayerAssist}
            onPassAssist={handlePassAssist}
            drawDeckCount={drawDeck.length}
          />
        </main>
      )}

      {/* 3. Tournament Bracket View */}
      {gamePhase === 'TOURNAMENT_BRACKET' && tournamentStage && (
        <main className="flex-1 flex flex-col p-4 sm:p-6 max-w-7xl w-full mx-auto justify-center items-center">
          <TournamentBracket
            currentStage={tournamentStage}
            onStartMatch={startTournamentMatch}
            onReset={() => setGamePhase('MAIN_MENU')}
            playerTeamName={playerTeam?.name}
            playerTeamEmoji={playerTeam?.emoji}
          />
        </main>
      )}

      {/* 4. World Cup Group Standings View */}
      {gamePhase === 'GROUP_STANDINGS' && worldCupStage && (
        <main className="flex-1 flex flex-col p-4 sm:p-6 max-w-7xl w-full mx-auto justify-center items-center">
          <GroupStandings
            standings={groupStandings}
            currentMatchIndex={
              worldCupStage === 'GROUP_1' ? 0 :
              worldCupStage === 'GROUP_2' ? 1 : 2
            }
            isGroupOver={worldCupStage === 'SEMI_FINAL' || worldCupStage === 'FINAL' || worldCupStage === 'CHAMPION' || worldCupStage === 'ELIMINATED'}
            didPlayerQualify={worldCupStage !== 'ELIMINATED'}
            onStartMatch={startWorldCupMatch}
            onStartKnockoutStage={() => {
              startWorldCupMatch();
            }}
            onReset={() => setGamePhase('MAIN_MENU')}
          />
        </main>
      )}

      {/* WC Nation Select View */}
      {gamePhase === 'WC_NATION_SELECT' && (
        <WCNationSelect
          onSelectNation={(nation) => {
            initializeWorldCupGroup(nation);
          }}
          onBack={() => setGamePhase('MAIN_MENU')}
        />
      )}

      {/* Galerija Osvojenih Kartica / Trofeji */}
      {gamePhase === 'AWARDS_GALLERY' && (
        <AwardsGalleryModal onClose={() => setGamePhase('MAIN_MENU')} />
      )}

      {/* Coach Selection Modal */}
      {gamePhase === 'COACH_SELECT' && (
        <CoachSelectModal
          onSelectCoach={startMatch}
          matchMode={matchMode}
          onSelectMode={setMatchMode}
          onBack={() => setGamePhase('MAIN_MENU')}
        />
      )}

      {/* Rules Modal */}
      {showRules && (
        <RulesModal onClose={() => setShowRules(false)} />
      )}

      {/* Trophies Cabinet Modal */}
      {isTrophiesOpen && (
        <TrophiesModal stats={gameStats} onClose={() => setIsTrophiesOpen(false)} />
      )}

      {/* Penalty Shootout Modal */}
      {gamePhase === 'SHOOTOUT_ANIMATING' && shootoutData && (
        <ShootoutModal
          playerOriginal={shootoutData.playerOriginal}
          opponentOriginal={shootoutData.opponentOriginal}
          playerDrawn={shootoutData.playerDrawn}
          opponentDrawn={shootoutData.opponentDrawn}
          reason={shootoutData.reason}
          onComplete={handleCompleteShootout}
        />
      )}

      {/* Game Over Top 11 Showdown Modal */}
      {gamePhase === 'MATCH_OVER' && (
        <GameOverModal
          playerWonDeck={playerWonDeck}
          opponentWonDeck={opponentWonDeck}
          coach={coach}
          matchMode={matchMode}
          onRestart={handleGameOverClose}
        />
      )}
    </div>
  );
}

