import { Address, TX } from '../types';

export interface Receivement {
  /**
   * Only returned if imported addresses were involved in transaction
   *
   * @type {boolean}
   * @memberof Receivement
   */
   involvesWatchonly: boolean;
  /**
   * The receiving address
   *
   * @type {Address}
   * @memberof Receivement
   */
  address: Address;
  /**
   * The account of the receiving address. The default account is "".
   *
   * @deprecated
   * @type {string}
   * @memberof Receivement
   */
  account: string;
  /**
   * The total amount in GRC received by the address
   *
   * @type {number}
   * @memberof Receivement
   */
  amount: number;
  /**
   * The number of confirmations of the most recent transaction included
   *
   * @type {number}
   * @memberof Receivement
   */
  confirmations: number;
  txids: TX[];
}
