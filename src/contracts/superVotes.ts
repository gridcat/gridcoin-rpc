import { CPID } from '../types';

interface SuperBlockInfo {
  blockHash: string;
  height: number;
  quorumHash: string;
  packedSize: number;
  contractHash: string;
}

interface VotesJSON1 {
  quorumHash: string;
  weight: number;
  cpid: CPID;
  organization: string;
  cversion: string;
}

interface VotesJSON2 extends VotesJSON1 {
  difficulty: number;
  delay: number;
  hash: string;
  stakeout: number;
}

export interface SuperVotesModeText {
  info: SuperBlockInfo;
  votes: {
    [key: string]: string;
  }
}

export interface SuperVotesModeJson1 {
  info: SuperBlockInfo;
  votes: {
    [key: string]: VotesJSON1;
  }
}

export interface SuperVotesModeJson2 {
  info: SuperBlockInfo;
  votes: {
    [key: string]: VotesJSON2;
  }
}
