import {
  Poll,
  Vote,
  VoteResult,
  WeightType,
} from '../contracts/poll';
import { PollResults } from '../contracts/pollResults';
import { VotingClaim } from '../contracts/votingClaim';
import { RPCBase } from '../RPCBase';

export abstract class Voting extends RPCBase {
  /**
   * Add a poll to the network.
   * Requires 100K GRC balance. Costs 50 GRC.
   * Provide an empty string for *answers* when choosing "yes/no/abstain" for *responsetype*.
   *
   * @param {string} title - Title for the poll
   * @param {number} days - Number of days that the poll will run
   * @param {string} question - Prompt that voters shall answer
   * @param {string[]} answers - Answers for voters to choose from.
   * @param {WeightType} weightType - Weighing method for the poll: 1 = Balance, 2 = Magnitude + Balance
   * @param {ResponseType} responseType - 1 = yes/no/abstain, 2 = single-choice, 3 = multiple-choice
   * @param {string} url - Discussion web page URL for the poll
   * @returns {Promise<Poll>}
   * @memberof Voting
   */
  public async addPoll(
    title: string,
    days: number,
    question: string,
    answers: string[],
    weightType: WeightType,
    responseType: ResponseType,
    url: string,
  ): Promise<Poll> {
    return this.call<Poll>(
      'addpoll',
      title,
      days,
      question,
      answers.join(';'),
      weightType,
      responseType,
      url,
    );
  }

  /**
   * Display the results for the specified poll
   *
   * @param {string} voteIdOrTitle - Title or ID of the poll.
   * @returns {Promise<PollResults[]>}
   * @memberof Voting
   */
  public async getPollResults(voteIdOrTitle: string): Promise<PollResults[]> {
    return this.call<PollResults[]>('getpollresults', voteIdOrTitle);
  }

  /**
   * Display the claim for the specified poll or vote.
   *
   * @param {string} pollIdOrVoteId - Transaction hash of the poll or vote.
   * @returns {Promise<VotingClaim>}
   * @memberof Voting
   */
  public async getVotingClaim(pollIdOrVoteId: string): Promise<VotingClaim> {
    return this.call<VotingClaim>('getvotingclaim', pollIdOrVoteId);
  }

  /**
   * Lists poll details
   *
   * @param {boolean} [showFinished] - If true, show finished polls as well.
   * @returns {Promise<Poll[]>}
   * @memberof Voting
   */
  public async listPolls(showFinished?: boolean): Promise<Poll[]> {
    return this.call<Poll[]>('listpolls', showFinished);
  }

  /**
   * Cast a vote for a poll.
   *
   * @param {string} pollId - ID of the poll to vote for.
   * @param {...number[]} choices - Numeric IDs of the choices to vote for.
   * @returns {Promise<VoteResult>}
   * @memberof Voting
   */
  public async voteById(pollId: string, ...choices: number[]): Promise<VoteResult> {
    return this.call<VoteResult>('votebyid', pollId, ...choices);
  }

  /**
   * Display the vote details for the specified poll
   *
   * @param {string} voteIdOrTitle - Title or ID of the poll
   * @returns {Promise<Vote[]>}
   * @memberof Voting
   */
  public async voteDetails(voteIdOrTitle: string): Promise<Vote[]> {
    return this.call<Vote[]>('votedetails', voteIdOrTitle);
  }
}
