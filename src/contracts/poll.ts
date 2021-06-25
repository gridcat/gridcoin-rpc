import { CPID, TX } from '../types';

export type Sharetype = 'Balance' | 'Magnitude + Balance';
export enum WeightType {
  'Balance' = 1,
  'Magnitude + Balance' = 2,
}
export enum ResponseType {
  'yes/no/abstain' = 1,
  'single-choice' = 2,
  'multiple-choice' = 3,
}

export interface VoteChoice {
  id: number;
  label: string;
}

export interface VoteAnswer {
  id: number;
  weight: number;
}

export interface Poll {
  title: string;
  id: string;
  question: string;
  url: string;
  // @todo: could be one of many
  sharetype: Sharetype;
  weightType: WeightType;
  responseType: number;
  durationDays: number;
  expiration: string;
  timestamp: string;
  choices: VoteChoice[];
  votes: number;
}

export interface Vote {
  amount: number;
  cpid: CPID;
  magnitude: number;
  totalWeight: number;
  answers: VoteAnswer[];
}

export interface VoteResult {
  poll: string;
  voteTxid: TX;
  responses: string[];
}
