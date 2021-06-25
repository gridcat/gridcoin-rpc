import { PublicKey, TX } from '../types';

export interface Outpoints {
  txid: TX;
  offset: number;
}

export interface AddressClaim {
  publicKey: PublicKey;
  signature: string;
  outpoints: Outpoints[];
}

export interface VotingClaim {
  version: number;
  addressClaim: AddressClaim;
}
