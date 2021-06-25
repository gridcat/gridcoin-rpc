import { AdvertiseBeacon } from '../contracts/advertiseBeacon';
import { BeaconReport } from '../contracts/beaconReport';
import { BeaconStatusCollection } from '../contracts/beaconStatus';
import { ProjectMagnitude } from '../contracts/explainMagnitude';
import { Lifetime } from '../contracts/lifetime';
import { Magnitude } from '../contracts/magnitude';
import { MiningInfo } from '../contracts/miningInfo';
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
  public advertiseBeacon(force?: boolean): Promise<AdvertiseBeacon> | never {
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
  public beaconReport(activeOnly?: boolean): Promise<BeaconReport[]> {
    return this.call<BeaconReport[]>('beaconreport', activeOnly);
  }

  /**
   * Displays information about your beacon or the beacon for [cpid].
   *
   * @param {CPID} [cpid]
   * @returns {Promise<BeaconStatusCollection>}
   * @memberof Mining
   */
  public beaconStatus(cpid?: CPID): Promise<BeaconStatusCollection> {
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
  public explainMagnitude(cpid?: CPID): Promise<ProjectMagnitude> | never {
    return this.call<ProjectMagnitude>('explainmagnitude', cpid);
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
  public getMiningInfo(): Promise<MiningInfo> {
    return this.call<MiningInfo>('getmininginfo');
  }

  /**
   * Displays research rewards for the lifetime of a CPID
   *
   * @param {CPID} cpid
   * @returns {Promise<Lifetime>}
   * @memberof Mining
   */
  public lifetime(cpid: CPID): Promise<Lifetime> {
    return this.call<Lifetime>('lifetime', cpid);
  }

  /**
   * Displays information for the magnitude of the specified CPID in the network
   *
   * @param {CPID} cpid
   * @returns {Promise<Magnitude>}
   * @memberof Mining
   */
  public magnitude(cpid: CPID): Promise<Magnitude> {
    return this.call<Magnitude>('magnitude', cpid);
  }

  /**
   * Reloads cpids
   *
   * @returns {Promise<{ reset: 1 }>}
   * @memberof Mining
   */
  public resetCPIDs(): Promise<{ reset: 1 }> {
    return this.call<{ reset: 1 }>('resetcpids');
  }

  /**
   * Display information regarding superblock age
   *
   * @returns {Promise<SuperblockAge>}
   * @memberof Mining
   */
  public superblockAge(): Promise<SuperblockAge> {
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
  public superBlocks(
    lookback?: number,
    displayContract?: boolean,
    cpid?: CPID,
  ): Promise<Superblock[]> {
    return this.call<Superblock[]>('superblockage', lookback, displayContract, cpid);
  }
}
