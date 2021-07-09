import { CPID } from '../types';

interface General {
  blocks: number;
  firstHeight: number;
  lastHeight: number;
  firstTime: string;
  lastTime: string;
  timeSpanHour: number;
  superFirstTime: string;
  superLastTime: string;
  superTimeSpanHour: number;
  minBlocksizek: number;
  maxBlocksizek: number;
  minPosdiff: number;
  maxPosdiff: number;
}

interface Counts {
  block: number;
  emptyBlock: number;
  transaction: number;
  proofOfStake: number;
  boincreward: number;
  super: number;
}

interface Totals {
  block: number;
  research: number;
  interest: number;
  mint: number;
  fees: number;
  blocksizek: number;
  posdiff: number;
}

interface Averages {
  research: number;
  interest: number;
  mint: number;
  fees: number;
  spacingSec: number;
  blockPerDay: number;
  transaction: number;
  blocksizek: number;
  posdiff: number;
  superSpacingHrs: number;
}

export interface BlockStats {
  general: General;
  counts: Counts;
  totals: Totals;
  averages: Averages;
  versions: {
    [key: string]: number;
  };
  cpids: {
    [key: string]: number;
  },
  orgs: {
    [key: string]: number;
  }
}
