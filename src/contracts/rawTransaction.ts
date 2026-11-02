export interface RawTransaction {
  /**
   * The transaction id
   *
   * @type {string}
   * @memberof RawTransaction
   */
  txid: string;
  /**
   * The output number
   *
   * @type {number}
   * @memberof RawTransaction
   */
  vout: number;
}

/**
 * Transaction outputs: each address maps to a GRC amount. The optional `data`
 * key holds hex for an OP_RETURN output.
 */
export type Output = Record<string, number | string>;
