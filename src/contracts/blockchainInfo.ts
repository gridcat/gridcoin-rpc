export interface BlockchainDifficulty {
  current: number;
  target: number;
}

export interface BlockchainInfo {
  /**
   * the current number of blocks processed in the server
   *
   * @type {number}
   * @memberof BlockchainInfo
   */
  blocks: number;
  inSync: boolean;
  moneysupply: number;
  difficulty: BlockchainDifficulty;
  testnet: boolean;
  errors: string;
}
