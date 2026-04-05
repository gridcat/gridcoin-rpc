import { BlockchainDifficulty } from './blockchainInfo';

export interface Info {
  version: string;
  minorVersion: number;
  protocolversion: number;
  walletversion: number;
  balance: number;
  newmint: number;
  stake: number;
  blocks: number;
  inSync: boolean;
  timeoffset: number;
  uptime: number;
  moneysupply: number;
  connections: number;
  proxy: string;
  ip: string;
  difficulty: BlockchainDifficulty;
  testnet: boolean;
  keypoololdest: number;
  keypoolsize: number;
  paytxfee: number;
  mininput: number;
  unlockedUntil?: number;
  errors: string;
}
