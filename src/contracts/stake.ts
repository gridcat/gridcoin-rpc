import { Address, Block, TX } from '../types';

export interface Stake {
  block: Block;
  height: number;
  confirmations: number;
  immature: boolean;
  txid: TX;
  time: number;
  elapsedSeconds: number;
  elapsedDays: number;
  mint: number;
  researchReward: number;
  sideStake: number;
  address: Address;
  label: string;
}

export interface StakeListing {
  account: string;
  address: Address;
  category: string;
  Type: string;
  fee: number;
  amount: number;
  confirmations: number;
  generated: boolean;
  blockhash: string;
  blockindex: number;
  blocktime: number;
  txid: string;
  time: number;
  timereceived: number;
}
