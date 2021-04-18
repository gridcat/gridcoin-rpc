import { ITx } from './tx';

export interface IBlock {
  /**
   * the block hash
   *
   * @type {string}
   * @memberof IBlock
   */
  hash: string;
  /**
   * The number of confirmations, or -1 if the block is not on the main chain
   *
   * @type {Number}
   * @memberof IBlock
   */
  confirmations: number;
  /**
   * The block size
   *
   * @type {number}
   * @memberof IBlock
   */
  size: number;
  /**
   * The block height or index
   *
   * @type {number}
   * @memberof IBlock
   */
  height: number;
  /**
   * The block version
   *
   * @type {number}
   * @memberof IBlock
   */
  version: number;
  /**
   * The merkle root
   *
   * @type {string}
   * @memberof IBlock
   */
  merkleroot: string;
  mint: number;
  MoneySupply: number;
  /**
   * The block time in seconds since epoch (Jan 1 1970 GMT)
   *
   * @type {number}
   * @memberof IBlock
   */
  time: number;
  /**
   * The nonce
   *
   * @type {number}
   * @memberof IBlock
   */
  nonce: number;
  /**
   * The bits
   * @example 1d00ffff
   *
   * @type {string}
   * @memberof IBlock
   */
  bits: string;
  difficulty: number;
  blocktrust: string;
  chaintrust: string;
  /**
   * The hash of the previous block
   *
   * @type {string}
   * @memberof IBlock
   */
  previousblockhash: string;
  /**
   * The hash of the next block
   *
   * @type {string}
   * @memberof IBlock
   */
  nextblockhash: string;
  flags: string;
  proofhash: string;
  entropybit: number;
  modifier: string;
  modifierchecksum: string;
  tx: Array<string | ITx>;
  signature: string;
  CPID: string;
  Magnitude: number;
  LastPaymentTime: string;
  ResearchSubsidy: number;
  ResearchAge: number;
  ResearchMagnitudeUnit: number;
  ResearchAverageMagnitude: number;
  LastPORBlockHash: string;
  Interest: number;
  GRCAddress: string;
  ClientVersion: string;
  CPIDValid: boolean;
  NeuralHash: string;
  IsSuperBlock: number;
  IsContract: number;
}
