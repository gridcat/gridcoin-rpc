export interface MaintainBackupsResult {
  maintainBackupFileRetentionSuccess: boolean;
  numberOfFilesRemoved: number;
  filesRemoved: string[];
}
