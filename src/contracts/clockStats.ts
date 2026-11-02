export interface ClockStats {
  timeQuorum: boolean;
  peerMedian: number;
  offset: number;
  blocksSeen: number;
  leadOver16: number;
  leadOver32: number;
  leadOver48: number;
  leadOver128: number;
}
