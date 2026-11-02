/** Funding options use the daemon's request key spelling. */
export type FundRawTransactionOptions = {
  changeAddress?: string;
  changePosition?: number;
  includeWatching?: boolean;
};

export interface FundRawTransactionResult {
  hex: string;
  fee: number;
  changepos: number;
}

export type PreviousTransactionOutput = {
  txid: string;
  vout: number;
  scriptPubKey: string;
};

export interface SignedRawTransactionResult {
  hex: string;
  complete: boolean;
}

export interface SplitUnspentResult {
  result: boolean;
  utxosSwept: number;
  piecesCreated?: number;
  pieceValue?: number;
  changeValue?: number;
  fee?: number;
  txid?: string;
}

export interface CancelUnbroadcastTransactionResult {
  txid: string;
  walletAbandoned: boolean;
  inputsReleased: number;
}
