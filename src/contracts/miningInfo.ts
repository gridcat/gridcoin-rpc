import { IDifficulty } from './difficulty';

export interface IStakeWeight {
  minimum: number;
  maximum: number;
  combined: number;
  valuesum: number;
  legacy: number;
}

export interface IMiningInfo {
  /**
   * The current block
   *
   * @type {number}
   * @memberof IMiningInfo
   */
  blocks: number;
  stakeweight: IStakeWeight;
  netstakeweight: number;
  netstakingGRCvalue: number;
  staking: boolean;
  'mining-error': string;
  'time-to-stake_days': number;
  expectedtime: number;
  'mining-version': number;
  'mining-created': number;
  'mining-accepted': number;
  'mining-kernels-found': number;
  InterestPending: number;
  'kernel-diff-best': number;
  'kernel-diff-sum': number;
  difficulty: IDifficulty;
  errors: string;
  /**
   * The size of the mempool
   *
   * @type {number}
   * @memberof IMiningInfo
   */
  pooledtx: number;
  stakeinterest: number;
  testnet: boolean;
  PopularNeuralHash: string;
  NeuralPopularity: number;
  MyNeuralHash: string;
  CPID: string;
  RSAWeight: number;
  'Magnitude Unit': number;
  BoincRewardPending: number;
  'MiningInfo 1': string;
  'MiningInfo 2': string;
  'MiningInfo 5': string;
  'MiningInfo 6': string;
  'MiningInfo 7': string;
  'MiningInfo 8': string;
}
