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
