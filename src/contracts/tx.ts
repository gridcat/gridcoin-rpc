/**
 * @todo define vin, vout
 */
export interface ITx {
  txid: string;
  version: number;
  time: number;
  locktime: number;
  hashboinc: string;
  vin: Array<any>;
  vout: Array<any>;
}
