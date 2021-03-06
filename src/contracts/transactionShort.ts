import { Address, TX } from '../types';

export type TransactionCategory = 'send' | 'receive' | 'move';

export interface TransactionShort {
  involvesWatchonly: boolean;
  /**
   * The account name associated with the transaction.
   * It will be "" for the default account.
   * @deprecated
   * @type {string}
   * @memberof TransactionShort
   */
  account: string;
  /**
   * Address
   *
   * @type {Address}
   * @memberof TransactionShort
   */
  address: Address;
  /**
   * The transaction category. 'move' is a local (off blockchain) transaction between accounts,
   * and not associated with an address, transaction id or block.
   * 'send' and 'receive' transactions are associated with an address,
   * transaction id and block details
   *
   * @type {TransactionCategory}
   * @memberof TransactionShort
   */
  category: TransactionCategory;
  /**
   * The amount of the fee in GRC. This is negative and only available
   * for the 'send' category of transactions.
   *
   * @type {number}
   * @memberof TransactionShort
   */
  fee: number;
  /**
   * The amount in GRC.
   * This is negative for the 'send' category, and for the 'move' category for moves outbound.
   * It is positive for the 'receive' category, and for the 'move' category for inbound funds.
   *
   * @type {number}
   * @memberof TransactionShort
   */
  amount: number;
  /**
   * The number of confirmations for the transaction.
   * Available for 'send' and 'receive' category of transactions.
   * Negative confirmations indicate the transaction conflicts with the block chain
   *
   * @type {number}
   * @memberof TransactionShort
   */
  confirmations: number;
  /**
   * The block hash containing the transaction.
   * Available for 'send' and 'receive' category of transactions.
   *
   * @type {string}
   * @memberof TransactionShort
   */
  blockhash: string;
  /**
   * The index of the transaction in the block that includes it.
   * Available for 'send' and 'receive' category of transactions.
   *
   * @type {number}
   * @memberof TransactionShort
   */
  blockindex: number;
  /**
   * The block time in seconds since epoch (1 Jan 1970 GMT).
   *
   * @type {number}
   * @memberof TransactionShort
   */
  blocktime: number;
  /**
   * The transaction id. Available for 'send' and 'receive' category of transactions.
   *
   * @type {TX}
   * @memberof TransactionShort
   */
  txid: TX;
  /**
   * The transaction time in seconds since epoch (midnight Jan 1 1970 GMT).
   *
   * @type {number}
   * @memberof TransactionShort
   */
  time: number;
  /**
   * The time received in seconds since epoch (midnight Jan 1 1970 GMT).
   * Available for 'send' and 'receive' category of transactions.
   *
   * @type {number}
   * @memberof TransactionShort
   */
  timereceived: number;
  /**
   * Ids of transactions, including equivalent clones, that re-spend a txid input.
   *
   * @type {TX[]}
   * @memberof TransactionShort
   */
  walletconflicts: TX[];
  /**
   * Ids of transactions, NOT equivalent clones, that re-spend a txid input. "Double-spends."
   *
   * @type {TX[]}
   * @memberof TransactionShort
   */
  respendsobserved: TX[];
  /**
   * If a comment is associated with the transaction.
   *
   * @type {string}
   * @memberof TransactionShort
   */
  comment?: string;
  /**
   * For the 'move' category of transactions, the account the funds came from
   * for receiving funds, positive amounts), or went to
   * (for sending funds, negative amounts)
   *
   * @type {string}
   * @memberof TransactionShort
   */
  otheraccount?: string;
}
