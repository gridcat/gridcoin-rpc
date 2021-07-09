import { TX } from '../types';

export type SigHashType =
  'ALL'
  | 'NONE'
  | 'SINGLE'
  | 'ALL|ANYONECANPAY'
  | 'NONE|ANYONECANPAY'
  | 'SINGLE|ANYONECANPAY'

export interface TransactionDependencies {
  txid: TX;
  vout: number;
  scriptPubKey: string;
}

export interface TransactionSigned {
  /**
   * raw transaction with signature(s) (hex-encoded string)
   *
   * @type {string}
   * @memberof TransactionSigned
   */
  hex: string;
  /**
   * 1 if transaction has a complete set of signature (0 if not)
   *
   * @type {(0 | 1)}
   * @memberof TransactionSigned
   */
  complete: 0 | 1;
}
