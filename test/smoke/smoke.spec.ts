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
 *   GRC_RPC_VERSION  - Expected daemon version prefix (default: 'v5.5.2')
 *   GRC_RPC_TIMEOUT  - Per-test timeout in milliseconds (default: 120000)
 *   GRC_RPC_SSL      - Set to 'true' to use HTTPS (default: false)
 *
 * Run:
 *   GRC_RPC_HOST=x GRC_RPC_PORT=x GRC_RPC_USER=x GRC_RPC_PASS=x npm run test:smoke
 */

import { expect } from 'chai';
import { GridcoinRPC } from '../../src/GridcoinRPC';
import type { TransactionUnspent } from '../../src/contracts/transactionUnspent';

// Daemon error codes (src/rpc/protocol.h)
const RPC_WALLET_ERROR = -4;
const RPC_INVALID_ADDRESS_OR_KEY = -5;
const RPC_WALLET_UNLOCK_NEEDED = -13;

const HEX = /^[0-9a-f]+$/;

// Funding and signing RPCs need a fully unlocked wallet. On a locked or
// staking-only wallet the daemon answers "unlock needed", which still proves
// the method exists and accepted our parameters; anything else is a failure.
function allowUnlockNeeded(e: any): void {
  if (e?.code !== RPC_WALLET_UNLOCK_NEEDED) throw e;
  console.warn(`wallet not fully unlocked, only checked the RPC is wired: ${e.message}`);
}

const HOST = process.env.GRC_RPC_HOST || '';
const PORT = parseInt(process.env.GRC_RPC_PORT || '0', 10);
const USER = process.env.GRC_RPC_USER || '';
const PASS = process.env.GRC_RPC_PASS || '';
const USE_SSL = process.env.GRC_RPC_SSL === 'true';
const EXPECTED_VERSION = process.env.GRC_RPC_VERSION || 'v5.5.2';
const configuredTimeout = Number.parseInt(process.env.GRC_RPC_TIMEOUT || '120000', 10);
const SMOKE_TIMEOUT = Number.isFinite(configuredTimeout) && configuredTimeout > 0
  ? configuredTimeout
  : 120000;
const EXPECTED_VERSION_PATTERN = new RegExp(`^${EXPECTED_VERSION.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`);

const isConfigured = HOST && PORT;

const describeSmoke = isConfigured ? describe : describe.skip;

