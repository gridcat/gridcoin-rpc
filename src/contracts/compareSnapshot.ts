interface Summary {
  summary: {
    activeAccounts: number;
    legacyTotal: number;
    legacyAverage: number;
    snapshotTotal: number;
    snapshotAverage: number;
  }
}

interface Compare {
  [key: string]: {
    legacy: number;
    snapshot: number;
  }
}

export type CompareSnapshotAccural = Summary & Compare;
