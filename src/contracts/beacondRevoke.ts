import { CPID, PublicKey } from '../types';

export interface BeaconRevoke {
  result: 'SUCCESS';
  cpid: CPID;
  publicKey: PublicKey;
}
