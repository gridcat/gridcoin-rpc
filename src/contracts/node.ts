export interface INodeAddress {
  /**
   * Server IP and port we're connected to
   *
   * @type {string}
   * @memberof INodeAddress
   */
  address: string;
  /**
   * connection, inbound or outbound
   *
   * @type {string}
   * @memberof INodeAddress
   */
  connected: string;
}

export default interface INode {
  /**
   * The node IP address or name (as provided to addnode)
   *
   * @type {string}
   * @memberof INode
   */
  addednode: string;
  /**
   * If connected
   *
   * @type {boolean}
   * @memberof INode
   */
  connected: boolean;
  /**
   * Only when connected = true
   *
   * @type {Array<INodeAddress>}
   * @memberof INode
   */
  addresses: Array<INodeAddress>;
}
