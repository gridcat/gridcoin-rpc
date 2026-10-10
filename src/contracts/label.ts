/**
 * Purpose of an address book entry. `unknown` marks entries that predate
 * the label system and haven't been migrated yet (@see migratelabels)
 */
export type AddressPurpose = 'receive' | 'send' | 'unknown';

export interface LabelAddresses {
  [address: string]: {
    purpose: AddressPurpose;
  };
}

export interface ReceivedByLabel {
  involvesWatchonly?: boolean;
  amount: number;
  confirmations: number;
  label: string;
}

export interface MigrateLabelsResult {
  examined: number;
  updated: number;
}
