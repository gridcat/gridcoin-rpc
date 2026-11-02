export interface MakeSeedPhraseResult {
  seedphrase: string;
  phraseMasterKeyId: string;
  birthday: number;
  warnings: string[];
}

export interface RestoreSeedPhraseResult {
  phraseMasterKeyId: string;
  birthday: number;
  keysDerived?: number;
  rescanRounds?: number;
  warnings: string[];
}

export interface DumpSeedPhraseResult {
  seedphrase: string;
  phraseMasterKeyId: string;
  birthday: number;
  phraseMasterIsActive: boolean;
}

export interface SeedPhraseCoverage {
  covered: number;
  priorHd: number;
  legacy: number;
}

export interface SeedPhraseInfo {
  hasSeedPhrase: boolean;
  activeHdMasterKeyId: string;
  note?: string;
  phraseMasterKeyId?: string;
  birthday?: number;
  phraseMasterIsActive?: boolean;
  blobEncrypted?: boolean;
  keys?: SeedPhraseCoverage;
  unspentBalance?: SeedPhraseCoverage & { other: number };
  defaultKeyCovered?: boolean;
  walletBeacons?: {
    cpid: string;
    keyId: string;
    status: string;
    covered: boolean;
  }[];
  sidestakingEnabled?: boolean;
  sidestakes?: {
    address: string;
    allocationPct: number;
    type: string;
    status: string;
    isMine: boolean;
    covered?: boolean;
  }[];
  warnings?: string[];
}

export interface SweepUncoveredCoinsResult {
  complete: boolean;
  sweptUtxos: number;
  sweptAmount: number;
  fee: number;
  destination: string;
  txid?: string;
  remainingUtxos: number;
  remainingAmount: number;
  pendingUtxos: number;
  pendingAmount: number;
  dryRun: boolean;
}
