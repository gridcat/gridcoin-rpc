import { expect } from 'chai';
import { IJsonRPC } from '../../src/lib/JsonRPC';
import { GridcoinRPC } from '../../src/GridcoinRPC';

/**
 * Mock JSON-RPC client that captures the last command and parameters sent.
 */
class JsonRPCMock implements IJsonRPC {
  public lastCommand = '';

  public lastParams: any[] = [];

  request(command: string, parameters: any[]): Promise<any> {
    this.lastCommand = command;
    this.lastParams = parameters;
    return Promise.resolve({ result: null, error: null });
  }
}

const configMock = { host: 'localhost', port: 1751 };

/**
 * Table-driven test: every public RPC method must map to the correct
 * command string and forward parameters in the right order.
 *
 * Each entry: { method, args (passed to the method), command (expected RPC string), params (expected filtered array) }
 *
 * Special cases:
 *   - Optional trailing args omitted → should NOT appear in params (undefined filtering)
 *   - addPoll joins answers with ';'
 *   - voteById spreads choices
 *   - Methods with default parameter values send those defaults
 */

interface CommandMapEntry {
  method: string;
  args: any[];
  command: string;
  params: any[];
}

// --- Wallet commands ---
const WALLET_COMMANDS: CommandMapEntry[] = [
  {
    method: 'addMultisigAddress',
    args: [2, ['addr1', 'addr2']],
    command: 'addmultisigaddress',
    params: [2, ['addr1', 'addr2']],
  }, {
    method: 'addRedeemScript',
    args: ['abcd'],
    command: 'addredeemscript',
    params: ['abcd'],
  }, {
    method: 'backupWallet',
    args: [],
    command: 'backupwallet',
    params: [],
  }, {
    method: 'burn',
    args: [1.5, 'cafe'],
    command: 'burn',
    params: [1.5, 'cafe'],
  }, {
    method: 'checkWallet',
    args: [],
    command: 'checkwallet',
    params: [],
  }, {
    method: 'claimHtlc',
    args: ['txid1', 0, 'preimage', 'destaddr'],
    command: 'claimhtlc',
    params: ['txid1', 0, 'preimage', 'destaddr'],
  }, {
    method: 'createHtlc',
    args: ['recv', 'send', 'hash', 100, 5.0],
    command: 'createhtlc',
    params: ['recv', 'send', 'hash', 100, 5.0],
  }, {
    method: 'createRawTransaction',
    args: [[{ txid: 'a', vout: 0 }], { addr: 1.0 }],
    command: 'createrawtransaction',
    params: [[{ txid: 'a', vout: 0 }], { addr: 1.0 }],
  }, {
    method: 'consolidateMsUnspent',
    args: ['addr', 100, 200],
    command: 'consolidatemsunspent',
    params: ['addr', 100, 200],
  }, {
    method: 'decodeRawTransaction',
    args: ['rawhex'],
    command: 'decoderawtransaction',
    params: ['rawhex'],
  }, {
    method: 'decodeScript',
    args: ['scripthex'],
    command: 'decodescript',
    params: ['scripthex'],
  }, {
    method: 'dumpPrivKey',
    args: ['myaddr'],
    command: 'dumpprivkey',
    params: ['myaddr'],
  }, {
    method: 'dumpWallet',
    args: ['file.dat'],
    command: 'dumpwallet',
    params: ['file.dat'],
  }, {
    method: 'encryptWallet',
    args: ['pass123'],
    command: 'encryptwallet',
    params: ['pass123'],
  }, {
    method: 'getAccount',
    args: ['addr1'],
    command: 'getaccount',
    params: ['addr1'],
  }, {
    method: 'getAccountAddress',
    args: ['myaccount'],
    command: 'getaccountaddress',
    params: ['myaccount'],
  }, {
    method: 'getAddressesByAccount',
    args: ['myaccount'],
    command: 'getaddressesbyaccount',
    params: ['myaccount'],
  }, {
    method: 'getBalance',
    args: [],
    command: 'getbalance',
    params: ['*', 1, false],
  }, {
    method: 'getBalanceDetail',
    args: [],
    command: 'getbalancedetail',
    params: [1, false],
  }, {
    method: 'getNewAddress',
    args: [],
    command: 'getnewaddress',
    params: [],
  }, {
    method: 'getNewPubkey',
    args: [],
    command: 'getnewpubkey',
    params: [],
  }, {
    method: 'getRawTransaction',
    args: ['txhash', true],
    command: 'getrawtransaction',
    params: ['txhash', true],
  }, {
    method: 'getRawWalletTransaction',
    args: ['txhash'],
    command: 'getrawwallettransaction',
    params: ['txhash'],
  }, {
    method: 'getReceivedByAccount',
    args: ['acc'],
    command: 'getreceivedbyaccount',
    params: ['acc', 1],
  }, {
    method: 'getReceivedByAddress',
    args: ['addr1'],
    command: 'getreceivedbyaddress',
    params: ['addr1', 1],
  }, {
    method: 'getTransaction',
    args: ['txhash'],
    command: 'gettransaction',
    params: ['txhash', false],
  }, {
    method: 'getUnconfirmedBalance',
    args: [],
    command: 'getunconfirmedbalance',
    params: [],
  }, {
    method: 'getWalletInfo',
    args: [],
    command: 'getwalletinfo',
    params: [],
  }, {
    method: 'importPrivKey',
    args: ['privkey', 'label', false],
    command: 'importprivkey',
    params: ['privkey', 'label', false],
  }, {
    method: 'importWallet',
    args: ['dump.dat'],
    command: 'importwallet',
    params: ['dump.dat'],
  }, {
    method: 'keyPoolRefill',
    args: [200],
    command: 'keypoolrefill',
    params: [200],
  }, {
    method: 'listAccounts',
    args: [],
    command: 'listaccounts',
    params: [1, false],
  }, {
    method: 'listAddressGroupings',
    args: [],
    command: 'listaddressgroupings',
    params: [],
  }, {
    method: 'listReceivedByAddress',
    args: [],
    command: 'listreceivedbyaddress',
    params: [1, false, false],
  }, {
    method: 'listSinceBlock',
    args: ['blockhash', 6],
    command: 'listsinceblock',
    params: ['blockhash', 6],
  }, {
    method: 'listStakes',
    args: [],
    command: 'liststakes',
    params: [10],
  }, {
    method: 'listTransactions',
    args: [],
    command: 'listtransactions',
    params: ['*', 10, 0, false],
  }, {
    method: 'listUnspent',
    args: [1, 9999],
    command: 'listunspent',
    params: [1, 9999],
  }, {
    method: 'consolidateUnspent',
    args: ['addr'],
    command: 'consolidateunspent',
    params: ['addr'],
  }, {
    method: 'makeKeyPair',
    args: [],
    command: 'makekeypair',
    params: [],
  }, {
    method: 'maintainBackups',
    args: [],
    command: 'maintainbackups',
    params: [],
  }, {
    method: 'rainByMagnitude',
    args: ['*', 100],
    command: 'rainbymagnitude',
    params: ['*', 100],
  }, {
    method: 'repairWallet',
    args: [],
    command: 'repairwallet',
    params: [],
  }, {
    method: 'resendTx',
    args: [],
    command: 'resendtx',
    params: [],
  }, {
    method: 'reserveBalance',
    args: [true, 50],
    command: 'reservebalance',
    params: [true, 50],
  }, {
    method: 'scanForUnspent',
    args: ['addr', 0, 1000],
    command: 'scanforunspent',
    params: ['addr', 0, 1000],
  }, {
    method: 'sendFrom',
    args: ['acc', 'addr', 10],
    command: 'sendfrom',
    params: ['acc', 'addr', 10],
  }, {
    method: 'sendMany',
    args: ['acc', { addr1: 1 }],
    command: 'sendmany',
    params: ['acc', { addr1: 1 }, 1],
  }, {
    method: 'sendRawTransaction',
    args: ['rawhex'],
    command: 'sendrawtransaction',
    params: ['rawhex'],
  }, {
    method: 'sendToAddress',
    args: ['addr', 5.0],
    command: 'sendtoaddress',
    params: ['addr', 5.0],
  }, {
    method: 'setAccount',
    args: ['addr', 'label'],
    command: 'setaccount',
    params: ['addr', 'label'],
  }, {
    method: 'setTXfee',
    args: [0.001],
    command: 'settxfee',
    params: [0.001],
  }, {
    method: 'signMessage',
    args: ['addr', 'hello'],
    command: 'signmessage',
    params: ['addr', 'hello'],
  }, {
    method: 'signRawTransaction',
    args: ['rawhex', null, null, 'ALL'],
    command: 'signrawtransaction',
    params: ['rawhex', null, null, 'ALL'],
  }, {
    method: 'validateAddress',
    args: ['addr'],
    command: 'validateaddress',
    params: ['addr'],
  }, {
    method: 'validatePubkey',
    args: ['pubhex'],
    command: 'validatepubkey',
    params: ['pubhex'],
  }, {
    method: 'verifyMessage',
    args: ['addr', 'sig', 'msg'],
    command: 'verifymessage',
    params: ['addr', 'sig', 'msg'],
  }, {
    method: 'walletLock',
    args: [],
    command: 'walletlock',
    params: [],
  }, {
    method: 'walletPassPhrase',
    args: ['pass', 600, true],
    command: 'walletpassphrase',
    params: ['pass', 600, true],
  }, {
    method: 'walletPassPhraseChange',
    args: ['old', 'new'],
    command: 'walletpassphrasechange',
    params: ['old', 'new'],
  }, {
    method: 'refundHtlc',
    args: ['txid', 0, 'dest'],
    command: 'refundhtlc',
    params: ['txid', 0, 'dest'],
  }, {
    method: 'setHdSeed',
    args: [true, 'wif_key'],
    command: 'sethdseed',
    params: [true, 'wif_key'],
  }, {
    method: 'upgradeWallet',
    args: [],
    command: 'upgradewallet',
    params: [],
  }, {
    method: 'walletDiagnose',
    args: [],
    command: 'walletdiagnose',
    params: [],
  },
];

