import { TransactionShort } from './transactionShort';

export interface ListSinceBlock {
  transactions: TransactionShort[];
  lastBlock: string;
}
