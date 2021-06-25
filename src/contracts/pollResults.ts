export interface PollResultResponse {
  choice: string;
  id: number;
  weight: number;
  votes: number;
}

export interface PollResults {
  pollId: string;
  votes: number;
  invalidVotes: number;
  totalWeight: number;
  topChoiceId: number;
  topChoice: string;
  responses: PollResultResponse[];
}
