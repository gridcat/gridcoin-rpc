import { Difficulty } from './difficulty';
import { INetworkInfo } from './networkInfo';
import { WalletInfo } from './walletInfo';

export interface IInfo extends INetworkInfo, WalletInfo {
  moneysupply: number;
  difficulty: Difficulty;
  testnet: boolean;
}
