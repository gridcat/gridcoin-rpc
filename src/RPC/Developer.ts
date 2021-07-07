import { AuditSnapshot, AuditSnapshotAccurals, AuditSnapshotDetailed } from '../contracts/auditSnapshot';
import { BlockStats } from '../contracts/blockStats';
import { CompareSnapshotAccural } from '../contracts/compareSnapshot';
import { ContractAverage } from '../contracts/contractAverage';
import { LocalProject } from '../contracts/localProject';
import { LoggingCategories } from '../contracts/logging';
import { Manifests, ManifestsDetailed } from '../contracts/manifest';
import { NetworkHealth } from '../contracts/networkHealth';
import { Projects } from '../contracts/project';
import { ResearcherAccounts } from '../contracts/researcher';
import { SuperblockAverage } from '../contracts/superblockAverage';
import { Contract } from '../contracts/transaction';
import { Version } from '../contracts/version';
import { RPCBase } from '../RPCBase';
import { CPID, TX } from '../types';

export class Developer extends RPCBase {
  public async auditSnapshotAccrual(cpid: CPID, detailed: false): Promise<AuditSnapshot>;

  public async auditSnapshotAccrual(cpid: CPID, detailed: true): Promise<AuditSnapshotDetailed>;

  /**
   * Report accrual snapshot deltas for the specified CPID.
   *
   * @param {CPID} cpid
   * @param {boolean} detailed
   * @returns {(Promise<AuditSnapshot | AuditSnapshotDetailed>)}
   * @memberof Developer
   */
  public async auditSnapshotAccrual(cpid: CPID, detailed: boolean): Promise<AuditSnapshot | AuditSnapshotDetailed> {
    return this.call('auditsnapshotaccrual', cpid, detailed);
  }

  /**
   * Report accrual audit for entire population of CPIDs.
   *
   * @param {boolean} [mismatchedOnly]
   * @returns {Promise<AuditSnapshotAccurals>}
   * @memberof Developer
   */
  public async auditSnapshotAccruals(mismatchedOnly?: boolean): Promise<AuditSnapshotAccurals> {
    return this.call('auditsnapshotaccruals', mismatchedOnly);
  }

  /**
   * Send a transaction that contains an administrative contract.
   * @description
   * Before invoking this command, import the master key used to sign and verify
   * transactions that contain administrative contracts. The label is optional:
   *    importprivkey <private_key_hex> master
   * Send some coins to the master key address if necessary:
   *    sendtoaddress <address> <amount>
   * To whitelist a project:
   *    addkey add project projectname url
   * To de-whitelist a project:
   *    addkey delete project projectname 1
   * Key examples:
   *    addkey add project milkyway@home http://milkyway.cs.rpi.edu/milkyway/@
   *    addkey delete project milkyway@home 1
   * GRC will only memorize the *last* value it finds for a key in the highest block.
   * @todo: check return values as I am guessing here
   *
   * @param {('add' | 'delete')} action
   * @param {string} keyType
   * @param {string} keyName
   * @param {(string | number | boolean)} keyValue
   * @returns {Promise<{ contract: Contract, txid: TX }>}
   * @memberof Developer
   */
  public async addKey(
    action: 'add' | 'delete',
    keyType: string,
    keyName: string,
    keyValue: string | number | boolean,
  ): Promise<{ contract: Contract, txid: TX }> {
    return this.call('addkey', action, keyType, keyName, keyValue);
  }

  /**
   * Compare snapshot and legacy accrual for active CPIDs.
   *
   * @returns {Promise<CompareSnapshotAccural>}
   * @memberof Developer
   */
  public async compareSnapshotAccrual(): Promise<CompareSnapshotAccural> {
    return this.call('comparesnapshotaccrual');
  }

  /**
   * Displays information on your current contract average with regards to superblock contract
   *
   * @returns {Promise<ContractAverage>}
   * @memberof Developer
   */
  public async currentContractAverage(): Promise<ContractAverage> {
    return this.call('currentcontractaverage');
  }

  /**
   * Enable or disable VERBOSE logging category (aka old debug) on the fly
   * @deprecated
   * @see logging
   *
   * @param {boolean} enable
   * @returns {Promise<{ 'Logging category VERBOSE (aka old debug) ': boolean }>}
   * @memberof Developer
   */
  public async debug(enable: boolean): Promise<{ 'Logging category VERBOSE (aka old debug) ': boolean }> {
    return this.call('debug', enable);
  }

  /** @todo: implement dumpcontracts */

