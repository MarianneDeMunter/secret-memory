import { SecretView } from '../img';
import { CardType } from '../types/card';

export const memoryCards = (arr: any[]): CardType[] => {
  return [...arr, ...arr].map((card, i) => ({
    id: `card${i}`,
    flipped: false,
    back: SecretView.src,
    front: card.src,
    clickable: true,
    matchId: i < arr.length ? `card${i + arr.length}` : `card${i - arr.length}`,
  }));
};
