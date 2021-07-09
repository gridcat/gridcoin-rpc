export interface Peer {
  id: number;
  /**
   * The IP address and port of the peer
   * host:port
   *
   * @type {string}
   * @memberof Peer
   */
  addr: string;
  addrlocal: string;
  /**
   * The services offered
   *
   * @type {string}
   * @memberof Peer
   */
  services: string;
  /**
   * The time in seconds since epoch (Jan 1 1970 GMT) of the last send
   *
   * @type {number}
   * @memberof Peer
   */
  lastsend: number;
  /**
   * The time in seconds since epoch (Jan 1 1970 GMT) of the last receive
   *
   * @type {number}
   * @memberof Peer
   */
  lastrecv: number;
  bytessent: number;
  bytesrecv: number;
  /**
   * The connection time in seconds since epoch (Jan 1 1970 GMT)
   *
   * @type {number}
   * @memberof Peer
   */
  conntime: number;
  timeoffset: number;
  /**
   * ping time (if available)
   *
   * @type {number}
   * @memberof Peer
   */
  pingtime: number;
  minping: number;
  /**
   * The peer version, such as 7001
   * @example 7001
   *
   * @type {number}
   * @memberof Peer
   */
  version: number;
  /**
   * The string version
   * @example /Satoshi:0.8.5/
   *
   * @type {string}
   * @memberof Peer
   */
  subver: string;
  /**
   * Inbound (true) or Outbound (false)
   *
   * @type {boolean}
   * @memberof Peer
   */
  inbound: boolean;
  /**
   * The starting height (block) of the peer
   *
   * @type {number}
   * @memberof Peer
   */
  startingheight: number;
  nTrust: number;
  /**
   * The ban score
   *
   * @type {number}
   * @memberof Peer
   */
  banscore: number;
}
