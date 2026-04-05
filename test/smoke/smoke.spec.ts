/**
 * Smoke tests against a live Gridcoin-Research testnet node.
 *
 * These tests verify that the library can communicate with a real daemon
 * and that response shapes match our TypeScript contracts.
 *
 * Required environment variables:
 *   GRC_RPC_HOST     - Daemon hostname or IP
 *   GRC_RPC_PORT     - Daemon RPC port
 *   GRC_RPC_USER     - RPC username
 *   GRC_RPC_PASS     - RPC password
 *
 * Optional:
 *   GRC_RPC_VERSION  - Expected daemon version string (default: 'v5.5.0.0')
 *   GRC_RPC_SSL      - Set to 'true' to use HTTPS (default: false)
 *
 * Run:
 *   GRC_RPC_HOST=x GRC_RPC_PORT=x GRC_RPC_USER=x GRC_RPC_PASS=x npm run test:smoke
 */

import { expect } from 'chai';
import { GridcoinRPC } from '../../src/GridcoinRPC';

const HOST = process.env.GRC_RPC_HOST || '';
const PORT = parseInt(process.env.GRC_RPC_PORT || '0', 10);
const USER = process.env.GRC_RPC_USER || '';
const PASS = process.env.GRC_RPC_PASS || '';
const USE_SSL = process.env.GRC_RPC_SSL === 'true';

const isConfigured = HOST && PORT;

const describeSmoke = isConfigured ? describe : describe.skip;

jest.setTimeout(30000);

