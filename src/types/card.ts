import { StaticImageData } from 'next/image';
import {
  AH,
  AmericaToday,
  Dyson,
  Gall,
  NS,
  Pathe,
  Rituals,
  Spar,
  Wereldhave,
  SecretView,
  AHDelhaize,
  Keurslager,
  Kiosk,
  LaPlace,
  MS,
  Starbucks,
  DA,
  Dirk,
  HollandBarrett,
} from '../img/index';

export type CardType = {
  id: string;
  flipped?: boolean;
  front?: string;
  back?: string;
  matchId?: string;
  clickable?: boolean;
};

export type MatchedCardType = {
  id: string;
};

export const cards: StaticImageData[] = [
  AH,
  AHDelhaize,
  AmericaToday,
  DA,
  Dirk,
  Dyson,
  Gall,
  HollandBarrett,
  Keurslager,
  Kiosk,
  LaPlace,
  MS,
  NS,
  Pathe,
  Rituals,
  Spar,
  Starbucks,
  Wereldhave,
];
