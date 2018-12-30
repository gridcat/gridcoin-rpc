import IDifficulty from './difficulty';
import INetworkInfo from './networkInfo';
import IWallerInfo from './walletInfo';

export default interface IInfo extends INetworkInfo, IWallerInfo {
  moneysupply: number;
  difficulty: IDifficulty;
  testnet: boolean;
}
