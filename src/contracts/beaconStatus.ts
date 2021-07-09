import { Address, CPID, PublicKey } from '../types';

export interface BeaconStatus {
  cpid: CPID;
  /**
   * if it’s currently active and not expired
   *
   * @type {boolean}
   * @memberof BeaconStatus
   */
  active: boolean;
  pending: boolean;
  /**
   * if the beacon is expired
   */
  expired: boolean;
  /**
   * if the beacon is old enough to be renewed
   *
   * @type {boolean}
   * @memberof BeaconStatus
   */
  renewable: boolean;
  /**
   * when the beacon was advertised
   * @example "11-26-2020 06:45:54"
   *
   * @type {string}
   * @memberof BeaconStatus
   */
  timestamp: string;
  /**
   * the address that send the beacon transaction
   *
   * @type {Address}
   * @memberof BeaconStatus
   */
  address: Address;
  /**
   * the public key of the beacon
   *
   * @type {PublicKey}
   * @memberof BeaconStatus
   */
  publicKey: PublicKey;
  privateKeyAvailable: boolean;
  /**
   * magnitude corresponding with the beacon
   *
   * @type {number}
   * @memberof BeaconStatus
   */
  magnitude: number;
  verificationCode: string;
  /**
   * if this is about your beacon or not
   *
   * @type {boolean}
   * @memberof BeaconStatus
   */
  isMine: boolean;
  // pending: Array<any>;
}

export interface BeaconStatusCollection {
  active: BeaconStatus[];
  pending: BeaconStatus[];
}
