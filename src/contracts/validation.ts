import { Address } from '../types';

export interface AddressValidation {
  /**
   * If the address is valid or not. If not, this is the only property returned.
   *
   * @type {boolean}
   * @memberof AddressValidation
   */
  isvalid: boolean;
  /**
   * The gridcoin address validated
   *
   * @type {Address}
   * @memberof AddressValidation
   */
  address?: Address;
  /**
   * If the address is yours or not
   *
   * @type {boolean}
   * @memberof AddressValidation
   */
  ismine?: boolean;
  /**
   * The account associated with the address, "" is the default account
   * @deprecated
   * @type {string}
   * @memberof AddressValidation
   */
  account?: string;
}

export interface PubKeyValidation extends AddressValidation {
  /**
   * if the public key is it’s compressed form
   *
   * @type {boolean}
   * @memberof PubKeyValidation
   */
  iscompressed: boolean;
}