describeSmoke('Smoke Tests (live daemon)', () => {
  let rpc: GridcoinRPC;

  beforeAll(() => {
    rpc = new GridcoinRPC({
      host: HOST,
      port: PORT,
      username: USER,
      password: PASS,
      ssl: USE_SSL,
      sslStrict: false,
    });
  });

  // ──────────────────────────────────────────────
  // Version gate — fail fast if the daemon version
  // doesn't match what the library was built for
  // ──────────────────────────────────────────────

  describe('version check', () => {
    it('daemon version should start with v5.5.0', async () => {
      const info = await rpc.getInfo();
      expect(info).to.have.property('version');
      expect((info as any).version).to.match(/^v5\.5\.0/);
    });
  });

  // ──────────────────────────────────────────────
  // Network & Blockchain (read-only, no wallet needed)
  // ──────────────────────────────────────────────

  describe('network', () => {
    it('getInfo returns valid structure', async () => {
      const info = await rpc.getInfo();
      expect(info).to.have.property('blocks').that.is.a('number');
      expect(info).to.have.property('connections').that.is.a('number');
      expect(info).to.have.property('difficulty');
    });

    it('getBlockchainInfo returns valid structure', async () => {
      const info = await rpc.getBlockchainInfo();
      expect(info).to.have.property('blocks').that.is.a('number');
      expect(info).to.have.property('moneysupply').that.is.a('number');
    });

    it('getNetworkInfo returns valid structure', async () => {
      const info = await rpc.getNetworkInfo();
      expect(info).to.have.property('version').that.is.a('string');
      expect(info).to.have.property('connections').that.is.a('number');
    });

    it('getBlockCount returns a positive number', async () => {
      const count = await rpc.getBlockCount();
      expect(count).to.be.a('number');
      expect(count).to.be.greaterThan(0);
    });

    it('getBestBlockhash returns a hex string', async () => {
      const hash = await rpc.getBestBlockhash();
      expect(hash).to.be.a('string');
      expect(hash).to.match(/^[0-9a-f]{64}$/);
    });

    it('getDifficulty returns current and target', async () => {
      const diff = await rpc.getDifficulty();
      expect(diff).to.have.property('current').that.is.a('number');
      expect(diff).to.have.property('target').that.is.a('number');
    });

    it('getConnectionCount returns a number', async () => {
      const count = await rpc.getConnectionCount();
      expect(count).to.be.a('number');
    });

    it('getPeerInfo returns an array', async () => {
      const peers = await rpc.getPeerInfo();
      expect(peers).to.be.an('array');
      if (peers.length > 0) {
        expect(peers[0]).to.have.property('addr').that.is.a('string');
      }
    });

    it('getNetTotals returns bytes in/out', async () => {
      const totals = await rpc.getNetTotals();
      expect(totals).to.have.property('totalbytesrecv').that.is.a('number');
      expect(totals).to.have.property('totalbytessent').that.is.a('number');
    });

    it('currentTime returns UTC time', async () => {
      const time = await rpc.currentTime();
      expect(time).to.have.property('utc');
    });

    it('networkTime returns a number', async () => {
      const time = await rpc.networkTime();
      expect(time).to.have.property('networkTime').that.is.a('number');
    });

    it('getRawMemPool returns an array', async () => {
      const pool = await rpc.getRawMemPool();
      expect(pool).to.be.an('array');
    });

    // Skipped: getBurnReport scans the entire blockchain and can take minutes
    it.skip('getBurnReport returns burn statistics', async () => {
      const report = await rpc.getBurnReport();
      expect(report).to.have.property('total');
      expect(report).to.have.property('voluntary');
      expect(report).to.have.property('contracts').that.is.an('object');
    });

    it('getNodeAddresses returns an array of address objects', async () => {
      const addrs = await rpc.getNodeAddresses(5);
      expect(addrs).to.be.an('array');
      if (addrs.length > 0) {
        expect(addrs[0]).to.have.property('address').that.is.a('string');
        expect(addrs[0]).to.have.property('port').that.is.a('number');
      }
    });
  });

  // ──────────────────────────────────────────────
  // Blocks (read-only, uses known chain data)
  // ──────────────────────────────────────────────

  describe('blocks', () => {
    it('getBlockHash returns a hex hash for block 1', async () => {
      const hash = await rpc.getBlockHash(1);
      expect(hash).to.be.a('string');
      expect(hash).to.match(/^[0-9a-f]{64}$/);
    });

    it('getBlock returns block data by hash', async () => {
      const hash = await rpc.getBlockHash(1);
      const block = await rpc.getBlock(hash, false);
      expect(block).to.have.property('hash', hash);
      expect(block).to.have.property('height', 1);
      expect(block).to.have.property('confirmations').that.is.a('number');
    });

    it('getBlockByNumber returns block data', async () => {
      const block = await rpc.getBlockByNumber(1, false);
      expect(block).to.have.property('height', 1);
      expect(block).to.have.property('hash').that.is.a('string');
    });

    it('getBlocksBatch returns multiple blocks', async () => {
      const batch = await rpc.getBlocksBatch(1, 3, false);
      expect(batch).to.have.property('blocks').that.is.an('array');
      expect(batch).to.have.property('blockCount').that.is.a('number');
      expect(batch.blocks.length).to.be.greaterThan(0);
    });

    it('getCheckpoint returns checkpoint info', async () => {
      const cp = await rpc.getCheckpoint();
      expect(cp).to.be.an('object');
      // May be empty if no checkpoint exists; if populated, has these keys
      if (Object.keys(cp).length > 0) {
        expect(cp).to.have.property('synccheckpoint');
        expect(cp).to.have.property('height');
      }
    });

    it('showBlock returns block at index', async () => {
      const block = await rpc.showBlock(1);
      expect(block).to.have.property('height', 1);
    });

    it('getBlock with txinfo=true returns detailed transactions', async () => {
      const hash = await rpc.getBlockHash(1);
      const block = await rpc.getBlock(hash, true);
      expect(block).to.have.property('hash', hash);
      expect(block).to.have.property('tx').that.is.an('array');
      if (block.tx.length > 0) {
        expect(block.tx[0]).to.have.property('txid').that.is.a('string');
        expect(block.tx[0]).to.have.property('vin').that.is.an('array');
        expect(block.tx[0]).to.have.property('vout').that.is.an('array');
      }
    });

    it('getBlockByMinTime returns a block at or after timestamp', async () => {
      // Get block 1's time as a safe lower bound (timestamp 0 throws because it's below genesis)
      const block1 = await rpc.getBlockByNumber(1, false);
      const block = await rpc.getBlockByMinTime((block1 as any).time, false);
      expect(block).to.have.property('height').that.is.a('number');
      expect(block).to.have.property('hash').that.is.a('string');
    });
  });

  // ──────────────────────────────────────────────
  // Wallet (read-only queries)
  // ──────────────────────────────────────────────

  describe('wallet (read-only)', () => {
    it('getWalletInfo returns valid structure', async () => {
      const info = await rpc.getWalletInfo();
      expect(info).to.have.property('walletversion').that.is.a('number');
      expect(info).to.have.property('balance').that.is.a('number');
      expect(info).to.have.property('staking').that.is.a('boolean');
    });

    it('getBalance returns a number', async () => {
      const balance = await rpc.getBalance();
      expect(balance).to.be.a('number');
    });

    it('getUnconfirmedBalance returns a number', async () => {
      const balance = await rpc.getUnconfirmedBalance();
      expect(balance).to.be.a('number');
    });

    it('listTransactions returns an array', async () => {
      const txs = await rpc.listTransactions();
      expect(txs).to.be.an('array');
    });

    it('listStakes returns an array', async () => {
      const stakes = await rpc.listStakes();
      expect(stakes).to.be.an('array');
    });

    it('listAddressGroupings returns an array', async () => {
      const groups = await rpc.listAddressGroupings();
      expect(groups).to.be.an('array');
    });

    it('checkWallet returns success or fail status', async () => {
      const result = await rpc.checkWallet() as any;
      // Success: { walletCheckPassed: true }
      // Fail: { mismatchedSpentCoins: N, amountInQuestion: N }
      if (result.walletCheckPassed !== undefined) {
        expect(result.walletCheckPassed).to.be.a('boolean');
      } else {
        expect(result).to.have.property('mismatchedSpentCoins').that.is.a('number');
        expect(result).to.have.property('amountInQuestion').that.is.a('number');
      }
    });

    it('listUnspent returns an array', async () => {
      const utxos = await rpc.listUnspent();
      expect(utxos).to.be.an('array');
    });

    it('listReceivedByAddress returns an array', async () => {
      const received = await rpc.listReceivedByAddress();
      expect(received).to.be.an('array');
    });
  });

  // ──────────────────────────────────────────────
  // Staking / Mining (read-only queries)
  // ──────────────────────────────────────────────

  describe('staking (read-only)', () => {
    it('getStakingInfo returns valid structure', async () => {
      const info = await rpc.getStakingInfo();
      expect(info).to.have.property('blocks').that.is.a('number');
      expect(info).to.have.property('staking').that.is.a('boolean');
      expect(info).to.have.property('difficulty');
      expect(info).to.have.property('stakeSplitting');
      expect(info).to.have.property('sideStaking');
    });

    it('getMiningInfo returns same structure as getStakingInfo', async () => {
      const info = await rpc.getMiningInfo();
      expect(info).to.have.property('blocks').that.is.a('number');
      expect(info).to.have.property('staking').that.is.a('boolean');
    });

    it('superblockAge returns age info', async () => {
      const age = await rpc.superblockAge() as any;
      expect(age).to.have.property('superblockAge').that.is.a('number');
      expect(age).to.have.property('superblockTimestamp').that.is.a('string');
      expect(age).to.have.property('superblockBlockNumber').that.is.a('number');
      expect(age).to.have.property('pendingSuperblockHeight').that.is.a('number');
    });

    it('beaconReport returns an array', async () => {
      const report = await rpc.beaconReport();
      expect(report).to.be.an('array');
    });

    it('superBlocks returns recent superblock data', async () => {
      const sbs = await rpc.superBlocks(5) as any[];
      expect(sbs).to.be.an('array');
      if (sbs.length > 0) {
        // SuperblockReport returns most values as strings
        expect(sbs[0]).to.have.property('height');
        expect(sbs[0]).to.have.property('totalCpids');
        expect(sbs[0]).to.have.property('activeBeacons');
        expect(sbs[0]).to.have.property('averageMagnitude');
      }
    });

    it('beaconStatus returns beacon info or throws for INVESTOR', async () => {
      // Throws RPC error if wallet has no CPID (INVESTOR mode)
      try {
        const status = await rpc.beaconStatus() as any;
        expect(status).to.have.property('active').that.is.an('array');
        expect(status).to.have.property('pending').that.is.an('array');
      } catch (e: any) {
        // Expected if wallet is in INVESTOR mode (no CPID)
        expect(e.message).to.be.a('string');
      }
    });

    it('explainMagnitude returns magnitude breakdown or throws for INVESTOR', async () => {
      // Throws RPC error if wallet has no CPID (INVESTOR mode)
      try {
        const mag = await rpc.explainMagnitude() as any;
        expect(mag).to.be.an('object');
      } catch (e: any) {
        expect(e.message).to.be.a('string');
      }
    });

    it('pendingBeaconReport returns an array', async () => {
      const pending = await rpc.pendingBeaconReport();
      expect(pending).to.be.an('array');
    });

    it('getMrcInfo returns MRC statistics or throws for INVESTOR', async () => {
      // Throws "No data for non-cruncher" on INVESTOR wallets
      try {
        const info = await rpc.getMrcInfo();
        expect(info).to.be.an('object');
        expect(info).to.have.property('totalMrcsPaid').that.is.a('number');
      } catch (e: any) {
        expect(e.message).to.be.a('string');
      }
    });
  });

  // ──────────────────────────────────────────────
  // Developer (read-only queries)
  // ──────────────────────────────────────────────

  describe('developer (read-only)', () => {
    it('listProjects returns project data with project entries', async () => {
      const projects = await rpc.listProjects() as any;
      expect(projects).to.be.an('object');
      const keys = Object.keys(projects);
      if (keys.length > 0) {
        const first = projects[keys[0]];
        expect(first).to.have.property('url').that.is.a('string');
        expect(first).to.have.property('displayName').that.is.a('string');
      }
    });

    it('versionReport returns an array', async () => {
      const versions = await rpc.versionReport(10);
      expect(versions).to.be.an('array');
    });

    it('logging returns category flags', async () => {
      const categories = await rpc.logging() as any;
      expect(categories).to.be.an('object');
      // Should have at least some logging category booleans
      expect(Object.keys(categories).length).to.be.greaterThan(0);
    });

    it('network returns health info with known keys', async () => {
      const health = await rpc.network() as any;
      expect(health).to.have.property('totalMagnitude').that.is.a('number');
      expect(health).to.have.property('averageMagnitude').that.is.a('number');
      expect(health).to.have.property('magnitudeUnit').that.is.a('number');
      expect(health).to.have.property('researchPaidTwoWeeks');
      expect(health).to.have.property('researchPaidDailyAverage');
      expect(health).to.have.property('researchPaidDailyLimit');
      expect(health).to.have.property('totalMoneySupply');
    });

    it('superblockAverage returns average info with known keys', async () => {
      const avg = await rpc.superblockAverage() as any;
      expect(avg).to.have.property('beaconCount').that.is.a('number');
      expect(avg).to.have.property('beaconParticipantCount').that.is.a('number');
      expect(avg).to.have.property('averageMagnitude').that.is.a('number');
      expect(avg).to.have.property('superblockValid').that.is.a('boolean');
      expect(avg).to.have.property('superblockAge').that.is.a('number');
      expect(avg).to.have.property('direNeedOfSuperblock').that.is.a('boolean');
    });

    it('getBlockStats returns staking statistics', async () => {
      // Mode 1: lookback N blocks from chain head. Use 100 to ensure enough blocks exist.
      const count = await rpc.getBlockCount();
      const lookback = Math.min(count, 100);
      if (lookback < 2) return; // Need at least 2 blocks
      const stats = await rpc.getBlockStats(1, lookback) as any;
      expect(stats).to.have.property('general').that.is.an('object');
      expect(stats).to.have.property('counts').that.is.an('object');
      expect(stats).to.have.property('totals').that.is.an('object');
      expect(stats).to.have.property('averages').that.is.an('object');
    });

    it('listResearcherAccounts returns researcher data', async () => {
      const accounts = await rpc.listResearcherAccounts() as any;
      expect(accounts).to.have.property('numberOfAccounts').that.is.a('number');
      expect(accounts).to.have.property('details').that.is.an('array');
    });

    it('listSettings returns current settings', async () => {
      const settings = await rpc.listSettings() as any;
      expect(settings).to.have.property('roConfigFileArgs').that.is.an('array');
      expect(settings).to.have.property('settingFileArgs').that.is.an('array');
      expect(settings).to.have.property('commandLineArgs').that.is.an('array');
    });

    it('listProtocolEntries returns protocol entries', async () => {
      const entries = await rpc.listProtocolEntries() as any;
      expect(entries).to.have.property('currentProtocolEntries').that.is.an('array');
    });

    it('listScrapers returns scraper list', async () => {
      const scrapers = await rpc.listScrapers() as any;
      expect(scrapers).to.have.property('currentScraperEntries').that.is.an('array');
    });

    it('currentContractAverage returns contract average', async () => {
      const avg = await rpc.currentContractAverage() as any;
      expect(avg).to.have.property('beaconCount').that.is.a('number');
      expect(avg).to.have.property('avgMag').that.is.a('number');
      expect(avg).to.have.property('beaconParticipantCount').that.is.a('number');
      expect(avg).to.have.property('superblockValid').that.is.a('boolean');
      expect(avg).to.have.property('quorumHash').that.is.a('string');
      expect(avg).to.have.property('size').that.is.a('number');
    });
  });

  // ──────────────────────────────────────────────
  // Voting (read-only queries)
  // ──────────────────────────────────────────────

  describe('voting (read-only)', () => {
    it('listPolls returns an array', async () => {
      const polls = await rpc.listPolls();
      expect(polls).to.be.an('array');
    });
  });
});
