import { Address, CPID } from '../types';

export interface BeaconReport {
  cpid: CPID;
  address: Address;
  timestamp: number;
  hash: string;
  prevBeaconHash: string;
  status: number;
}
