import { TX } from '../types';
import { Vin, Vout } from './transaction';

export interface BlockTX {
  txid: string;
  version: number;
  time: number;
  locktime: number;
  hashboinc: string;
  vin: Vin[];
  vout: Vout[];
}

export interface Claim {
  version: number;
  miningId: string;
  clientVersion: string;
  organization: string;
  blockSubsidy: number;
  researchSubsidy: number;
  magnitude: number;
  magnitudeUnit: number;
  signature: string;
  quorumHash: string;
  quorumAddress: string;
}

export interface Block {
  /**
   * the block hash
   *
   * @type {string}
   * @memberof Block
   */
  hash: string;
  /**
   * The number of confirmations, or -1 if the block is not on the main chain
   *
   * @type {Number}
   * @memberof Block
   */
  confirmations: number;
  /**
   * The block size
   *
   * @type {number}
   * @memberof Block
   */
  size: number;
  /**
   * The block height or index
   *
   * @type {number}
   * @memberof Block
   */
  height: number;
  /**
   * The block version
   *
   * @type {number}
   * @memberof Block
   */
  version: number;
  /**
   * The merkle root
   *
   * @type {string}
   * @memberof Block
   */
  merkleroot: string;
  mint: number;
  moneySupply: number;
  /**
   * The block time in seconds since epoch (Jan 1 1970 GMT)
   *
   * @type {number}
   * @memberof Block
   */
  time: number;
  /**
   * The nonce
   *
   * @type {number}
   * @memberof Block
   */
  nonce: number;
  /**
   * The bits
   * @example 1d00ffff
   *
   * @type {string}
   * @memberof Block
   */
  bits: string;
  difficulty: number;
  blocktrust: string;
  chaintrust: string;
  /**
   * The hash of the previous block
   *
   * @type {string}
   * @memberof Block
   */
  previousblockhash: string;
  /**
   * The hash of the next block
   *
   * @type {string}
   * @memberof Block
   */
  nextblockhash: string;
  flags: string;
  proofhash: string;
  entropybit: number;
  modifier: string;
  tx: TX[];
  signature: string;
  claim: Claim;
  feesCollected: number;
  isSuperBlock: boolean;
  isContract: boolean;
}

export interface BlockWithTX extends Omit<Block, 'tx'> {
  tx: BlockTX[];
}
