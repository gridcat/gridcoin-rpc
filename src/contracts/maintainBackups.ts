export interface MaintainBackupsResult {
  backupWalletSuccess: boolean;
  backupConfigSuccess: boolean;
  maintainBackupFileRetentionSuccess: boolean;
  numberOfFilesRemoved: number;
  filesRemoved: string[];
}