  /**
   * Show stats on what wallets and cpids staked recent blocks
   * @description
   * Mode 0: Startheight is the starting height, endheight is the chain head if not specified.
   * Mode 1: Startheight is actually the number of blocks back from endheight or the chain head if not specified.
   *
   * @param {(0 | 1)} mode
   * @param {number} [startHeight]
   * @param {number} [endHeight]
   * @returns {Promise<BlockStats>}
   * @memberof Developer
   */
  public async getBlockStats(mode: 0 | 1, startHeight?: number, endHeight?: number): Promise<BlockStats> {
    return this.call('getblockstats', mode, startHeight, endHeight);
  }

  /** @todo: implement getlistof */

  /** @todo: implement inspectaccrualsnapshot */

  /** @todo: implement listdata */

  /**
   * Displays information about whitelisted projects.
   *
   * @returns {Promise<Projects>}
   * @memberof Developer
   */
  public async listProjects(): Promise<Projects> {
    return this.call('listprojects');
  }

  /**
   * List researcher accounts in the accrual system and their current accruals.
   *
   * @returns {Promise<ResearcherAccounts>}
   * @memberof Developer
   */
  public async listResearcherAccounts(): Promise<ResearcherAccounts> {
    return this.call('listresearcheraccounts');
  }

  /**
   * logging [json array category adds] [json array category removes]
   * Gets and sets the logging configuration.
   * When called without an argument, returns the list of categories with status that are currently being debug logged or not.
   * When called with arguments, adds or removes categories from debug logging and return the lists above.
   * The arguments are evaluated in order "include", "exclude".
   * If an item is both included and excluded, it will thus end up being excluded.
   * The valid logging categories are: " + ListLogCategories() + ".
   * In addition, the following are available as category names with special meanings:
   * all or 1: represent all logging categories.
   * none or 0: even if other logging categories are specified, ignore all of them.
   * @example
   * logging all net: enables all and disables net.
   * logging "" all: disables all.
   * Note that unlike Bitcoin, we don't process JSON arrays correctly as arguments yet for the command line,
   * so, for the rpc cli, it is limited to one enable and/or one disable category. Using CURL works with the full arrays.
   *
   * @param {(keyof LoggingCategories | 'all' | '')} [enable]
   * @param {(keyof LoggingCategories | 'all')} [disable]
   * @returns {Promise<LoggingCategories>}
   * @memberof Developer
   */
  public async logging(
    enable?: keyof LoggingCategories | 'all' | '',
    disable?: keyof LoggingCategories | 'all',
  ): Promise<LoggingCategories> {
    return this.call('logging', enable, disable);
  }

  /**
   * Display information about the network health
   *
   * @returns {Promise<NetworkHealth>}
   * @memberof Developer
   */
  public async network(): Promise<NetworkHealth> {
    return this.call('network');
  }

  /** @todo: implement parseaccrualsnapshotfile */

  /** @todo: implement parselegacysb */

  /**
   * Show the status of locally attached BOINC projects.
   *
   * @returns {Promise<LocalProject[]>}
   * @memberof Developer
   */
  public async projects(): Promise<LocalProject[]> {
    return this.call('projects');
  }

  /**
   * Re-reads config file; Does not overwrite pre-existing loaded values
   *
   * @returns {Promise<{ readconfig: 1 }>}
   * @memberof Developer
   */
  public async readConfig(): Promise<{ readconfig: 1 }> {
    return this.call('readconfig');
  }

  /** @todo: implement readdata */

  /** @todo: implement reorganize */

  /** @todo: implement sendalert */

  /** @todo: implement sendalert2 */

  /** @todo: implement sendblock */

  /**
   * Displays average information for current superblock
   *
   * @returns {Promise<SuperblockAverage>}
   * @memberof Developer
   */
  public async superblockAverage(): Promise<SuperblockAverage> {
    return this.call('superblockaverage');
  }

  /**
   * Display the software versions of nodes that recently staked.
   *
   * @param {number} [lookBack] - Number of blocks to tally from the chain head
   * @param {boolean} [full] - Classify by commit suffix (default: false)
   * @returns {Promise<Version[]>}
   * @memberof Developer
   */
  public async versionReport(lookBack?: number, full?: boolean): Promise<Version[]> {
    return this.call('versionreport', lookBack, full);
  }

  /** @todo: implement writedata */

  public async listManifests(details: false, manifestHash?: string): Promise<Manifests>;

  public async listManifests(details: true, manifestHash?: string): Promise<ManifestsDetailed>;

  /**
   * Show list of known ScraperManifest objects.
   *
   * @param {boolean} details - to show details of manifests
   * @param {string} [manifestHash] - hash of specific manifest (Not provided returns all.)
   * @returns {(Promise<Manifests | ManifestsDetailed>)}
   * @memberof Developer
   */
  public async listManifests(details: boolean, manifestHash?: string): Promise<Manifests | ManifestsDetailed> {
    return this.call('listmanifests', details, manifestHash);
  }
}