// --- Mining/Staking commands ---
const MINING_COMMANDS: CommandMapEntry[] = [
  {
    method: 'advertiseBeacon',
    args: [true],
    command: 'advertisebeacon',
    params: [true],
  }, {
    method: 'advertiseBeaconV3',
    args: ['<xml>proof</xml>'],
    command: 'advertisebeaconv3',
    params: ['<xml>proof</xml>'],
  }, {
    method: 'beaconAuth',
    args: [],
    command: 'beaconauth',
    params: [],
  }, {
    method: 'beaconReport',
    args: [true],
    command: 'beaconreport',
    params: [true],
  }, {
    method: 'beaconConvergence',
    args: [],
    command: 'beaconconvergence',
    params: [],
  }, {
    method: 'beaconStatus',
    args: ['cpid1'],
    command: 'beaconstatus',
    params: ['cpid1'],
  }, {
    method: 'explainMagnitude',
    args: ['cpid1'],
    command: 'explainmagnitude',
    params: ['cpid1'],
  }, {
    method: 'getLastStake',
    args: [],
    command: 'getlaststake',
    params: [],
  }, {
    method: 'getStakingInfo',
    args: [],
    command: 'getstakinginfo',
    params: [],
  }, {
    method: 'createMrcRequest',
    args: [true, false, 0.5],
    command: 'createmrcrequest',
    params: [true, false, 0.5],
  }, {
    method: 'getMrcInfo',
    args: [true, '*', 100, 200],
    command: 'getmrcinfo',
    params: [true, '*', 100, 200],
  }, {
    method: 'getMiningInfo',
    args: [],
    command: 'getmininginfo',
    params: [],
  }, {
    method: 'lifetime',
    args: ['cpid1'],
    command: 'lifetime',
    params: ['cpid1'],
  }, {
    method: 'magnitude',
    args: ['cpid1'],
    command: 'magnitude',
    params: ['cpid1'],
  }, {
    method: 'pendingBeaconReport',
    args: [],
    command: 'pendingbeaconreport',
    params: [],
  }, {
    method: 'resetCPIDs',
    args: [],
    command: 'resetcpids',
    params: [],
  }, {
    method: 'revokeBeacon',
    args: ['cpid1'],
    command: 'revokebeacon',
    params: ['cpid1'],
  }, {
    method: 'superblockAge',
    args: [],
    command: 'superblockage',
    params: [],
  }, {
    method: 'superBlocks',
    args: [14, true, 'cpid1'],
    command: 'superblocks',
    params: [14, true, 'cpid1'],
  },
];

