import { TX } from '../types';

export interface RainByMagnitude {
  rainByMagnitude: string;
  txid: TX;
  rainAmountSent: number;
  txFee: number
  '#OfRecipients': number;
}
