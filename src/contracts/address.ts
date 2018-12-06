export default interface IAddress {
  /**
   * If the address is valid or not. If not, this is the only property returned.
   *
   * @type {boolean}
   * @memberof IAddress
   */
  isvalid: boolean
  /**
   * The gridcoin address validated
   *
   * @type {string}
   * @memberof IAddress
   */
  address?: string
  /**
   * If the address is yours or not
   *
   * @type {boolean}
   * @memberof IAddress
   */
  ismine?: boolean
  /**
   * If the address is P2SH or P2WSH. Not included for unknown witness types.
   *
   * @type {boolean}
   * @memberof IAddress
   */
  isscript?: boolean
  /**
   * The hex value of the raw public key, for single-key addresses (possibly embedded in P2SH or P2WSH)
   *
   * @type {string}
   * @memberof IAddress
   */
  pubkey?: string
  /**
   * If the address is compressed
   *
   * @type {boolean}
   * @memberof IAddress
   */
  iscompressed?: boolean
  /**
   * The account associated with the address, "" is the default account
   * @deprecated
   * @type {string}
   * @memberof IAddress
   */
  account?: string
}
