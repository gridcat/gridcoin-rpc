export interface WalletInfo {
  /**
   * the version of the wallet
   *
   * @type {number}
   * @memberof WalletInfo
   */
  walletversion: number;
  /**
   * the balance of the wallet
   *
   * @type {number}
   * @memberof WalletInfo
   */
  balance: number;
  /**
   * gridcoin from new stakes which have not yet matured
   *
   * @type {number}
   * @memberof WalletInfo
   */
  newmint: number;
  /**
   * the total amount staked
   *
   * @type {number}
   * @memberof WalletInfo
   */
  stake: number;
  /**
   * the oldest key from the keypool which is what’s used to generate addresses
   *
   * @type {number}
   * @memberof WalletInfo
   */
  keypoololdest: number;
  /**
   * how many keys are in the keypool
   *
   * @type {number}
   * @memberof WalletInfo
   */
  keypoolsize: number;
  /**
   * Date until unlocked
   *
   * @type {number}
   * @memberof WalletInfo
   */
  unlockedUntil: number;
  /**
   * If the wallet is currently staking
   *
   * @type {boolean}
   * @memberof WalletInfo
   */
  staking: boolean;
  /**
   * Any errors stopping it from staking
   *
   * @type {string}
   * @memberof WalletInfo
   */
  miningError: string;
}
