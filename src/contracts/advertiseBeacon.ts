import { CPID, PublicKey } from '../types';

export interface AdvertiseBeacon {
  result: 'SUCCESS';
  cpid: CPID;
  publicKey: PublicKey;
  verificationCode: string;
}
