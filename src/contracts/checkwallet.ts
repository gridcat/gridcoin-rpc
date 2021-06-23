export interface ICheckWallet {
  walletCheckPassed: boolean;
  mismatchedSpentCoins: number;
  amountInQuestion: number;
}
