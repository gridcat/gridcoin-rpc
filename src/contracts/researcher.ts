import { CPID } from '../types';

export interface ResearcherDetails {
  cpid: CPID;
  accrualAsOfLastSuperblock: number;
  currentAccrual: number;
}

export interface ResearcherAccounts {
  numberOfAccounts: number;
  details: ResearcherDetails[];
}
