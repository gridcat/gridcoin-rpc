export default interface ITransactionShort {
  involvesWatchonly: boolean;
  /**
   * The account name associated with the transaction.
   * It will be "" for the default account.
   * @deprecated
   * @type {string}
   * @memberof ITransactionShort
   */
  account: string;
  /**
   * Address
   *
   * @type {string}
   * @memberof ITransactionShort
   */
  address: string;
  /**
   * The transaction category. 'move' is a local (off blockchain) transaction between accounts,
   * and not associated with an address, transaction id or block.
   * 'send' and 'receive' transactions are associated with an address, transaction id and block details
   *
   * @type {string}
   * @memberof ITransactionShort
   */
  category: string;
  /**
   * The amount of the fee in GRC. This is negative and only available for the 'send' category of transactions.
   *
   * @type {number}
   * @memberof ITransactionShort
   */
  fee: number;
  /**
   * The amount in GRC.
   * This is negative for the 'send' category, and for the 'move' category for moves outbound.
   * It is positive for the 'receive' category, and for the 'move' category for inbound funds.
   *
   * @type {number}
   * @memberof ITransactionShort
   */
  amount: number;
  /**
   * The number of confirmations for the transaction.
   * Available for 'send' and 'receive' category of transactions.
   * Negative confirmations indicate the transaction conflicts with the block chain
   *
   * @type {number}
   * @memberof ITransactionShort
   */
  confirmations: number;
  /**
   * The block hash containing the transaction. Available for 'send' and 'receive' category of transactions.
   *
   * @type {string}
   * @memberof ITransactionShort
   */
  blockhash: string;
  /**
   * The index of the transaction in the block that includes it.
   * Available for 'send' and 'receive' category of transactions.
   *
   * @type {number}
   * @memberof ITransactionShort
   */
  blockindex: number;
  /**
   * The block time in seconds since epoch (1 Jan 1970 GMT).
   *
   * @type {number}
   * @memberof ITransactionShort
   */
  blocktime: number;
  /**
   * The transaction id. Available for 'send' and 'receive' category of transactions.
   *
   * @type {string}
   * @memberof ITransactionShort
   */
  txid: string;
  /**
   * The transaction time in seconds since epoch (midnight Jan 1 1970 GMT).
   *
   * @type {number}
   * @memberof ITransactionShort
   */
  time: number;
  /**
   * The time received in seconds since epoch (midnight Jan 1 1970 GMT). Available for 'send' and 'receive' category of transactions.
   *
   * @type {number}
   * @memberof ITransactionShort
   */
  timereceived: number;
}
