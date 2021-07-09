import { Address } from '../types';

export interface Script {
  /**
   * Decoded script asm
   *
   * @type {string}
   * @memberof Script
   */
  asm: string;
  reqSigs?: number;
  type: string;
  p2sh: string;
  addresses: Address[];
}
