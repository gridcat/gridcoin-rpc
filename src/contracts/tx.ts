/**
 * @todo define vin, vout
 */
export default interface ITx {
  txid: string
  version: number
  time: number
  locktime: number
  hashboinc: string
  vin: Array<Object>
  vout: Array<Object>
}
