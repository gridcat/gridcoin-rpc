export interface MempoolInfo {
  size: number;
  bytes: number;
  usage: number;
  maxmempool: number;
  mrcCount: number;
  beaconCount: number;
  mandatorySidestakeCount: number;
  unbroadcastcount: number;
}

export interface MempoolEntry {
  size: number;
  fee: number;
  feerate: number;
  time: number;
  height: number;
  contractTypes: string[];
  mrcCpid?: string;
  mrcFee?: number;
  beaconCpid?: string;
  unbroadcast: boolean;
}

export interface MempoolAcceptResult {
  txid: string;
  allowed: boolean;
  rejectReason?: string;
  vsize?: number;
  fees?: { base: number };
}
