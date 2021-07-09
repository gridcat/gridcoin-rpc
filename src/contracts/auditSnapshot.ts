import { CPID } from '../types';

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
  cpid: CPID;
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

interface AccuralMismatchDetails {
  cpid: CPID;
  match: {
    cpid: CPID;
    accrualAccountExists: true,
    latestBeaconTimestamp: BeaconTimestamp;
    originalBeaconTimestamp: BeaconTimestamp;
    renewals: number;
    accrualByAudit: number;
    accrualByGetAccrual: number;
    newbieCorrection: number;
    accrualLastPeriod: number;
  }
}

export interface AuditSnapshotAccurals {
  numberOfCpids: number;
  numberOfMatches: number;
  numberOfMismatches: number;
  numberOfMismatchesLastPeriodOnly: number;
  numberAccrualAccountsNotPresent: number;
  numberNotPresent: number;
  accrualMismatchDetails: AccuralMismatchDetails[];
}
