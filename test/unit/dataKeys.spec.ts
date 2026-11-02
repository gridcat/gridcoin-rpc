import { expect } from 'chai';
import { IJsonRPC } from '../../src/lib/JsonRPC';
import { GridcoinRPC } from '../../src/GridcoinRPC';

/**
 * Mock JSON-RPC client that answers every call with a fixed result.
 */
class JsonRPCMock implements IJsonRPC {
  public result: unknown = null;

  request(): Promise<any> {
    return Promise.resolve({ result: this.result, error: null });
  }
}

const configMock = { host: 'localhost', port: 1751 };

const CPID = '0ca9e97f18b87e18cbcd9dc98bb37864';

// Shape of the daemon's SuperblockToJson (rpc/blockchain.cpp)
const daemonSuperblock = () => ({
  version: 2,
  magnitudes: { [CPID]: 12.5 },
  projects: { sr_base: { average_rac: 1, rac: 2, total_credit: 3 } },
  beacons: [],
});

const expectedSuperblock = {
  version: 2,
  magnitudes: { [CPID]: 12.5 },
  projects: { sr_base: { averageRac: 1, rac: 2, totalCredit: 3 } },
  beacons: [],
};

describe('Data keys in responses', () => {
  let mock: JsonRPCMock;
  let rpc: any;

  beforeEach(() => {
    mock = new JsonRPCMock();
    rpc = new GridcoinRPC(configMock, mock);
  });

  ['getBlock', 'getBlockByNumber', 'getBlockByMinTime'].forEach((method) => {
    it(`${method}() keeps superblock CPIDs and project names`, async () => {
      mock.result = { fees_collected: 0, superblock: daemonSuperblock() };
      const block = await rpc[method]('x', true);
      expect(block).to.deep.equal({ feesCollected: 0, superblock: expectedSuperblock });
    });
  });

  it('getBlocksBatch() keeps superblock CPIDs and project names', async () => {
    mock.result = { blocks: [{ fees_collected: 0, superblock: daemonSuperblock() }] };
    const batch = await rpc.getBlocksBatch(1, 1, true);
    expect(batch).to.deep.equal({ blocks: [{ feesCollected: 0, superblock: expectedSuperblock }] });
  });

  it('superBlocks() keeps contract CPIDs and project names', async () => {
    mock.result = [{ total_cpids: 1, contract_contents: daemonSuperblock() }];
    const superblocks = await rpc.superBlocks(1, true);
    expect(superblocks).to.deep.equal([{ totalCpids: 1, contractContents: expectedSuperblock }]);
  });

  it('parseLegacySb() keeps contract CPIDs and project names', async () => {
    mock.result = { contract: daemonSuperblock(), legacy_hash: 'h' };
    const parsed = await rpc.parseLegacySb('sb');
    expect(parsed).to.deep.equal({ contract: expectedSuperblock, legacyHash: 'h' });
  });

  it('convergenceReport() keeps CPIDs and project names in current and past superblocks', async () => {
    mock.result = {
      superblock_well_formed: true,
      detailed_convergence_output: {
        current_convergence: { superblock_from_current_convergence: daemonSuperblock() },
        past_convergences: [{ superblock_from_this_past_convergence: daemonSuperblock() }],
      },
    };
    const report = await rpc.convergenceReport();
    expect(report).to.deep.equal({
      superblockWellFormed: true,
      detailedConvergenceOutput: {
        currentConvergence: { superblockFromCurrentConvergence: expectedSuperblock },
        pastConvergences: [{ superblockFromThisPastConvergence: expectedSuperblock }],
      },
    });
  });

  ['inspectAccrualSnapshot', 'parseAccrualSnapshotFile'].forEach((method) => {
    it(`${method}() keeps record CPIDs`, async () => {
      mock.result = { version: 1, height: 100, records: { [CPID]: 1.5 } };
      const snapshot = await rpc[method](100);
      expect(snapshot).to.deep.equal({ version: 1, height: 100, records: { [CPID]: 1.5 } });
    });
  });
});