// --- Network commands ---
const NETWORK_COMMANDS: CommandMapEntry[] = [
  {
    method: 'addNode',
    args: ['1.2.3.4', 'add'],
    command: 'addnode',
    params: ['1.2.3.4', 'add'],
  }, {
    method: 'askForOutstandingBlocks',
    args: [],
    command: 'askforoutstandingblocks',
    params: [],
  }, {
    method: 'clearBanned',
    args: [],
    command: 'clearbanned',
    params: [],
  }, {
    method: 'currentTime',
    args: [],
    command: 'currenttime',
    params: [],
  }, {
    method: 'getAddedNodeInfo',
    args: [true, '1.2.3.4'],
    command: 'getaddednodeinfo',
    params: [true, '1.2.3.4'],
  }, {
    method: 'getBestBlockhash',
    args: [],
    command: 'getbestblockhash',
    params: [],
  }, {
    method: 'getBlock',
    args: ['hash123', false],
    command: 'getblock',
    params: ['hash123', false],
  }, {
    method: 'getBlockByNumber',
    args: [100, true],
    command: 'getblockbynumber',
    params: [100, true],
  }, {
    method: 'getBlockByMinTime',
    args: [1700000000],
    command: 'getblockbymintime',
    params: [1700000000],
  }, {
    method: 'getBlocksBatch',
    args: [100, 10],
    command: 'getblocksbatch',
    params: [100, 10],
  }, {
    method: 'getBlockchainInfo',
    args: [],
    command: 'getblockchaininfo',
    params: [],
  }, {
    method: 'getBlockCount',
    args: [],
    command: 'getblockcount',
    params: [],
  }, {
    method: 'getBlockHash',
    args: [100],
    command: 'getblockhash',
    params: [100],
  }, {
    method: 'getBurnReport',
    args: [],
    command: 'getburnreport',
    params: [],
  }, {
    method: 'getCheckpoint',
    args: [],
    command: 'getcheckpoint',
    params: [],
  }, {
    method: 'getConnectionCount',
    args: [],
    command: 'getconnectioncount',
    params: [],
  }, {
    method: 'getDifficulty',
    args: [],
    command: 'getdifficulty',
    params: [],
  }, {
    method: 'getInfo',
    args: [],
    command: 'getinfo',
    params: [],
  }, {
    method: 'getNetTotals',
    args: [],
    command: 'getnettotals',
    params: [],
  }, {
    method: 'getNetworkInfo',
    args: [],
    command: 'getnetworkinfo',
    params: [],
  }, {
    method: 'getNodeAddresses',
    args: [5],
    command: 'getnodeaddresses',
    params: [5],
  }, {
    method: 'getPeerInfo',
    args: [],
    command: 'getpeerinfo',
    params: [],
  }, {
    method: 'getRawMemPool',
    args: [],
    command: 'getrawmempool',
    params: [],
  }, {
    method: 'listBanned',
    args: [],
    command: 'listbanned',
    params: [],
  }, {
    method: 'networkTime',
    args: [],
    command: 'networktime',
    params: [],
  }, {
    method: 'ping',
    args: [],
    command: 'ping',
    params: [],
  }, {
    method: 'setBan',
    args: ['1.2.3.0/24', 'add', 3600],
    command: 'setban',
    params: ['1.2.3.0/24', 'add', 3600],
  }, {
    method: 'showBlock',
    args: [100],
    command: 'showblock',
    params: [100],
  }, {
    method: 'stop',
    args: [],
    command: 'stop',
    params: [],
  },
];

