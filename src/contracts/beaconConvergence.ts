import { CPID } from '../types';

export interface Beacon {
  cpid: CPID;
  verificationCode: string;
  timestamp: string;
}

export interface BeaconConvergence {
  verifiedBeaconsFromScraperGlobal: Beacon[];
  verifiedBeaconsFromLatestConvergence: Beacon[];
  pendingBeaconsFromGetConsensusBeaconList: Beacon[];
}
