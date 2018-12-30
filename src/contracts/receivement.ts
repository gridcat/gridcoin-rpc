export default interface IReceivement {
  /**
   * Only returned if imported addresses were involved in transaction
   *
   * @type {boolean}
   * @memberof IReceivement
   */
  involvesWatchonly: boolean;
  /**
   * The receiving address
   *
   * @type {string}
   * @memberof IReceivement
   */
  address: string;
  /**
   * The account of the receiving address. The default account is "".
   *
   * @deprecated
   * @type {string}
   * @memberof IReceivement
   */
  account: string;
  /**
   * The total amount in GRC received by the address
   *
   * @type {number}
   * @memberof IReceivement
   */
  amount: number;
  /**
   * The number of confirmations of the most recent transaction included
   *
   * @type {number}
   * @memberof IReceivement
   */
  confirmations: number;
  tx_count: number;
  txids: Object;
}
