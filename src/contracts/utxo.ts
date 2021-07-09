import { TX } from '../types';

export interface UTXO {
  txid: TX;
  vout: number;
  value: number;
}

export interface UnspentReport {
  blockStart: number;
  blockEnd: number;
  totalUtxoCount: number;
  totalValue: number;
}
