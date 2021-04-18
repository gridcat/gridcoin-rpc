export interface IPeer {
  /**
   * The IP address and port of the peer
   * host:port
   *
   * @type {string}
   * @memberof IPeer
   */
  addr: string;
  /**
   * The services offered
   *
   * @type {string}
   * @memberof IPeer
   */
  services: string;
  /**
   * The time in seconds since epoch (Jan 1 1970 GMT) of the last send
   *
   * @type {number}
   * @memberof IPeer
   */
  lastsend: number;
  /**
   * The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
   *
   * @type {number}
   * @memberof IPeer
   */
  lastrecv: number;
  /**
   * The connection time in seconds since epoch (Jan 1 1970 GMT)
   *
   * @type {number}
   * @memberof IPeer
   */
  conntime: number;
  /**
   * ping time (if available)
   *
   * @type {number}
   * @memberof IPeer
   */
  pingtime: number;
  /**
   * The peer version, such as 7001
   * @example 7001
   *
   * @type {number}
   * @memberof IPeer
   */
  version: number;
  /**
   * The string version
   * @example /Satoshi:0.8.5/
   *
   * @type {string}
   * @memberof IPeer
   */
  subver: string;
  /**
   * Inbound (true) or Outbound (false)
   *
   * @type {boolean}
   * @memberof IPeer
   */
  inbound: boolean;
  /**
   * The starting height (block) of the peer
   *
   * @type {number}
   * @memberof IPeer
   */
  startingheight: number;
  nTrust: number;
  /**
   * The ban score
   *
   * @type {number}
   * @memberof IPeer
   */
  banscore: number;
  'Neural Network': boolean;
}
