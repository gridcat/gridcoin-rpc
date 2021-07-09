import { CPID } from '../types';

export interface LocalProject {
  name: string;
  url: string;
  cpid: CPID;
  team: string;
  eligible: boolean;
  whitelisted: boolean;
  error?: string;
}