// Some read-only diagnostic RPCs scan wallet or chain state and can exceed the
// normal unit-test timeout on a busy daemon. Keep the value configurable for CI.
jest.setTimeout(SMOKE_TIMEOUT);

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
    it(`daemon version should start with ${EXPECTED_VERSION}`, async () => {
      const info = await rpc.getInfo();
      expect(info).to.have.property('version');
      expect((info as any).version).to.match(EXPECTED_VERSION_PATTERN);
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

  // ──────────────────────────────────────────────
  // Gridcoin 5.5.2.0 RPCs.
  // transactions are built, signed and checked with
  // testmempoolaccept, then thrown away.
  // ──────────────────────────────────────────────

  describe('5.5.2.0 RPCs (no broadcast)', () => {
    let utxo: TransactionUnspent | undefined;

    beforeAll(async () => {
      [utxo] = (await rpc.listUnspent(1)).filter((u) => u.address);
    });

    it('getClockStats reports the network time quorum', async () => {
      const stats = await rpc.getClockStats();
      expect(stats).to.have.property('timeQuorum').that.is.a('boolean');
      expect(stats).to.have.property('offset').that.is.a('number');
      expect(stats).to.have.property('peerMedian').that.is.a('number');
      expect(stats).to.have.property('blocksSeen').that.is.a('number');
    });

    it('getMempoolInfo returns pool statistics', async () => {
      const info = await rpc.getMempoolInfo();
      expect(info).to.have.property('size').that.is.a('number');
      expect(info).to.have.property('bytes').that.is.a('number');
      expect(info).to.have.property('maxmempool').that.is.a('number');
      expect(info).to.have.property('unbroadcastcount').that.is.a('number');
    });

    it('getMempoolEntry describes a pooled transaction', async () => {
      const pool = await rpc.getRawMemPool();
      if (pool.length === 0) return; // an empty testnet pool is normal
      try {
        const entry = await rpc.getMempoolEntry(pool[0]);
        expect(entry).to.have.property('size').that.is.a('number');
        expect(entry).to.have.property('fee').that.is.a('number');
        expect(entry).to.have.property('time').that.is.a('number');
        expect(entry).to.have.property('contractTypes').that.is.an('array');
      } catch (e: any) {
        // The tx can be mined between the two calls
        if (e?.code !== RPC_INVALID_ADDRESS_OR_KEY) throw e;
      }
    });

    it('getTxOutProof and verifyTxOutProof round-trip a block 1 transaction', async () => {
      const hash = await rpc.getBlockHash(1);
      const block = await rpc.getBlock(hash, true);
      const { txid } = block.tx[0];
      const proof = await rpc.getTxOutProof([txid], hash);
      expect(proof).to.match(HEX);
      const proven = await rpc.verifyTxOutProof(proof);
      expect(proven).to.deep.equal([txid]);
    });

    it('getRawProjectStatus returns project entries', async () => {
      const projects = await rpc.getRawProjectStatus();
      expect(projects).to.be.an('object');
      const names = Object.keys(projects);
      if (names.length > 0) {
        expect(projects[names[0]]).to.have.property('displayName').that.is.a('string');
        expect(projects[names[0]]).to.have.property('status').that.is.a('string');
      }
    });

    it('inspectWalletState summarises wallet transactions', async () => {
      const state = await rpc.inspectWalletState();
      expect(state).to.have.property('totalTransactions').that.is.a('number');
      expect(state).to.have.nested.property('stateCounts.confirmed').that.is.a('number');
      expect(state).to.have.nested.property('balanceCalculation.calculatedBalance').that.is.a('number');
    });

    it('getSeedPhraseInfo and a sweepUncoveredCoins dry run', async () => {
      // Never call dumpseedphrase here: a failed assertion would print the
      // phrase into the CI log.
      const info = await rpc.getSeedPhraseInfo();
      expect(info).to.have.property('hasSeedPhrase').that.is.a('boolean');
      try {
        const preview = await rpc.sweepUncoveredCoins(null, null, true);
        expect(info.hasSeedPhrase).to.equal(true);
        expect(preview.dryRun).to.equal(true);
        expect(preview.txid).to.equal(undefined);
        expect(preview).to.have.property('sweptUtxos').that.is.a('number');
      } catch (e: any) {
        // A wallet made before 5.5.2.0 has no phrase, and dust can't pay the fee
        if (e?.code !== RPC_WALLET_ERROR) throw e;
        expect(e.message).to.match(/does not have a seed phrase|not enough to pay/);
      }
    });

    it('createPsgt round-trips through decode, analyze, update, combine and finalize', async () => {
      if (!utxo) return; // needs one confirmed coin to reference
      const input = { txid: utxo.txid, vout: utxo.vout };
      const psgt = await rpc.createPsgt([input], { [utxo.address]: 0.001 });
      expect(psgt).to.be.a('string');

      const decoded = await rpc.decodePsgt(psgt);
      expect(decoded.tx.vin).to.have.length(1);
      expect(decoded.tx.vin[0].txid).to.equal(utxo.txid);

      const analysis = await rpc.analyzePsgt(psgt);
      expect(analysis.inputs).to.have.length(1);
      expect(analysis.next).to.be.a('string');

      const updated = await rpc.utxoUpdatePsgt(psgt);
      expect(updated).to.be.a('string');
      const combined = await rpc.combinePsgt([psgt, updated]);
      expect(combined).to.be.a('string');

      const finalized = await rpc.finalizePsgt(combined);
      expect(finalized.complete).to.equal(false); // nobody signed it
    });

    it('convertToPsgt wraps an unsigned raw transaction', async () => {
      if (!utxo) return;
      const raw = await rpc.createRawTransaction([{ txid: utxo.txid, vout: utxo.vout }], { [utxo.address]: 0.001 });
      const psgt = await rpc.convertToPsgt(raw);
      const decoded = await rpc.decodePsgt(psgt);
      expect(decoded.tx.vin[0].txid).to.equal(utxo.txid);
    });

    it('testMempoolAccept rejects an unsigned transaction', async () => {
      if (!utxo) return;
      const raw = await rpc.createRawTransaction([{ txid: utxo.txid, vout: utxo.vout }], { [utxo.address]: 0.001 });
      const [result] = await rpc.testMempoolAccept([raw]);
      expect(result).to.have.property('txid').that.is.a('string');
      expect(result.allowed).to.equal(false);
    });

    it('fundRawTransaction, signRawTransactionWithWallet and testMempoolAccept accept a real spend', async () => {
      if (!utxo) return;
      // fundrawtransaction refuses a tx that already has inputs
      const raw = await rpc.createRawTransaction([], { [utxo.address]: 0.001 });
      try {
        const funded = await rpc.fundRawTransaction(raw);
        expect(funded.hex).to.match(HEX);
        expect(funded.fee).to.be.a('number');
        const signed = await rpc.signRawTransactionWithWallet(funded.hex);
        expect(signed.complete).to.equal(true);
        const [result] = await rpc.testMempoolAccept([signed.hex]);
        expect(result.allowed).to.equal(true);
      } catch (e: any) {
        allowUnlockNeeded(e);
      }
    });

    it('walletCreateFundedPsgt, walletProcessPsgt and finalizePsgt complete a spend', async () => {
      if (!utxo) return;
      try {
        const funded = await rpc.walletCreateFundedPsgt([], { [utxo.address]: 0.001 }, null, false);
        expect(funded.psgt).to.be.a('string');
        expect(funded.fee).to.be.a('number');
        const processed = await rpc.walletProcessPsgt(funded.psgt);
        expect(processed.complete).to.equal(true);
        const finalized = await rpc.finalizePsgt(processed.psgt);
        expect(finalized.complete).to.equal(true);
        expect(finalized.hex).to.match(HEX);
        const [result] = await rpc.testMempoolAccept([finalized.hex as string]);
        expect(result.allowed).to.equal(true);
      } catch (e: any) {
        allowUnlockNeeded(e);
      }
    });
  });
});
