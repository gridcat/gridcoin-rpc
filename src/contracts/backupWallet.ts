export interface BackupWallet {
  backupWalletSuccess: boolean;
  backupConfigSuccess: boolean;
  maintainBackupFileRetentionSuccess: boolean;
  numberOfFilesRemoved: number;
  filesRemoved: string[];
}
