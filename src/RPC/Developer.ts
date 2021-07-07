import { AuditSnapshot, AuditSnapshotAccurals, AuditSnapshotDetailed } from '../contracts/auditSnapshot';
import { RPCBase } from '../RPCBase';
import { CPID } from '../types';

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
}
