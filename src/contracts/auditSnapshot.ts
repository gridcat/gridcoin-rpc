interface Audit {
  boundary: string;
  lowTime: number;
  highHeight: number;
  highTime: number;
  magnitudeAtLow: number;
  accrual: {
    period: number;
    accumulated: number;
    claimed: number;
  }
}

interface BeaconTimestamp {
  ctxHash: string;
  timestamp: number;
}

export interface AuditSnapshot {
  cpid: string;
  accrualAccountExists: boolean;
  latestBeaconTimestamp: BeaconTimestamp;
  originalBeaconTimestamp: BeaconTimestamp;
  renewals: number;
  accrualByAudit: number;
  accrualByGetAccrual: number;
  newbieCorrection: number;
  accrualLastPeriod: number;
}

export interface AuditSnapshotDetailed extends AuditSnapshot {
  beaconChain: BeaconTimestamp[];
  audit: Audit[];
}
