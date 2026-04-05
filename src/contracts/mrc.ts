import { TX } from '../types';

export interface MrcRequestResult {
  outstandingRequest: boolean;
  limit: number;
  mrcsInQueue: number;
  headFee: string;
  payLimitPositionFee: string;
  tailFee: string;
  pos: number;
  txid?: TX;
  mrc: Record<string, unknown>;
}

export interface MrcInfo {
  totalMrcsPaid: number;
  totalMrcsFeeBoosted: number;
  mrcTotalResearchRewards: string;
  mrcTotalFoundationFees: string;
  mrcTotalStakerFees: string;
  mrcTotalNetPaidToResearchers: string;
  mrcTotalCalculatedMinimumFees: string;
  mrcTotalFeeBoost: string;
  mrcDetailsByBlock?: Record<string, unknown>[];
}
