import { Address, CPID } from '../types';

export interface Difficulty {
  /**
   * Shows current difficulty which determines how hard or easy it is to stake
   *
   * @type {number}
   * @memberof Difficulty
   */
  current: number;
  /**
   * Shows the Proof of Stake target which helps determine if a stake is valid
   * and how easy or hard it is to stake
   *
   * @type {number}
   * @memberof Difficulty
   */
  target: number;
  lastSearchInterval: number;
}

export interface StakeWeight {
  minimum: number;
  maximum: number;
  /**
   * Total weight of your coins staking
   *
   * @type {number}
   * @memberof StakeWeight
   */
  combined: number;
  /**
   *  The amount in GRC of your coins staking
   *
   * @type {number}
   * @memberof StakeWeight
   */
  valuesum: number;
  legacy: number;
}

export interface SideStakingAllocations {
  address: Address;
  allocationPct: number;
}

export interface SideStaking {
  /**
   * True/False on if the wallet is set to share stake rewards with other addresses
   *
   * @type {boolean}
   * @memberof SideStaking
   */
  sideStakingEnabled: boolean;
  /**
   *  list of addresses and percentages for side staking
   *
   * @type {SideStakingAllocations[]}
   * @memberof SideStaking
   */
  sideStakingAllocations: SideStakingAllocations[];
}

export interface StakeSplittingParams {
  /**
   * Smallest stake size to split into multiple UTXOs (defaults to 800)
   *
   * @type {number}
   */
  minStakeSplitValue: number;
  /**
   * The target efficiency. Is between 75 to 98 and defaults to 90.
   * Efficiency is the average % over time of how many coins are able to stake
   *
   * @type {number}
   */
  efficiency: number;
  /**
   * The size a UTXO needs to cause a split.
   * Only splits if its efficiency is worse than the target efficiency,
   * and at least min-stake-split-value or higher.
   *
   * @type {number}
   */
  stakeSplitUtxoSizeForTargetEfficiency: number;
}
export interface StakeSplitting {
  /**
   * True/False on if the wallet is set to split stakes into multiple UTXOs.
   * If false, this will be the only value in this category.
   *
   * @type {boolean}
   * @memberof StakeSplitting
   */
  stakeSplittingEnabled: boolean;
  /**
   * configuration and calculated values for stake splitting
   *
   * @type {StakeSplittingParams}
   * @memberof StakeSplitting
   */
  stakeSplittingParams: StakeSplittingParams;
}

export interface MiningInfo {
  /**
   * Current block the wallet is on
   *
   * @type {number}
   * @memberof MiningInfo
   */
  blocks: number;
  /**
   * Amount of balance that’s staking
   *
   * @type {StakeWeight}
   * @memberof MiningInfo
   */
  stakeweight: StakeWeight;
  /**
   * Estimate of the network’s total stake weight
   *
   * @type {number}
   * @memberof MiningInfo
   */
  netstakeweight: number;
  /**
   * Estimate of the total amount of the network that is staking
   *
   * @type {number}
   * @memberof MiningInfo
   */
  netstakingGRCvalue: number;
  /**
   * True/False on wether or not you are staking
   *
   * @type {boolean}
   * @memberof MiningInfo
   */
  staking: boolean;
  /**
   * Reason why the wallet is not staking. Value is "" if there are no problem
   *
   * @type {string}
   * @memberof MiningInfo
   */
  miningError: string;
  /**
   * Estimated number of days it will take to stake with ~63% chance of occurring
   *
   * @type {number}
   * @memberof MiningInfo
   */
  timeToStakeDays: number;
  /**
   * Estimated time to stake in seconds.
   * Note the seconds will likely be very off, since the time between stakes varies a fair amount
   *
   * @type {number}
   * @memberof MiningInfo
   */
  expectedtime: number;
  /**
   * Version of the staking protocol being used. Only changes on mandatory updates
   *
   * @type {number}
   * @memberof MiningInfo
   */
  miningVersion: number;
  /**
   * Number of stakes made including rejected ones since the most recent time wallet was turn online to now
   *
   * @type {number}
   * @memberof MiningInfo
   */
  miningCreated: number;
  /**
   * Number of stakes made and accepted under the same time period as mining-created
   *
   * @type {number}
   * @memberof MiningInfo
   */
  miningAccepted: number;
  /**
   * Number of potential stakes found including those rejected by the wallet or network
   *
   * @type {number}
   * @memberof MiningInfo
   */
  miningKernelsFound: number;
  maskedTimeIntervalsCovered: number;
  maskedTimeIntervalsElapsed: number;
  stakingLoopEfficiency: number;
  actualCumulativeWeight: number;
  idealCumulativeWeight: number;
  stakingEfficiency: number;
  /**
   * Information about what the wallet is doing in terms of stake-splitting
   *
   * @type {StakeSplitting}
   * @memberof MiningInfo
   */
  stakeSplitting: StakeSplitting;
  /**
   * information about what the wallet is doing in terms of side-staking
   *
   * @type {SideStaking}
   * @memberof MiningInfo
   */
  sideStaking: SideStaking;
  /**
   * information about the difficulty of the network
   *
   * @type {Difficulty}
   * @memberof MiningInfo
   */
  difficulty: Difficulty;
  /**
   * a string with various different warnings and messages.
   * Is the same as the message on the bottom in the GUI
   *
   * @type {string}
   * @memberof MiningInfo
   */
  errors: string;
  /**
   * number of transactions in the memory pool (transaction not yet in a block)
   *
   * @type {number}
   * @memberof IMiningInfo
   */
  pooledtx: number;
  /**
   * True/False on if the wallet is running on testnet
   *
   * @type {boolean}
   * @memberof MiningInfo
   */
  testnet: boolean;
  /**
   * The CPID (cross project identifier) sent to the network.
   * If an investor or pool mining, it will show up as INVESTOR
   *
   * @type {CPID}
   * @memberof MiningInfo
   */
  CPID: CPID;
  /**
   * Amount in GRC paid out per unit of magnitude (only shows up if CPIDs is valid)
   *
   * @type {number}
   * @memberof MiningInfo
   */
  magnitudeUnit: number;
  /**
   * Amount in GRC that the wallet is owed for BOINC rewards
   *
   * @type {number}
   * @memberof MiningInfo
   */
  boincRewardPending: number;
  /**
   * If you are staking only will be Staking Only - REASON
   * where REASON is some string explaining why you are not able to stake.
   * If you are able to earn research rewards will be Eligible for Research Rewards.
   *
   * @type {string}
   * @memberof MiningInfo
   */
  researcherStatus: string;
  /**
   * Title of the most recent poll (first 80 characters).
   * If there are no polls, this will show No current polls.
   *
   * @type {string}
   * @memberof MiningInfo
   */
  currentPoll: string;
}