// --- Voting commands ---
const VOTING_COMMANDS: CommandMapEntry[] = [
  {
    method: 'addPoll',
    args: ['survey', 'Title', 30, 'Question?', ['yes', 'no'], 1, 1, 'http://example.com'],
    command: 'addpoll',
    params: ['survey', 'Title', 30, 'Question?', 'yes;no', 1, 1, 'http://example.com'],
  }, {
    method: 'getPollResults',
    args: ['poll_id'],
    command: 'getpollresults',
    params: ['poll_id'],
  }, {
    method: 'getVotingClaim',
    args: ['claim_id'],
    command: 'getvotingclaim',
    params: ['claim_id'],
  }, {
    method: 'listPolls',
    args: [true],
    command: 'listpolls',
    params: [true],
  }, {
    method: 'voteById',
    args: ['poll_id', 1, 2],
    command: 'votebyid',
    params: ['poll_id', 1, 2],
  }, {
    method: 'voteDetails',
    args: ['poll_id'],
    command: 'votedetails',
    params: ['poll_id'],
  }, {
    method: 'testPollNotification',
    args: ['txid'],
    command: 'testpollnotification',
    params: ['txid'],
  },
];

// --- Developer commands ---
const DEVELOPER_COMMANDS: CommandMapEntry[] = [
  {
    method: 'auditSnapshotAccrual',
    args: ['cpid1', true],
    command: 'auditsnapshotaccrual',
    params: ['cpid1', true],
  }, {
    method: 'auditSnapshotAccruals',
    args: [true],
    command: 'auditsnapshotaccruals',
    params: [true],
  }, {
    method: 'addKey',
    args: ['add', 'project', 'name', 'url'],
    command: 'addkey',
    params: ['add', 'project', 'name', 'url'],
  }, {
    method: 'currentContractAverage',
    args: [],
    command: 'currentcontractaverage',
    params: [],
  }, {
    method: 'debug',
    args: [true],
    command: 'debug',
    params: [true],
  }, {
    method: 'beaconAudit',
    args: [],
    command: 'beaconaudit',
    params: [],
  }, {
    method: 'changeSettings',
    args: ['key', 'val'],
    command: 'changesettings',
    params: ['key', 'val'],
  }, {
    method: 'convergenceReport',
    args: [],
    command: 'convergencereport',
    params: [],
  }, {
    method: 'dumpContracts',
    args: [],
    command: 'dumpcontracts',
    params: [],
  }, {
    method: 'exportStats',
    args: [],
    command: 'exportstats1',
    params: [],
  }, {
    method: 'getBlockStats',
    args: [0, 100, 200],
    command: 'getblockstats',
    params: [0, 100, 200],
  }, {
    method: 'getAutoGreylist',
    args: [],
    command: 'getautogreylist',
    params: [],
  }, {
    method: 'getMpart',
    args: ['hash1'],
    command: 'getmpart',
    params: ['hash1'],
  }, {
    method: 'getRecentBlocks',
    args: [10],
    command: 'getrecentblocks',
    params: [10],
  }, {
    method: 'inspectAccrualSnapshot',
    args: [500],
    command: 'inspectaccrualsnapshot',
    params: [500],
  }, {
    method: 'listAlerts',
    args: [],
    command: 'listalerts',
    params: [],
  }, {
    method: 'listProjects',
    args: [],
    command: 'listprojects',
    params: [],
  }, {
    method: 'listResearcherAccounts',
    args: [],
    command: 'listresearcheraccounts',
    params: [],
  }, {
    method: 'listScrapers',
    args: [],
    command: 'listscrapers',
    params: [],
  }, {
    method: 'listSideStakes',
    args: [],
    command: 'listsidestakes',
    params: [],
  }, {
    method: 'listMandatorySideStakes',
    args: [],
    command: 'listmandatorysidestakes',
    params: [],
  }, {
    method: 'listProtocolEntries',
    args: [],
    command: 'listprotocolentries',
    params: [],
  }, {
    method: 'listSettings',
    args: [],
    command: 'listsettings',
    params: [],
  }, {
    method: 'logging',
    args: ['all', 'net'],
    command: 'logging',
    params: ['all', 'net'],
  }, {
    method: 'network',
    args: [],
    command: 'network',
    params: [],
  }, {
    method: 'parseAccrualSnapshotFile',
    args: ['file.dat'],
    command: 'parseaccrualsnapshotfile',
    params: ['file.dat'],
  }, {
    method: 'parseLegacySb',
    args: ['data'],
    command: 'parselegacysb',
    params: ['data'],
  }, {
    method: 'projects',
    args: [],
    command: 'projects',
    params: [],
  }, {
    method: 'readData',
    args: ['key1'],
    command: 'readdata',
    params: ['key1'],
  }, {
    method: 'reorganize',
    args: [500],
    command: 'reorganize',
    params: [500],
  }, {
    method: 'sendAlert',
    args: ['pk', 'ak', 1, 2, 3, 'comment', 'status'],
    command: 'sendalert',
    params: ['pk', 'ak', 1, 2, 3, 'comment', 'status'],
  }, {
    method: 'sendAlert2',
    args: ['pk', 'ak', 1, 2, 3, 'comment', 'status'],
    command: 'sendalert2',
    params: ['pk', 'ak', 1, 2, 3, 'comment', 'status'],
  }, {
    method: 'sendBlock',
    args: ['blockdata'],
    command: 'sendblock',
    params: ['blockdata'],
  }, {
    method: 'superblockAverage',
    args: [],
    command: 'superblockaverage',
    params: [],
  }, {
    method: 'versionReport',
    args: [100, true],
    command: 'versionreport',
    params: [100, true],
  }, {
    method: 'writeData',
    args: ['key1', 'val1'],
    command: 'writedata',
    params: ['key1', 'val1'],
  }, {
    method: 'listManifests',
    args: [true],
    command: 'listmanifests',
    params: [true],
  }, {
    method: 'sendScraperFileManifest',
    args: [],
    command: 'sendscraperfilemanifest',
    params: [],
  }, {
    method: 'saveScraperFileManifest',
    args: [],
    command: 'savescraperfilemanifest',
    params: [],
  }, {
    method: 'deleteCScraperManifest',
    args: ['hash1'],
    command: 'deletecscrapermanifest',
    params: ['hash1'],
  }, {
    method: 'archiveLog',
    args: ['debug'],
    command: 'archivelog',
    params: ['debug'],
  }, {
    method: 'testNewSb',
    args: [],
    command: 'testnewsb',
    params: [],
  }, {
    method: 'scrapeReport',
    args: [],
    command: 'scraperreport',
    params: [],
  },
];

