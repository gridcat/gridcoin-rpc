import { Address, TX } from '../types';

export interface ContractBody {
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

export interface Contract {
  version: number;
  type: string;
  action: string;
  body: ContractBody;
}

export interface ScriptSig {
  asm: string;
  hex: string;
}

export interface ScriptPubKey extends ScriptSig {
  /**
   * The type
   * @example pubkeyhash
   *
   * @type {string}
   * @memberof ScriptPubKey
   */
  type: string;
  /**
   * The required sigs
   *
   * @type {number}
   * @memberof ScriptPubKey
   */
  reqSigs?: number;
  /**
   * List of GRC addresses
   *
   * @type {Array<Address>}
   * @memberof ScriptPubKey
   */
  addresses?: Array<Address>;
}

export interface Vin {
  /**
   * The transaction id
   * @example 5c038a9789bf29c2bb79f836dee9fd1d4f0becfce7174d01d72dc3c869bd6ab6
   *
   * @type {TX}
   * @memberof Vin
   */
  txid?: TX;
  /**
   * The output number
   *
   * @type {number}
   * @memberof Vin
   */
  vout?: number;
  /**
   * The script
   *
   * @type {ScriptSig}
   * @memberof Vin
   */
  scriptSig?: ScriptSig;
  /**
   * The script sequence number
   *
   * @type {number}
   * @memberof Vin
   */
  sequence: number;
  coinbase?: string;
}

export interface Vout {
  /**
   * The value in GRC
   *
   * @type {number}
   * @memberof Vout
   */
  value: number;
  /**
   * Index
   *
   * @type {number}
   * @memberof Vout
   */
  n: number;
  scriptPubKey: ScriptPubKey;
}

export interface Transaction {
  /**
   * The transaction id
   *
   * @type {TX}
   * @memberof Transaction
   */
  txid: TX;
  /**
   * The version
   *
   * @type {number}
   * @memberof Transaction
   */
  version: number;
  size: number;
  /**
   * Transaction timestamp
   *
   * @type {number}
   * @memberof Transaction
   */
  time: number;
  /**
   * The lock time
   *
   * @type {number}
   * @memberof Transaction
   */
  locktime: number;
  hashboinc: string;
  contracts: Contract[];
  vin: Vin[];
  vout: Vout[];
  blockhash: string;
  confirmations: number;
}

export interface DetailedRawTransaction extends Transaction {
  hex: string;
}
