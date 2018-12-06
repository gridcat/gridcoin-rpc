import ITransactionShort from './transactionShort'

export default interface IListSinceBlock {
  transactions: Array<ITransactionShort>
  lastBlock: string
}
