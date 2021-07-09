export interface NetTotals {
  /**
   * Total bytes received
   *
   * @type {number}
   * @memberof NetTotals
   */
  totalbytesrecv: number;
  /**
   * Total bytes sent
   *
   * @type {number}
   * @memberof NetTotals
   */
  totalbytessent: number;
  /**
   * Current UNIX time in milliseconds
   *
   * @type {number}
   * @memberof NetTotals
   */
  timemillis: number;
}
