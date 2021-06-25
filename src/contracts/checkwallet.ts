export interface CheckWallet {
  walletCheckPassed: boolean;
  /**
   * The number of transactions missed
   *
   * @type {number}
   * @memberof CheckWallet
   */
  mismatchedSpentCoins: number;
  /**
   * The amount involved in those transactions (absolute value, does not subtract)
   *
   * @type {number}
   * @memberof CheckWallet
   */
  amountInQuestion: number;
}
