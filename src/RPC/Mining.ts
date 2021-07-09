import { AdvertiseBeacon } from '../contracts/advertiseBeacon';
import { Beacon, BeaconConvergence } from '../contracts/beaconConvergence';
import { BeaconRevoke } from '../contracts/beacondRevoke';
import { BeaconReport } from '../contracts/beaconReport';
import { BeaconStatusCollection } from '../contracts/beaconStatus';
import { ProjectMagnitude } from '../contracts/explainMagnitude';
import { Lifetime } from '../contracts/lifetime';
import { Magnitude } from '../contracts/magnitude';
import { MiningInfo } from '../contracts/miningInfo';
import { Stake } from '../contracts/stake';
import { Superblock } from '../contracts/superblock';
import { SuperblockAge } from '../contracts/superblockAge';
import { RPCBase } from '../RPCBase';
import { CPID } from '../types';

export class Mining extends RPCBase {
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
   * Lists Information on the current block, mining settings, and network difficulty.
   * @description
   * Documentation of Stake Miner and "getmininginfo" explanation.
   * https://github.com/gridcoin/Gridcoin-Research/blob/master/doc/stake-miner.txt
   *
   * @returns {Promise<MiningInfo>}
   * @memberof GridcoinRPC
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
    return this.call<Superblock[]>('superblockage', lookback, displayContract, cpid);
  }
}
