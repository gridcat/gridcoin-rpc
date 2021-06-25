import { Address, CPID, PublicKey } from '../types';

export interface BeaconStatus {
  cpid: CPID;
  /**
   * if it’s currently active and not expired
   *
   * @type {boolean}
   * @memberof IBeaconStatus
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
   * @memberof IBeaconStatus
   */
  renewable: boolean;
  /**
   * when the beacon was advertised
   * @example "11-26-2020 06:45:54"
   *
   * @type {string}
   * @memberof IBeaconStatus
   */
  timestamp: string;
  /**
   * the address that send the beacon transaction
   *
   * @type {Address}
   * @memberof IBeaconStatus
   */
  address: Address;
  /**
   * the public key of the beacon
   *
   * @type {PublicKey}
   * @memberof IBeaconStatus
   */
  publicKey: PublicKey;
  privateKeyAvailable: boolean;
  /**
   * magnitude corresponding with the beacon
   *
   * @type {number}
   * @memberof IBeaconStatus
   */
  magnitude: number;
  verificationCode: string;
  /**
   * if this is about your beacon or not
   *
   * @type {boolean}
   * @memberof IBeaconStatus
   */
  isMine: boolean;
  // pending: Array<any>;
}

export interface BeaconStatusCollection {
  active: BeaconStatus[];
  pending: BeaconStatus[];
}
