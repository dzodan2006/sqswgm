import { Card, RoundEvaluation } from '../types';

export class SquadSwapEngine {
  /**
   * Evaluates a duel between the player's card and opponent's card.
   * Potezi se odvijaju naizmenično (Alternating turns).
   * @param isPlayerSecond - true if Coach played first and Player responds second.
   */
  public static evaluateRound(
    playerCard: Card,
    opponentCard: Card,
    playerHasDoubleUpPartner: boolean,
    opponentHasDoubleUpPartner: boolean,
    isPlayerSecond: boolean
  ): RoundEvaluation {
    const sameRating = playerCard.rating === opponentCard.rating;
    const sameNation = playerCard.nationality === opponentCard.nationality;

    // Ako su iste nacionalnosti, bez obzira na sve (i ocene i druge uslove) igraju se penali
    if (sameNation) {
      return {
        winner: 'SHOOTOUT',
        isDoubleUp: false,
        reason: `🏳️ SAME NATIONALITY (${playerCard.nationality})! A tense penalty shootout begins!`
      };
    }

    if (sameRating) {
      return {
        winner: 'SHOOTOUT',
        isDoubleUp: false,
        reason: `⚖️ IDENTICAL RATING (${playerCard.rating} vs ${opponentCard.rating})! A tense penalty shootout begins!`
      };
    }

    // Klasično poređenje rejtinga (Higher rating wins)
    if (playerCard.rating > opponentCard.rating) {
      return {
        winner: 'PLAYER',
        isDoubleUp: false,
        reason: `⚡ Rating Advantage: ${playerCard.rating} beats ${opponentCard.rating}!`
      };
    } else {
      return {
        winner: 'OPPONENT',
        isDoubleUp: false,
        reason: `🛡️ Opponent Stronger: ${opponentCard.rating} beats ${playerCard.rating}!`
      };
    }
  }

  /**
   * Helper to check if a hand has another card of the given nationality
   * excluding the card currently being played (by instance id).
   */
  public static hasDoubleUpPartner(hand: Card[], playedCardId: string, nationality: string): boolean {
    return hand.some(c => c.id !== playedCardId && c.nationality === nationality);
  }
}
