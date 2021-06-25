import { Block, CPID } from '../types';

export interface Magnitude {
  cpid: CPID;
  'magnitude (lastSuperblock)': number;
  currentMagnitudeUnit: number;
  firstPaymentTime: string;
  firstBlockPaid: Block;
  firstHeightPaid: number;
  lastPaymentTime: string;
  lastBlockPaid: Block;
  lastHeightPaid: number;
  accrualDays: number;
  owed: number;
  'owed (raw)': number;
  'owed (lastSuperblock)': number;
  'expectedEarnings (14Days)': number;
  'expectedEarnings (daily)': number;
  lifetimeResearchPaid: number;
  lifetimeMagnitudeSum: number;
  lifetimeMagnitudeAverage: number;
  lifetimePayments: number;
  lifetimePaymentsPerDay: number;
  lifetimePaymentsPerDayLimit: number;
}
