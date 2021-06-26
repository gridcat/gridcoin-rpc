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

interface OutputAddress {
  [key: string]: number;
}

interface OutputData {
  data: string;
}

export type Output = OutputAddress & OutputData;
