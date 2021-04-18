import { IDifficulty } from './difficulty';
import { INetworkInfo } from './networkInfo';
import { IWalletInfo } from './walletInfo';

export interface IInfo extends INetworkInfo, IWalletInfo {
  moneysupply: number;
  difficulty: IDifficulty;
  testnet: boolean;
}
