import { AuditSnapshot, AuditSnapshotAccurals, AuditSnapshotDetailed } from '../contracts/auditSnapshot';
import { BlockStats } from '../contracts/blockStats';
import { CompareSnapshotAccural } from '../contracts/compareSnapshot';
import { ContractAverage } from '../contracts/contractAverage';
import { Projects } from '../contracts/project';
import { Contract } from '../contracts/transaction';
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
}
