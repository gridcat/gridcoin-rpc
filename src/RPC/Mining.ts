import { AdvertiseBeacon } from '../contracts/advertiseBeacon';
import { AdvertiseBeaconV3Result, BeaconAuthResult } from '../contracts/beaconAuth';
import { Beacon, BeaconConvergence } from '../contracts/beaconConvergence';
import { BeaconRevoke } from '../contracts/beacondRevoke';
import { BeaconReport } from '../contracts/beaconReport';
import { BeaconStatusCollection } from '../contracts/beaconStatus';
import { ProjectMagnitude } from '../contracts/explainMagnitude';
import { Lifetime } from '../contracts/lifetime';
import { Magnitude } from '../contracts/magnitude';
import { MiningInfo, StakingInfo } from '../contracts/miningInfo';
import { MrcInfo, MrcRequestResult } from '../contracts/mrc';
import { Stake } from '../contracts/stake';
import { Superblock } from '../contracts/superblock';
import { SuperblockAge } from '../contracts/superblockAge';
import { RPCBase } from '../RPCBase';
import { CPID } from '../types';

export abstract class Mining extends RPCBase {
  /**
   * Sends out a beacon (only applicable to solo mining).
   *
   * Requires the wallet to be fully unlocked
   *
   * @param {boolean} [force] - If true, generate new beacon keys and send a new beacon
   * even when an active or pending beacon exists for your CPID.
   * This is useful if you lose a wallet with your original beacon keys
   * but not necessary otherwise
   * @returns {(Promise<AdvertiseBeacon> | never)}
   * @memberof Mining
   */
  public async advertiseBeacon(force?: boolean): Promise<AdvertiseBeacon> | never {
    return this.call<AdvertiseBeacon>('advertisebeacon', force);
  }

  /**
   * Send a v3 beacon with a BOINC account ownership proof.
   *
   * The ownership proof XML is returned by the BOINC project's proof-of-account-ownership page.
   * It must contain <master_url>, <msg>, and <signature> elements.
   * The <msg> field should have the format: "{account_id} {beacon_public_key_hex}"
   * (the project generates this when you enter the beacon public key from beaconauth).
   *
   * Requires wallet to be fully unlocked.
   *
   * @param {string} ownershipProofXml - The XML block returned by the BOINC project
   * @param {boolean} [force] - If true, send even when an active or pending beacon exists
   * @returns {Promise<AdvertiseBeaconV3Result>}
   * @memberof Mining
   */
  public async advertiseBeaconV3(ownershipProofXml: string, force?: boolean): Promise<AdvertiseBeaconV3Result> {
    return this.call<AdvertiseBeaconV3Result>('advertisebeaconv3', ownershipProofXml, force);
  }

  /**
   * Generate a beacon key pair and return the public key hex.
   * Use the public key to obtain a BOINC account ownership proof from a project
   * that supports the ownership proof extension, then call advertiseBeaconV3
   * with the proof to send the beacon.
   *
   * Requires wallet to be fully unlocked.
   *
   * @returns {Promise<BeaconAuthResult>}
   * @memberof Mining
   */
  public async beaconAuth(): Promise<BeaconAuthResult> {
    return this.call<BeaconAuthResult>('beaconauth');
  }

  /**
   * Returns a JSON list of all valid beacons on the network (as of where the wallet is synced to).
   *
   * @param {boolean} [activeOnly] - Boolean specifying whether only active beacons should be returned.
   * Defaults to false which also includes expired beacons.
   * @returns {Promise<BeaconReport[]>}
   * @memberof Mining
   */
  public async beaconReport(activeOnly?: boolean): Promise<BeaconReport[]> {
    return this.call<BeaconReport[]>('beaconreport', activeOnly);
  }

  /**
   * Displays verified and pending beacons from the scraper or subscriber viewpoint.
   * @description
   * There are three output sections:
   * - verified_beacons_from_scraper_global:
   *   Comes directly from the scraper global map for verified beacons. This is
   *   for scraper monitoring of an individual scraper and will be empty if not
   *   run on an actual scraper nod
   * - verified_beacons_from_latest_convergence:
   *   From the latest convergence formed from all of the scrapers. This list
   *   is what will be activated in the next superblock.
   * - pending_beacons_from_GetConsensusBeaconList:
   *   This is a list of pending beacons. Note that it is subject to a one
   *   hour ladder, so it will lag the information from the
   *   pendingbeaconreport rpc call.
   *
   * @returns {Promise<BeaconConvergence>}
   * @memberof Mining
   */
  public async beaconConvergence(): Promise<BeaconConvergence> {
    return this.call<BeaconConvergence>('beaconconvergence');
  }

  /**
   * Displays information about your beacon or the beacon for *cpid*.
   *
   * @param {CPID} [cpid]
   * @returns {Promise<BeaconStatusCollection>}
   * @memberof Mining
   */
  public async beaconStatus(cpid?: CPID): Promise<BeaconStatusCollection> {
    return this.call<BeaconStatusCollection>('beaconstatus', cpid);
  }

  /**
   * Shows what your magnitude is per project.
   * On success returns JSON containing every project and the magnitude recorded
   * on the network from your CPID.
   *
   * @param {CPID} [cpid] - Optional CPID to explain magnitude for
   * @returns {(Promise<ProjectMagnitude> | never)}
   * @memberof Mining
   */
  public async explainMagnitude(cpid?: CPID): Promise<ProjectMagnitude> | never {
    return this.call<ProjectMagnitude>('explainmagnitude', cpid);
  }

