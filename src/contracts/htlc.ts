import { TX } from '../types';

export interface CreateHtlcResult {
  p2shAddress: string;
  redeemScript: string;
  senderPubkey: string;
  receiverPubkey: string;
  hash: string;
  timeout: number;
  txid?: TX;
}

export interface ClaimHtlcResult {
  txid: TX;
}

export interface RefundHtlcResult {
  txid: TX;
}
