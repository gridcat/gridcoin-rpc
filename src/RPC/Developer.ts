import { AuditSnapshot, AuditSnapshotAccurals, AuditSnapshotDetailed } from '../contracts/auditSnapshot';
import { BlockStats } from '../contracts/blockStats';
import { ContractAverage } from '../contracts/contractAverage';
import { LocalProject } from '../contracts/localProject';
import { LoggingCategories } from '../contracts/logging';
import { Manifests, ManifestsDetailed } from '../contracts/manifest';
import { NetworkHealth } from '../contracts/networkHealth';
import { Projects } from '../contracts/project';
import { ResearcherAccounts } from '../contracts/researcher';
import { ScrapeReport } from '../contracts/scrapeReport';
import { SuperblockAverage } from '../contracts/superblockAverage';
import { Contract } from '../contracts/transaction';
import { Version } from '../contracts/version';
import { RPCBase } from '../RPCBase';
import { CPID, TX } from '../types';

export abstract class Developer extends RPCBase {
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
   *    importprivkey *private_key_hex* master
   * Send some coins to the master key address if necessary:
   *    sendtoaddress *address* <amount>
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

  /**
   * Audit beacons on the network.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async beaconAudit(): Promise<unknown> {
    return this.call('beaconaudit');
  }

  /**
   * Modify a Gridcoin setting at runtime.
   *
   * @param {string} name - Setting name
   * @param {string} value - New setting value
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async changeSettings(name: string, value: string): Promise<unknown> {
    return this.call('changesettings', name, value);
  }

  /**
   * Convergence report from the scraper.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async convergenceReport(): Promise<unknown> {
    return this.call('convergencereport');
  }

  /**
   * Dump all contracts from the blockchain.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async dumpContracts(): Promise<unknown> {
    return this.call('dumpcontracts');
  }

  /**
   * Export statistics.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async exportStats(): Promise<unknown> {
    return this.call('exportstats1');
  }

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

  /**
   * Display the automatically greylisted projects based on Zero Credit Days (ZCD)
   * and Whitelist Activity Score (WAS).
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async getAutoGreylist(): Promise<unknown> {
    return this.call('getautogreylist');
  }

  /**
   * Get a scraper convergence part by content hash.
   *
   * @param {string} hash - The content hash of the part
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async getMpart(hash: string): Promise<unknown> {
    return this.call('getmpart', hash);
  }

  /**
   * Show recent blocks with optional detail.
   *
   * @param {number} [count] - Number of recent blocks to show
   * @param {boolean} [detail] - Show detailed information
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async getRecentBlocks(count?: number, detail?: boolean): Promise<unknown> {
    return this.call('getrecentblocks', count, detail);
  }

  /**
   * Inspect an accrual snapshot.
   *
   * @param {number} [height] - Block height of the snapshot
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async inspectAccrualSnapshot(height?: number): Promise<unknown> {
    return this.call('inspectaccrualsnapshot', height);
  }

  /**
   * Display active alerts on the network.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async listAlerts(): Promise<unknown> {
    return this.call('listalerts');
  }

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
   * List active scrapers on the network.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async listScrapers(): Promise<unknown> {
    return this.call('listscrapers');
  }

  /**
   * List side stake allocations.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async listSideStakes(): Promise<unknown> {
    return this.call('listsidestakes');
  }

  /**
   * List mandatory side stake allocations.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async listMandatorySideStakes(): Promise<unknown> {
    return this.call('listmandatorysidestakes');
  }

  /**
   * List protocol entries in the protocol registry.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async listProtocolEntries(): Promise<unknown> {
    return this.call('listprotocolentries');
  }

  /**
   * List current Gridcoin settings.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async listSettings(): Promise<unknown> {
    return this.call('listsettings');
  }

  /**
   * logging *json array category adds* *json array category removes*
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

  /**
   * Parse an accrual snapshot from a file.
   *
   * @param {string} filename - Path to the snapshot file
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async parseAccrualSnapshotFile(filename: string): Promise<unknown> {
    return this.call('parseaccrualsnapshotfile', filename);
  }

  /**
   * Parse a legacy superblock.
   *
   * @param {string} superblock - The legacy superblock data
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async parseLegacySb(superblock: string): Promise<unknown> {
    return this.call('parselegacysb', superblock);
  }

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
   * Read data from the Gridcoin config/data store.
   *
   * @param {string} key - The key to read
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async readData(key: string): Promise<unknown> {
    return this.call('readdata', key);
  }

  /**
   * Reorganize the blockchain to a specified height. This is a dangerous admin-only operation.
   *
   * @param {number} height - The block height to reorganize to
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async reorganize(height: number): Promise<unknown> {
    return this.call('reorganize', height);
  }

  /**
   * Send an alert to the network. Admin-only.
   *
   * @param {string} privateKey - Admin private key
   * @param {string} alertKey - Alert key
   * @param {number} minVer - Minimum version
   * @param {number} maxVer - Maximum version
   * @param {number} priority - Alert priority
   * @param {string} comment - Alert comment
   * @param {string} statusBar - Status bar message
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async sendAlert(
    privateKey: string,
    alertKey: string,
    minVer: number,
    maxVer: number,
    priority: number,
    comment: string,
    statusBar: string,
  ): Promise<unknown> {
    return this.call('sendalert', privateKey, alertKey, minVer, maxVer, priority, comment, statusBar);
  }

  /**
   * Send an alert (v2) to the network. Admin-only.
   *
   * @param {string} privateKey - Admin private key
   * @param {string} alertKey - Alert key
   * @param {number} minVer - Minimum version
   * @param {number} maxVer - Maximum version
   * @param {number} priority - Alert priority
   * @param {string} comment - Alert comment
   * @param {string} statusBar - Status bar message
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async sendAlert2(
    privateKey: string,
    alertKey: string,
    minVer: number,
    maxVer: number,
    priority: number,
    comment: string,
    statusBar: string,
  ): Promise<unknown> {
    return this.call('sendalert2', privateKey, alertKey, minVer, maxVer, priority, comment, statusBar);
  }

  /**
   * Send a block to the network.
   *
   * @param {string} blockData - Hex-encoded block data
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async sendBlock(blockData: string): Promise<unknown> {
    return this.call('sendblock', blockData);
  }

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

  /**
   * Write data to the Gridcoin config/data store.
   *
   * @param {string} key - The key to write
   * @param {string} value - The value to write
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async writeData(key: string, value: string): Promise<unknown> {
    return this.call('writedata', key, value);
  }

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

  /**
   * Send a scraper file manifest to the network.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async sendScraperFileManifest(): Promise<unknown> {
    return this.call('sendscraperfilemanifest');
  }

  /**
   * Save a scraper file manifest.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async saveScraperFileManifest(): Promise<unknown> {
    return this.call('savescraperfilemanifest');
  }

  /**
   * Delete a scraper manifest.
   *
   * @param {string} manifestHash - Hash of the manifest to delete
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async deleteCScraperManifest(manifestHash: string): Promise<unknown> {
    return this.call('deletecscrapermanifest', manifestHash);
  }

  /**
   * Immediately archives the specified log. Currently valid values are debug and scraper.
   *
   * @param {('debug' | 'scraper')} log
   * @returns {Promise<boolean>}
   * @memberof Developer
   */
  public async archiveLog(log: 'debug' | 'scraper'): Promise<boolean> {
    return this.call('archivelog', log);
  }

  /**
   * Test building a new superblock from current convergence data.
   *
   * @returns {Promise<unknown>}
   * @memberof Developer
   */
  public async testNewSb(): Promise<unknown> {
    return this.call('testnewsb');
  }

  /**
   * Report containing various statistics about the scraper.
   *
   * @returns {Promise<ScrapeReport>}
   * @memberof Developer
   */
  public async scrapeReport(): Promise<ScrapeReport> {
    return this.call('scraperreport');
  }
}
