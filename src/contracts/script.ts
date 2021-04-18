export interface IScript {
  /**
   * Decoded script asm
   *
   * @type {string}
   * @memberof IScript
   */
  asm: string;
  type: string;
  p2sh: string;
}
