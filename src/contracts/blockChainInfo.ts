import { IDifficulty } from './difficulty';

export interface IBlockChainInfo {
  /**
   * the current number of blocks processed in the server
   *
   * @type {number}
   * @memberof IBlockChainInfo
   */
  blocks: number;
  moneysupply: number;
  difficulty: IDifficulty;
  testnet: boolean;
  errors: string;
}
