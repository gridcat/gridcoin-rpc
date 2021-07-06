import { BlockchainDifficulty } from './blockchainInfo';
import { NetworkInfo } from './networkInfo';
import { WalletInfo } from './walletInfo';

export interface Info extends
  Omit<NetworkInfo, 'localaddresses'>,
  Omit<WalletInfo, 'staking' & 'miningerror'>
{
  moneysupply: number;
  difficulty: BlockchainDifficulty;
  testnet: boolean;
}
