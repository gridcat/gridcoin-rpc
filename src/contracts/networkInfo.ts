export interface NetworkInfo {
  version: string;
  minorVersion: number;
  /**
   * the protocol version
   *
   * @type {number}
   * @memberof NetworkInfo
   */
  protocolversion: number;
  /**
   * the time offset
   *
   * @type {number}
   * @memberof NetworkInfo
   */
  timeoffset: number;
  /**
   * the number of connections
   *
   * @type {number}
   * @memberof NetworkInfo
   */
  connections: number;
  paytxfee: number;
  mininput: number;
  /**
   * the proxy that is used for this network, or empty if none
   *
   * @type {string}
   * @memberof NetworkInfo
   */
  proxy: string;
  ip: string;
  localaddresses: string[];
  errors: string;
}