const ALL_COMMANDS = [
  { category: 'Wallet', entries: WALLET_COMMANDS },
  { category: 'Mining', entries: MINING_COMMANDS },
  { category: 'Network', entries: NETWORK_COMMANDS },
  { category: 'Voting', entries: VOTING_COMMANDS },
  { category: 'Developer', entries: DEVELOPER_COMMANDS },
];

describe('Command Mapping', () => {
  let mock: JsonRPCMock;
  let rpc: GridcoinRPC;

  beforeEach(() => {
    mock = new JsonRPCMock();
    rpc = new GridcoinRPC(configMock, mock);
  });

  ALL_COMMANDS.forEach(({ category, entries }) => {
    describe(category, () => {
      entries.forEach(({
        method, args, command, params,
      }) => {
        it(`${method}() → '${command}'`, async () => {
          await (rpc as any)[method](...args);
          expect(mock.lastCommand).to.equal(command);
          expect(mock.lastParams).to.deep.equal(params);
        });
      });
    });
  });

  // Verify addPoll specifically joins answers with semicolons
  describe('special parameter handling', () => {
    it('addPoll joins answers array with semicolons', async () => {
      await (rpc as any).addPoll('survey', 'T', 30, 'Q', ['a', 'b', 'c'], 1, 1, 'http://x');
      expect(mock.lastParams[4]).to.equal('a;b;c');
    });

    it('addPoll passes empty string for empty answers', async () => {
      await (rpc as any).addPoll('survey', 'T', 30, 'Q', [], 1, 1, 'http://x');
      expect(mock.lastParams[4]).to.equal('');
    });

    it('voteById spreads multiple choices', async () => {
      await (rpc as any).voteById('poll', 0, 1, 2);
      expect(mock.lastCommand).to.equal('votebyid');
      expect(mock.lastParams).to.deep.equal(['poll', 0, 1, 2]);
    });

    it('listUnspent spreads address arguments', async () => {
      await (rpc as any).listUnspent(1, 9999, 'addr1', 'addr2');
      expect(mock.lastParams).to.deep.equal([1, 9999, 'addr1', 'addr2']);
    });
  });
});
