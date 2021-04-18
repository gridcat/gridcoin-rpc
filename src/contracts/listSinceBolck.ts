import { ITransactionShort } from './transactionShort';

export interface IListSinceBlock {
  transactions: Array<ITransactionShort>;
  lastBlock: string;
}
