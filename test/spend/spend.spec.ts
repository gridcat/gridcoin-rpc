/**
 * Spending smoke tests against a live Gridcoin-Research testnet wallet.
 *
 * These broadcast real transactions: a tiny burn, and small sends back to the
 * wallet itself. Each run costs roughly 0.005 tGRC in burn and fees. The wallet
 * must be fully unlocked and hold at least MIN_BALANCE.
 *
 * Required environment variables (same as test/smoke):
 *   GRC_RPC_HOST, GRC_RPC_PORT, GRC_RPC_USER, GRC_RPC_PASS
 *   GRC_SMOKE_SPEND  - must be 'true'; a guard so a stray `jest` run with the
 *                      RPC variables set does not spend
 *
 * Run:
 *   GRC_SMOKE_SPEND=true GRC_RPC_HOST=x ... npm run test:spend
 */

import { expect } from 'chai';
import { GridcoinRPC } from '../../src/GridcoinRPC';

const HOST = process.env.GRC_RPC_HOST || '';
const PORT = parseInt(process.env.GRC_RPC_PORT || '0', 10);
const USER = process.env.GRC_RPC_USER || '';
const PASS = process.env.GRC_RPC_PASS || '';
const USE_SSL = process.env.GRC_RPC_SSL === 'true';
const SPEND_ENABLED = process.env.GRC_SMOKE_SPEND === 'true';

const describeSpend = HOST && PORT && SPEND_ENABLED ? describe : describe.skip;

const MIN_BALANCE = 1;
const SEND_AMOUNT = 0.01;
const BURN_AMOUNT = 0.001;
// Not a stamp prefix (5ea1ed / f055aa), so stamp scrapers ignore it
const BURN_DATA = Buffer.from('gridcoin-rpc smoke').toString('hex');
// Label of an address that never receives coins, for the splitunspent no-op
const EMPTY_LABEL = 'gridcoin-rpc-smoke-empty';

const RPC_INVALID_ADDRESS_OR_KEY = -5;
const RPC_WALLET_INVALID_LABEL_NAME = -11;
const TXID = /^[0-9a-f]{64}$/;

jest.setTimeout(120000);

describeSpend('Spend smoke tests (live testnet wallet)', () => {
  let rpc: GridcoinRPC;
  let address: string;

  // The tx can be mined between broadcast and this lookup; that is fine.
  const expectInMempool = async (txid: string) => {
    try {
      const entry = await rpc.getMempoolEntry(txid);
      expect(entry).to.have.property('fee').that.is.a('number');
      expect(entry).to.have.property('unbroadcast').that.is.a('boolean');
    } catch (e: any) {
      if (e?.code !== RPC_INVALID_ADDRESS_OR_KEY) throw e;
    }
  };

  beforeAll(async () => {
    rpc = new GridcoinRPC({
      host: HOST,
      port: PORT,
      username: USER,
      password: PASS,
      ssl: USE_SSL,
      sslStrict: false,
    });

    const balance = await rpc.getBalance();
    if (balance < MIN_BALANCE) {
      throw new Error(`spend wallet holds ${balance} tGRC, needs at least ${MIN_BALANCE}`);
    }
    // Send to an address the wallet already uses, so runs don't grow the keypool
    const [utxo] = (await rpc.listUnspent(1)).filter((u) => u.address);
    address = utxo.address;
  });

  it('burn sends GRC to an OP_RETURN output', async () => {
    const txid = await rpc.burn(BURN_AMOUNT, BURN_DATA);
    expect(txid).to.match(TXID);
    const tx = await rpc.getTransaction(txid);
    expect(tx).to.have.property('txid', txid);
    await expectInMempool(txid);
  });

  it('sendToAddress pays the wallet itself', async () => {
    const txid = await rpc.sendToAddress(address, SEND_AMOUNT);
    expect(txid).to.match(TXID);
    await expectInMempool(txid);
  });

  it('fundRawTransaction, signRawTransactionWithWallet and sendRawTransaction broadcast a spend', async () => {
    const raw = await rpc.createRawTransaction([], { [address]: SEND_AMOUNT });
    const funded = await rpc.fundRawTransaction(raw);
    const signed = await rpc.signRawTransactionWithWallet(funded.hex);
    expect(signed.complete).to.equal(true);
    const txid = await rpc.sendRawTransaction(signed.hex);
    expect(txid).to.match(TXID);
    await expectInMempool(txid);
  });

  it('a wallet-funded PSGT is signed, finalized and broadcast', async () => {
    const funded = await rpc.walletCreateFundedPsgt([], { [address]: SEND_AMOUNT }, null, false);
    const processed = await rpc.walletProcessPsgt(funded.psgt);
    expect(processed.complete).to.equal(true);
    const finalized = await rpc.finalizePsgt(processed.psgt);
    expect(finalized.complete).to.equal(true);
    const txid = await rpc.sendRawTransaction(finalized.hex as string);
    expect(txid).to.match(TXID);
    await expectInMempool(txid);
  });

  it('splitUnspent on an empty address has nothing to split', async () => {
    // A real split makes pieces of at least 800 GRC, so only the no-op is tested.
    // 5.5.2.0 refuses getaccountaddress without enableaccounts=1, so the address
    // is found by label and created on the first run only.
    let empty: string;
    try {
      [empty] = Object.keys(await rpc.getAddressesByLabel(EMPTY_LABEL));
    } catch (e: any) {
      if (e?.code !== RPC_WALLET_INVALID_LABEL_NAME) throw e;
      empty = await rpc.getNewAddress(EMPTY_LABEL);
    }
    const result = await rpc.splitUnspent(empty);
    expect(result.result).to.equal(false);
    expect(result.utxosSwept).to.equal(0);
  });
});
