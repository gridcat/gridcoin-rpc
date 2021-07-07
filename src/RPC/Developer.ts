import { AuditSnapshot, AuditSnapshotDetailed } from '../contracts/auditSnapshot';
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
}