  /**
   * Fetch information about this wallet's last staked block.
   *
   * @returns {Promise<Stake>}
   * @memberof Mining
   */
  public async getLastStake(): Promise<Stake> {
    return this.call<Stake>('getlaststake');
  }

  /**
   * Returns an object containing staking-related information.
   *
   * @returns {Promise<StakingInfo>}
   * @memberof Mining
   */
  public async getStakingInfo(): Promise<StakingInfo> {
    return this.call<StakingInfo>('getstakinginfo');
  }

  /**
   * Creates an MRC (Manual Research Claim) request. Requires an unlocked wallet.
   *
   * @param {boolean} [dryRun] - If true, calculate the reward and fee but do not send the contract. Defaults to false.
   * @param {boolean} [force] - If true, create even if it results in a reward loss or ban. Only works on testnet.
   * @param {number} [fee] - Custom fee to use instead of the calculated fee. Must not be lower than the calculated fee.
   * @returns {Promise<MrcRequestResult>}
   * @memberof Mining
   */
  public async createMrcRequest(dryRun?: boolean, force?: boolean, fee?: number): Promise<MrcRequestResult> {
    return this.call<MrcRequestResult>('createmrcrequest', dryRun, force, fee);
  }

  /**
   * Display MRC (Manual Research Claim) information.
   *
   * @param {boolean} [detailed] - Output MRC details. Defaults to false.
   * @param {CPID | '*'} [cpid] - CPID to query. Defaults to current wallet CPID. Use "*" for all CPIDs (network wide).
   * @param {number} [lowHeight] - Low height for scope. Defaults to V12 block height.
   * @param {number} [highHeight] - High height for scope. Defaults to current block.
   * @returns {Promise<MrcInfo>}
   * @memberof Mining
   */
  public async getMrcInfo(
    detailed?: boolean,
    cpid?: CPID | '*',
    lowHeight?: number,
    highHeight?: number,
  ): Promise<MrcInfo> {
    return this.call<MrcInfo>('getmrcinfo', detailed, cpid, lowHeight, highHeight);
  }

  /**
   * Lists Information on the current block, mining settings, and network difficulty.
   * @description
   * Alias for getstakinginfo, kept for backward compatibility.
   * Documentation of Stake Miner and "getmininginfo" explanation.
   * https://github.com/gridcoin/Gridcoin-Research/blob/master/doc/stake-miner.txt
   *
   * @deprecated Use getStakingInfo() instead — getmininginfo is an alias in the daemon
   * @returns {Promise<MiningInfo>}
   * @memberof Mining
   */
  public async getMiningInfo(): Promise<MiningInfo> {
    return this.call<MiningInfo>('getmininginfo');
  }

  /**
   * Displays research rewards for the lifetime of a CPID
   *
   * @param {CPID} cpid
   * @returns {Promise<Lifetime>}
   * @memberof Mining
   */
  public async lifetime(cpid: CPID): Promise<Lifetime> {
    return this.call<Lifetime>('lifetime', cpid);
  }

  /**
   * Displays information for the magnitude of the specified CPID in the network
   *
   * @param {CPID} cpid
   * @returns {Promise<Magnitude>}
   * @memberof Mining
   */
  public async magnitude(cpid: CPID): Promise<Magnitude> {
    return this.call<Magnitude>('magnitude', cpid);
  }

  /**
   * Displays pending beacons directly from the beacon registry.
   *
   * @returns {Promise<Beacon[]>}
   * @memberof Mining
   */
  public async pendingBeaconReport(): Promise<Beacon[]> {
    return this.call<Beacon[]>('pendingbeaconreport');
  }

  /**
   * Reloads cpids
   *
   * @returns {Promise<{ reset: 1 }>}
   * @memberof Mining
   */
  public async resetCPIDs(): Promise<{ reset: 1 }> {
    return this.call<{ reset: 1 }>('resetcpids');
  }

  /**
   * Advertise a beacon (Requires wallet to be fully unlocked)
   *
   * @param {CPID} cpid - CPID associated with the beacon to revoke.
   * @returns {Promise<BeaconRevoke>}
   * @memberof Mining
   */
  public async revokeBeacon(cpid: CPID): Promise<BeaconRevoke> {
    return this.call<BeaconRevoke>('revokebeacon', cpid);
  }

  /**
   * Display information regarding superblock age
   *
   * @returns {Promise<SuperblockAge>}
   * @memberof Mining
   */
  public async superblockAge(): Promise<SuperblockAge> {
    return this.call<SuperblockAge>('superblockage');
  }

  /**
   * Display data on recent superblocks
   *
   * @param {number} [lookback] - number of superblocks to show (default 14)
   * @param {boolean} [displayContract] - display superblock contract (default false)
   * @param {CPID} [cpid] - Shows magnitude for a cpid for recent superblocks
   * @returns {Promise<Superblock[]>}
   * @memberof Mining
   */
  public async superBlocks(
    lookback?: number,
    displayContract?: boolean,
    cpid?: CPID,
  ): Promise<Superblock[]> {
    return this.call<Superblock[]>('superblocks', lookback, displayContract, cpid);
  }
}
