export default interface INetworkInfo {
  version: string;
  minor_version: number;
  /**
   * the protocol version
   *
   * @type {number}
   * @memberof INetworkInfo
   */
  protocolversion: number;
  /**
   * the time offset
   *
   * @type {number}
   * @memberof INetworkInfo
   */
  timeoffset: number;
  /**
   * the number of connections
   *
   * @type {number}
   * @memberof INetworkInfo
   */
  connections: number;
  paytxfee: number;
  mininput: number;
  /**
   * the proxy that is used for this network, or empty if none
   *
   * @type {string}
   * @memberof INetworkInfo
   */
  proxy: string;
  ip: string;
  errors: string;
}
