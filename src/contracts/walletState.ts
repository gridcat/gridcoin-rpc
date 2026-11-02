export interface WalletTransactionState {
  txid: string;
  depth: number;
  isConfirmed: boolean;
  isTrusted: boolean;
}

export interface WalletState {
  totalTransactions: number;
  stateCounts: {
    mempool: number;
    confirmed: number;
    inactive: number;
    unrecognized: number;
  };
  balanceCalculation: {
    transactionsCountedInBalance: number;
    calculatedBalance: number;
    getbalanceResult: number;
  };
  warningInactive?: string;
  warningUnrecognized?: string;
  inactiveTransactions?: (WalletTransactionState & {
    abandoned?: boolean;
    hashBlockLegacy: string;
    amount: number;
    time: number;
  })[];
  unrecognizedTransactions?: (WalletTransactionState & {
    legacyBlockHash?: string;
    legacyIndex?: number;
  })[];
  allTransactions?: (WalletTransactionState & {
    state: string;
    credit: number;
    countedInBalance: boolean;
  })[];
}
