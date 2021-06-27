export interface WalletSuccessStatus {
  walletCheckPassed: boolean;
}
export interface WalletFailStatus {
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

// CheckWallet
