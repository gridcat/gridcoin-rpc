export default interface ITransactionUnspent {
  /**
   * The transaction id
   *
   * @type {string}
   * @memberof ITransactionShort
   */
  txid: string;
  /**
   * the vout value
   *
   * @type {number}
   * @memberof ITransactionUnspent
   */
  vout: number;
  /**
   * Address
   *
   * @type {string}
   * @memberof ITransactionShort
   */
  address: string;
  label: string;
  /**
   * the script key
   *
   * @type {number}
   * @memberof ITransactionUnspent
   */
  scriptPubKey: string;
  /**
   * the transaction output amount in GRC
   *
   * @type {number}
   * @memberof ITransactionUnspent
   */
  amount: number;
  /**
   * The number of confirmations
   *
   * @type {number}
   * @memberof ITransactionUnspent
   */
  confirmations: number;
}
