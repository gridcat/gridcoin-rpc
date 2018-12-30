export default interface INetTotals {
  /**
   * Total bytes received
   *
   * @type {number}
   * @memberof INetTotals
   */
  totalbytesrecv: number;
  /**
   * Total bytes sent
   *
   * @type {number}
   * @memberof INetTotals
   */
  totalbytessent: number;
  /**
   * Current UNIX time in milliseconds
   *
   * @type {number}
   * @memberof INetTotals
   */
  timemillis: number;
}
