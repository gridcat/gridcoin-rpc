export interface RawProjectStatus {
  version: number;
  displayName: string;
  url: string;
  status: 'Active' | 'Manually Greylisted' | 'Active by Greylist Override' | 'Deleted';
  gdprControls?: boolean;
  requiresExternalAdapter?: boolean;
  time: string;
  currentProjectEntryTxHash: string;
  /** The daemon returns the string "null" for the first entry. */
  previousProjectEntryTxHash: string;
}

export type RawProjectStatuses = Record<string, RawProjectStatus>;
