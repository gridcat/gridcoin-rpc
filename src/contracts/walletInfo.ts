export interface IWalletInfo {
  /**
   * the wallet version
   *
   * @type {number}
   * @memberof IWalletInfo
   */
  walletversion: number;
  balance: number;
  /**
   * the total confirmed balance of the wallet in GRC
   *
   * @type {number}
   * @memberof IWalletInfo
   */
  newmint: number;
  stake: number;
  /**
   * the timestamp (seconds since Unix epoch) of the oldest pre-generated key in the key pool
   *
   * @type {number}
   * @memberof IWalletInfo
   */
  keypoololdest: number;
  /**
   * how many new keys are pre-generated (only counts external keys)
   *
   * @type {number}
   * @memberof IWalletInfo
   */
  keypoolsize: number;
}
