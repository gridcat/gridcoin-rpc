export interface IWalletInfo {
  /**
   * the version of the wallet
   *
   * @type {number}
   * @memberof IWalletInfo
   */
  walletversion: number;
  /**
   * the balance of the wallet
   *
   * @type {number}
   * @memberof IWalletInfo
   */
  balance: number;
  /**
   * gridcoin from new stakes which have not yet matured
   *
   * @type {number}
   * @memberof IWalletInfo
   */
  newmint: number;
  /**
   * the total amount staked
   *
   * @type {number}
   * @memberof IWalletInfo
   */
  stake: number;
  /**
   * the oldest key from the keypool which is what’s used to generate addresses
   *
   * @type {number}
   * @memberof IWalletInfo
   */
  keypoololdest: number;
  /**
   * how many keys are in the keypool
   *
   * @type {number}
   * @memberof IWalletInfo
   */
  keypoolsize: number;
  /**
   * If the wallet is currently staking
   *
   * @type {boolean}
   * @memberof IWalletInfo
   */
  staking: boolean;
  /**
   * Any errors stopping it from staking
   *
   * @type {string}
   * @memberof IWalletInfo
   */
  miningError: string;
}
