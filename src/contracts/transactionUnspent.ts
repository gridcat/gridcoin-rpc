import { Address, TX } from '../types';

export interface TransactionUnspent {
  /**
   * The transaction id
   *
   * @type {TX}
   * @memberof TransactionUnspent
   */
  txid: TX;
  /**
   * the vout value
   *
   * @type {number}
   * @memberof TransactionUnspent
   */
  vout: number;
  /**
   * Address
   *
   * @type {Address}
   * @memberof TransactionUnspent
   */
  address: Address;
  label: string;
  /**
   * the script key
   *
   * @type {number}
   * @memberof TransactionUnspent
   */
  scriptPubKey: string;
  /**
   * the transaction output amount in GRC
   *
   * @type {number}
   * @memberof TransactionUnspent
   */
  amount: number;
  /**
   * The number of confirmations
   *
   * @type {number}
   * @memberof TransactionUnspent
   */
  confirmations: number;
}
