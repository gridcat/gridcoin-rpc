/**
 * Authentication Error
 *
 * @export
 * @class AuthenticationError
 * @extends {Error}
 */
export default class AuthenticationError extends Error {
  /**
   * Creates an instance of AuthenticationError.
   * @param {string} [message=Authentication Error] - Error message
   * @memberof AuthenticationError
   */
  constructor(message?: string) {
    if (!message) {
      message = 'Authentication Error'
    }
    super(message)
  }
}
