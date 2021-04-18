export interface IScriptSig {
  asm: string;
  hex: string;
}

export interface IScriptPubKey extends IScriptSig {
  /**
   * The type
   * @example pubkeyhash
   *
   * @type {string}
   * @memberof IScriptPubKey
   */
  type: string;
  /**
   * The required sigs
   *
   * @type {number}
   * @memberof IScriptPubKey
   */
  reqSigs?: number;
  /**
   * List of GRC addresses
   *
   * @type {Array<string>}
   * @memberof IScriptPubKey
   */
  addresses?: Array<string>;
}

export interface IVin {
  /**
   * The transaction id
   * @example 5c038a9789bf29c2bb79f836dee9fd1d4f0becfce7174d01d72dc3c869bd6ab6
   *
   * @type {string}
   * @memberof IVin
   */
  txid: string;
  /**
   * The output number
   *
   * @type {number}
   * @memberof IVin
   */
  vout: number;
  /**
   * The script
   *
   * @type {IScript}
   * @memberof IVin
   */
  scriptSig: IScriptSig;
  /**
   * The script sequence number
   *
   * @type {number}
   * @memberof IVin
   */
  sequence: number;
}

export interface IVout {
  /**
   * The value in GRC
   *
   * @type {number}
   * @memberof IVout
   */
  value: number;
  /**
   * Index
   *
   * @type {number}
   * @memberof IVout
   */
  n: number;
  scriptPubKey: IScriptPubKey;
}

export interface ITransaction {
  /**
   * The transaction id
   *
   * @type {string}
   * @memberof ITransaction
   */
  txid: string;
  /**
   * The version
   *
   * @type {number}
   * @memberof ITransaction
   */
  version: number;
  time: number;
  /**
   * The lock time
   *
   * @type {number}
   * @memberof ITransaction
   */
  locktime: number;
  hashboinc: string;
  vin: Array<IVin>;
  vout: Array<IVout>;
}
