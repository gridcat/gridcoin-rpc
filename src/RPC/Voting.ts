import {
  Poll,
  ResponseType,
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
   * Requires the wallet to be fully unlocked.
   *
   * Provide an empty string for *answers* when choosing "yes/no/abstain" for *responsetype*.
   * Certain poll types may require additional fields. You can query required fields
   * by calling the RPC with only the type parameter.
   *
   * @param {string} type - Type of poll (e.g. 'survey', 'project', etc.)
   * @param {string} title - Title for the poll
   * @param {number} days - Number of days that the poll will run
   * @param {string} question - Prompt that voters shall answer
   * @param {string[]} answers - Answers for voters to choose from. Separate with semicolons.
   * @param {WeightType} weightType - Weighing method for the poll: 1 = Balance, 2 = Magnitude + Balance
   * @param {ResponseType} responseType - 1 = yes/no/abstain, 2 = single-choice, 3 = multiple-choice
   * @param {string} url - Discussion web page URL for the poll
   * @param {string} [requiredFields] - Required additional fields as "name1=value1;name2=value2"
   * @returns {Promise<Poll>}
   * @memberof Voting
   */
  public async addPoll(
    type: string,
    title: string,
    days: number,
    question: string,
    answers: string[],
    weightType: WeightType,
    responseType: ResponseType,
    url: string,
    requiredFields?: string,
  ): Promise<Poll> {
    return this.call<Poll>(
      'addpoll',
      type,
      title,
      days,
      question,
      answers.join(';'),
      weightType,
      responseType,
      url,
      requiredFields,
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

  /**
   * Test the poll notification system.
   *
   * @param {string} pollTxid - Transaction id of the poll to test notification
   * @returns {Promise<string>}
   * @memberof Voting
   */
  public async testPollNotification(pollTxid: string): Promise<string> {
    return this.call<string>('testpollnotification', pollTxid);
  }
}
