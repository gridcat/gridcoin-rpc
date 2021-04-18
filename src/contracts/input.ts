export interface IInput {
  /**
   * The transaction id
   *
   * @type {string}
   * @memberof IInput
   */
  txid: string;
  /**
   * The output number
   *
   * @type {number}
   * @memberof IInput
   */
  vout: number;
  /**
   * The sequence number
   *
   * @type {number}
   * @memberof IInput
   */
  sequence?: number;
}
