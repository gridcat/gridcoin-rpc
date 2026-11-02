export type PsgtInput = {
  txid: string;
  vout: number;
};

export type PsgtOutputs = Record<string, number | string>;

export type PsgtFundingOptions = {
  changeAddress?: string;
};

export interface PsgtScript {
  asm: string;
  hex: string;
}

export interface PsgtDerivation {
  pubkey: string;
  masterFingerprint: string;
  path: string;
}

export interface PsgtOutputMetadata {
  redeemScript?: PsgtScript;
  bip32Derivs?: PsgtDerivation[];
  unknown?: Record<string, string>;
}

export interface PsgtInputMetadata extends PsgtOutputMetadata {
  nonWitnessUtxoHex?: string;
  partialSignatures?: Record<string, string>;
  sighash?: number;
  finalScriptSig?: PsgtScript;
}

export interface DecodedPsgt {
  tx: {
    txid: string;
    version: number;
    time: number;
    locktime: number;
    vin: { txid: string; vout: number; sequence: number }[];
    vout: {
      value: number;
      n: number;
      scriptPubKey: PsgtScript & {
        type?: string;
        addresses?: string[];
        reqSigs?: number;
      };
    }[];
  };
  inputs: PsgtInputMetadata[];
  outputs: PsgtOutputMetadata[];
}

export interface PsgtAnalysis {
  inputs: {
    hasUtxo: boolean;
    isFinal: boolean;
    missing?: {
      pubkeys?: string[];
      signatures?: string[];
      redeemscript?: boolean;
    };
    next: string;
  }[];
  estimatedFinalSize?: number;
  fee?: number;
  minRequiredFee?: number;
  next: string;
  error?: string;
}

export interface FinalizedPsgt {
  hex?: string;
  complete: boolean;
}

export interface ProcessedPsgt {
  psgt: string;
  complete: boolean;
}

export interface FundedPsgt {
  psgt: string;
  fee: number;
}
