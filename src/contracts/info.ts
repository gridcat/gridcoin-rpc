import IDifficulty from './difficulty'
import INetworkInfo from './networkInfo'

export default interface IInfo extends INetworkInfo {
  // version: string,
  // minor_version: number,
  // protocolversion: number,
  walletversion: number
  balance: number
  newmint: number
  stake: number
  blocks: number
  // timeoffset: number,
  moneysupply: number
  // connections: number,
  // proxy: string,
  // ip: string,
  difficulty: IDifficulty
  testnet: boolean
  keypoololdest: number
  keypoolsize: number
  // paytxfee: number,
  // mininput: number,
  // errors: string,
}
