import { TX, Address } from '../types';

export interface BalanceTransaction {
  timestamp: number;
  txid: TX;
  address: Address;
  amount: number;
}

export interface BalanceDetail {
  balance: number;
  fees: number;
  list: BalanceTransaction[];
}
