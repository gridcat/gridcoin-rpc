import IDifficulty from './difficulty'
import INetworkInfo from './networkInfo'
import IWallerInfo from './walletInfo'

export default interface IInfo extends INetworkInfo, IWallerInfo {
  // version: string,
  // minor_version: number,
  // protocolversion: number,

  // walletversion: number,
  // balance: number,
  // newmint: number,
  // stake: number,
  // blocks: number,
  // keypoololdest: number,
  // keypoolsize: number,

  // timeoffset: number,
  moneysupply: number
  // connections: number,
  // proxy: string,
  // ip: string,
  difficulty: IDifficulty
  testnet: boolean
  // paytxfee: number,
  // mininput: number,
  // errors: string,
}
