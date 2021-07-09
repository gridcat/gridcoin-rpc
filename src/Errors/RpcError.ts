/**
 * RPC Error
 *
 * @export
 * @class RPCError
 * @extends {Error}
 */
export class RPCError extends Error {
  public code: number;

  /**
   *Creates an instance of RPCError.
   * @param {string} [message='RPC Error'] - Error message
   * @param {number} [code=0] - Error cpde
   * @memberof RPCError
   */
  constructor(message = 'RPC Error', code = 0) {
    super(message);
    this.code = code;
  }
}
