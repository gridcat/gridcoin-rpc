import { TX } from '../types';

export interface ConsolidateUnspentResult {
  result: boolean;
  utxosConsolidated: number;
  outputUtxoValue: string;
  fee: string;
  txid: TX;
}

export interface ConsolidateMsUnspentResult {
  multiSigType: string;
  blockStart: number;
  blockEnd: number;
  lastBlockChecked: number;
  numberOfInputs: number;
  maximumPossibleInputs: number;
  totalGrcIn: string;
  fee: number;
  outputAmount: string;
  estimatedSignedHexSize: number;
  estimatedSignedBinarySize: number;
  rawtx: string;
}
