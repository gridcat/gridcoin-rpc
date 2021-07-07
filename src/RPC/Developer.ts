import { AuditSnapshot, AuditSnapshotAccurals, AuditSnapshotDetailed } from '../contracts/auditSnapshot';
import { CompareSnapshotAccural } from '../contracts/compareSnapshot';
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
}
