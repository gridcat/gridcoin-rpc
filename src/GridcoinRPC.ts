const jayson = require('jayson/promise')
import IConfig from './contracts/config'
import IDifficulty from './contracts/difficulty'
import ICpid from './contracts/cpid'
import IBeaconStatus from './contracts/beaconStatus'
import IMiningInfo from './contracts/miningInfo'
import IOwnership from './contracts/ownership'
import IRsaWeight from './contracts/rsaWeight'
import IStakeTime from './contracts/stakeTime'
import ISuperBlockAge from './contracts/superBlockAge'
import ITime from './contracts/time'
import IBlock from './contracts/block'
import IBlockChainInfo from './contracts/blockChainInfo'
import ICheckpoint from './contracts/checkpoint'
import IInfo from './contracts/info'
import INetTotals from './contracts/netTotals'
import INetworkInfo from './contracts/networkInfo'
import IPeer from './contracts/peer'
import IPollDetails from './contracts/pollDetails'
import IPoll from './contracts/poll'
import IMemoryPool from './contracts/memoryPool'
import INode from './contracts/node'
import IBackupPrivateKeys from './contracts/backupPrivateKeys'
import IBackupWallet from './contracts/backupWallet'
import IInput from './contracts/input'
import IOutput from './contracts/output'
import ITransaction from './contracts/transaction'
import IScript from './contracts/script'

// square brackets [optional option]
// angle brackets <required argument>
// curly braces {default values}
// parenthesis (miscellaneous info)

function filterParameters(parameters: Array<any>): Array<any> {
  return parameters.filter(element => element !== undefined)
}

type callParameters = string | number | boolean | undefined | Array<string>

class GridcoinRPC {
  private readonly client: any

  constructor(config: IConfig) {
    this.client = new jayson.client.http(config)
  }

  /**
   * Send command to rpc server, get response
   * @param command
   * @param parameters
   */
  private call(command: string, ...parameters: Array<callParameters>): Promise<any> {
    const filteredParameters: Array<any> = filterParameters(parameters)
    return this.client.request(command, filteredParameters).then((result: any) => result.result)
  }

  /**
   * Add a nrequired-to-sign multisignature address to the wallet.
   * @description
   * Each key is a Gridcoin address or hex-encoded public key.
   * If [account] is specified, assign address to [account].
   *
   * @param {number} nrequired - The minimum (m) number of signatures required to spend this m-of-n multisig script.
   * @param {Array<string>} keys - A public key against which signatures will be checked.
   * @param {string} [account] - The account name in which the address should be stored. Leave blank for the default account.
   * @returns
   * @memberof GridcoinRPC
   */
  public addMultisigAddress(
    nrequired: number,
    keys: Array<string>,
    account?: string
  ): Promise<string> {
    return this.call('addmultisigaddress', nrequired, keys, account)
  }

  /**
   * @todo not clear
   * @param redeemScript
   * @param account
   */
  public addRedeemScript(redeemScript: any, account?: string) {
    return this.call('addredeemscript')
  }

  /**
   * Backup wallet private keys to a file.
   * Requires unlocked wallet
   *
   * @param {string} [destination] - Destination path
   * @returns {Promise<IBackupPrivateKeys>}
   * @memberof GridcoinRPC
   */
  public backupPrivateKeys(destination?: string): Promise<IBackupPrivateKeys> {
    return this.call('backupprivatekeys', destination)
  }

  /**
   * Safely copies wallet.dat to destination, which can be a directory or a path with filename.
   * Requires unlocked wallet
   *
   * @param {string} [destination] - Destination path for data backup
   * @returns {Promise<IBackupWallet>}
   * @memberof GridcoinRPC
   */
  public backupWallet(destination?: string): Promise<IBackupWallet> {
    return this.call('backupwallet')
  }

  /**
   * Burns coins to the network.
   * Requires unlocked wallet
   *
   * @param {number} amount - Amount to be burned down
   * @param {string} [hexString]
   * @returns {Promise<string>}
   * @memberof GridcoinRPC
   */
  public burn(amount: number, hexString?: string): Promise<string> {
    return this.call('burn', amount, hexString)
  }

  /**
   * @todo Unknown
   *
   * @param {string} burnAddress
   * @param {number} burnAmount
   * @param {*} burnKey
   * @param {*} burnDetail
   * @returns
   * @memberof GridcoinRPC
   */
  public burn2(burnAddress: string, burnAmount: number, burnKey: any, burnDetail: any) {
    return this.call('burn2', burnAddress, burnAmount, burnKey, burnDetail)
  }

  /**
   * Checks wallet.dat file to ensure it is not missing any coins.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public checkWallet(): Promise<Object> {
    return this.call('checkwallet')
  }

  /**
   * @todo Try this out
   * Create a transaction spending the given inputs and creating new outputs.
   * Outputs can be addresses or data.
   * Returns hex-encoded raw transaction.
   * Note that the transaction's inputs are not signed, and
   * it is not stored in the wallet or transmitted to the network.
   *
   * @param {Array<IInput>} inputs - A json array of json objects
   * @param {IOutput} output - a json object with outputs
   * @returns {Promise<string>} - hex string of the transaction
   * @memberof GridcoinRPC
   */
  public createRawTransaction(inputs: Array<IInput>, output: IOutput): Promise<string> {
    return this.call('createrawtransaction')
  }

  /**
   * Produces a human-readable JSON object for a raw transaction.
   *
   * @param {string} hexString
   * @returns {Promise<ITransaction>}
   * @memberof GridcoinRPC
   */
  public decodeRawTransaction(hex: string): Promise<ITransaction> {
    return this.call('decoderawtransaction', hex)
  }

  /**
   * Decode a hex-encoded script.
   *
   * @param {string} hex - HEX encoded script
   * @returns {Promise<IScript>}
   * @memberof GridcoinRPC
   */
  public decodeScript(hex: string): Promise<IScript> {
    return this.call('decodescript', hex)
  }

  /**
   * Reveals the private key corresponding to 'address'.
   * Then the importPrivKey can be used with this output
   *
   * @param {string} gridcoinAddress - The gridcoin address for the private key
   * @returns {Promise<string>} The private key
   * @memberof GridcoinRPC
   */
  public dumpPrivKey(gridcoinAddress: string): Promise<string> {
    return this.call('dumpprivkey', gridcoinAddress)
  }

  /**
   * Dumps wallet to a specified filename.
   * Requires unlocked wallet
   *
   * @param {string} filename
   * @returns {Promise<null>}
   * @memberof GridcoinRPC
   */
  public dumpWallet(filename: string): Promise<null> {
    return this.call('dumpwallet', filename)
  }

  public encrypt(walletPassPhrase: string) {
    return this.call('encrypt', walletPassPhrase)
  }

  /********************************************
   *
   *          NETWORK
   *
   ********************************************/

  /**
   * Attempts add or remove <node> from the addnode list or try a connection to <node> once.
   * @todo Can throw error
   * @param {string} node hostname/IP address and port of node to add or remove.
   *  The node to add as a string in the form of <IP address>:<port>.
   *  The IP address may be a hostname resolvable through DNS,
   *  an IPv4 address, an IPv4-as-IPv6 address, or an IPv6 address.
   * @param {string} action whether to add or remove the node, or to try only once to connect
   *  What to do with the IP address above.
   *  Options are:
   *  - 'add' to add a node to the addnode list, this will not connect immediately if the outgoing connection slots are full.
   *  - 'remove' to remove a node from the list, if currently connected, this will disconnect immediately.
   *  - 'onetry' to immediately attempt connection to the node even if the outgoing connection slots are full; this will only attempt the connection once.
   * @example
   * rpc.addNode('192.168.2.1', 'onetry').then(res => console.log(res));
   */
  public addNode(node: string, action: 'add' | 'remove' | 'onetry'): Promise<Object> {
    return this.call('addnode', node, action)
  }

  /**
   * Add a poll to the network. Requires 100K GRC balance
   * Requires unlocked wallet
   * @todo implement
   */
  public addPoll() {}

  /**
   * Force ask for outstandingblocks from network.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public askForOutstandingBlocks(): Promise<Object> {
    return this.call('askforoutstandingblocks')
  }

  /**
   * Displays UTC Unix time as well as date and time in UTC.
   *
   * @returns {Promise<ITime>}
   * @memberof GridcoinRPC
   */
  public currentTime(): Promise<ITime> {
    return this.call('currenttime')
  }

  /**
   * Decrypts phrase encrypted by encryptphrase.
   * @todo may introduce interface
   *
   * @param {string} phrase
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public decryptPhrase(phrase: string): Promise<Object> {
    return this.call('decryptphrase', phrase)
  }

  /**
   * Encrypts phrase to be decryptable by decryptphrase.
   * @todo may introduce interface
   *
   * @param {string} phrase
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public encryptPhrase(phrase: string): Promise<Object> {
    return this.call('encryptphrase', phrase)
  }

  /**
   * Returns information about the given added node, or all added nodes.
   * @description
   * (Note that onetry addnodes are not listed here) If dns is false,
   * only a list of added nodes will be provided,
   * otherwise connected information will also be available.
   *
   * @param {boolean} dns - Set to true to display detailed information about the added node.
   * @param {string} [node] - The node to get information about in the same <IP address>:<port> format as the addnode RPC.
   *  If this parameter is not provided, information about all added nodes will be returned.
   *
   * @param {boolean} dns
   * @param {string} [node]
   * @returns {Promise<INode>}
   * @memberof GridcoinRPC
   */
  public getaddednodeinfo(dns: boolean, node?: string): Promise<INode> {
    return this.call('getaddednodeinfo', dns, node)
  }

  /**
   *  Returns the hash of the best (tip) block in the longest block chain.
   *
   * @returns {Promise<string>}
   * @memberof GridcoinRPC
   */
  public getBestBlockHash(): Promise<string> {
    return this.call('getbestblockhash')
  }

  /**
   *  Returns information about the block with the given hash.
   *
   * @param {string} hash
   * @param {boolean} [txinfo]
   * @returns {Promise<IBlock>}
   * @memberof GridcoinRPC
   */
  public getBlock(hash: string, txinfo?: boolean): Promise<IBlock> {
    return this.call('getblock', hash, txinfo)
  }

  /**
   * Returns information related to the specified block
   *
   * @param {number} number
   * @param {boolean} [txinfo]
   * @returns {Promise<IBlock>}
   * @memberof GridcoinRPC
   */
  public getBlockByNumber(number: number, txinfo?: boolean): Promise<IBlock> {
    return this.call('getblockbynumber', number, txinfo)
  }

  /**
   * Displays current state of the blockchain
   *
   * @returns {Promise<IBlockChainInfo>}
   * @memberof GridcoinRPC
   */
  public getBlockChainInfo(): Promise<IBlockChainInfo> {
    return this.call('getblockchaininfo')
  }

  /**
   * Returns the number of blocks in the longest block chain.
   *
   * @returns {Promise<number>}
   * @memberof GridcoinRPC
   */
  public getBlockCount(): Promise<number> {
    return this.call('getblockcount')
  }

  /**
   * Returns hash of block in best-block-chain at <index>;
   * index 0 is the genesis block
   *
   * @param {number} index
   * @returns {Promise<string>}
   * @memberof GridcoinRPC
   */
  public getBlockHash(index: number): Promise<string> {
    return this.call('getblockhash', index)
  }

  /**
   * Show info of synchronized checkpoint.
   *
   * @returns {Promise<ICheckpoint>}
   * @memberof GridcoinRPC
   */
  public getCheckpoint(): Promise<ICheckpoint> {
    return this.call('getcheckpoint')
  }

  /**
   * Returns the number of connections to other nodes.
   *
   * @returns {Promise<number>}
   * @memberof GridcoinRPC
   */
  public getConnectionCount(): Promise<number> {
    return this.call('getconnectioncount')
  }

  /**
   * Returns the current network difficulty.
   *
   * @returns {Promise<IDifficulty>}
   * @memberof GridcoinRPC
   */
  public getDifficulty(): Promise<IDifficulty> {
    return this.call('getdifficulty')
  }

  /**
   * Returns an object containing various state info
   *
   * @returns {Promise<IInfo>}
   * @memberof GridcoinRPC
   */
  public getInfo(): Promise<IInfo> {
    return this.call('getinfo')
  }

  /**
   *  Returns information about network traffic, including bytes in, bytes out, and current time
   *
   * @returns {Promise<INetTotals>}
   * @memberof GridcoinRPC
   */
  public getNetTotals(): Promise<INetTotals> {
    return this.call('getnettotals')
  }

  /**
   * Displays network related information.
   *
   * @returns {Promise<INetworkInfo>}
   * @memberof GridcoinRPC
   */
  public getNetworkInfo(): Promise<INetworkInfo> {
    return this.call('getnetworkinfo')
  }

  /**
   * Returns data about each connected node.
   *
   * @returns {Promise<Array<IPeer>>}
   * @memberof GridcoinRPC
   */
  public getPeerInfo(): Promise<Array<IPeer>> {
    return this.call('getpeerinfo')
  }

  /**
   * Returns all transaction ids in memory pool
   * @todo Unknown
   *
   * @returns {Promise<Array<any>>}
   * @memberof GridcoinRPC
   */
  public getRawMemPool(): Promise<Array<any>> {
    return this.call('getrawmempool')
  }

  /**
   * Lists all polls with details.
   *
   * @returns {Promise<Array<IPollDetails>>}
   * @memberof GridcoinRPC
   */
  public listAllPollDetails(): Promise<Array<IPollDetails>> {
    return this.call('listallpolldetails')
  }

  /**
   * Lists all polls.
   *
   * @returns {Promise<Array<IPoll>>}
   * @memberof GridcoinRPC
   */
  public listAllPolls(): Promise<Array<IPoll>> {
    return this.call('listallpolls')
  }

  /**
   *  Lists poll details.
   *
   * @returns {Promise<Array<IPollDetails>>}
   * @memberof GridcoinRPC
   */
  public listPollDetails(): Promise<Array<IPollDetails>> {
    return this.call('listpolldetails')
  }

  /**
   * Displays results for specified poll.
   *
   * @param {string} pollName - Poll name
   * @param {boolean} [showExpired]
   * @returns {Promise<Array<Array<IPollDetails>>>}
   * @memberof GridcoinRPC
   */
  public listPollResults(
    pollName: string,
    showExpired?: boolean
  ): Promise<Array<Array<IPollDetails>>> {
    return this.call('listpollresults', pollName, showExpired)
  }

  /**
   *  Lists all polls.
   *
   * @returns {Promise<Array<IPoll>>}
   * @memberof GridcoinRPC
   */
  public listPolls(): Promise<Array<IPoll>> {
    return this.call('listpolls')
  }

  /**
   * Displays included and excluded memory pool transactions.
   *
   * @returns {Promise<IMemoryPool>}
   * @memberof GridcoinRPC
   */
  public memoryPool(): Promise<IMemoryPool> {
    return this.call('memorypool')
  }

  /**
   * Displays current network time.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public networkTime(): Promise<Object> {
    return this.call('networktime')
  }

  /**
   * Requests that a ping be sent to all other nodes, to measure ping time.
   * @description
   * Results provided in getpeerinfo, pingtime and pingwait fields are decimal seconds.
   * Ping command is handled in queue with all other commands, so it measures processing backlog,
   * not just network ping.
   *
   * @returns {Promise<null>}
   * @memberof GridcoinRPC
   */
  public ping(): Promise<null> {
    return this.call('ping')
  }

  /**
   * Returns all information about the block at <index>.
   *
   * @param {number} index - block index, 0 for superblock
   * @returns {Promise<IBlock>}
   * @memberof GridcoinRPC
   */
  public showBlock(index: number): Promise<IBlock> {
    return this.call('showblock', index)
  }

  /**
   * Terminate the Gridcoin client.
   *
   * @returns {Promise<string>}
   * @memberof GridcoinRPC
   */
  public stop(): Promise<string> {
    return this.call('stop')
  }

  /**
   * Vote on a specific poll with specified answers.
   * @todo implement
   * Requires unlocked wallet
   *
   * @param {string} title
   * @param {string} answers
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public vote(title: string, answers: string): Promise<Object> {
    return this.call('vote', title, answers)
  }

  /**
   * Displays vote details of a specified poll.
   *
   * @param {string} pollName - Poll name
   * @returns {Promise<Array<Array<Object>>>}
   * @memberof GridcoinRPC
   */
  public voteDetails(pollName: string): Promise<Array<Array<Object>>> {
    return this.call('votedetails', pollName)
  }

  /********************************************
   *
   *          MINING
   *
   ********************************************/

  /**
   * Send a beacon to the Neural Network for your CPID to claim POR rewards.
   * Requires unlocked wallet
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public advertiseBeacon(): Promise<Object> {
    return this.call('advertisebeacon')
  }

  /**
   * Displays beacons and associated addresses.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public beaconReport(): Promise<Object> {
    return this.call('beaconreport')
  }

  /**
   * Display beaconstatus on own or specified beacon.
   *
   * @param {string} cpId
   * @returns {Promise<IBeaconStatus>}
   * @memberof GridcoinRPC
   */
  public beaconStatus(cpId: string): Promise<IBeaconStatus> {
    return this.call('beaconstatus', cpId)
  }

  /**
   * Display project CPIDs for your BOINC account.
   *
   * @returns {Promise<Array<ICpid>>}
   * @memberof GridcoinRPC
   */
  public cpids(): Promise<Array<ICpid>> {
    return this.call('cpids')
  }

  /**
   * Displays current Neural Network contract hash.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public currentNeuralHash(): Promise<Object> {
    return this.call('currentneuralhash')
  }

  /**
   * Displays current Neural Network quorum hashes.
   *
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public currentNeuralReport(): Promise<Array<Object>> {
    return this.call('currentneuralreport')
  }

  /**
   * Request current information from the Neural Network about your magnitude by project.
   *
   * @param {boolean} [force]
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public explainMagnitude(force?: boolean): Promise<Object> {
    return this.call('explainmagnitude', force)
  }

  /**
   * Lists Information on the current block, mining settings, and network difficulty.
   * @description
   * Documentation of Stake Miner and "getmininginfo" explanation.
   * https://github.com/gridcoin/Gridcoin-Research/blob/master/doc/stake-miner.txt
   *
   * @returns {Promise<IMiningInfo>}
   * @memberof GridcoinRPC
   */
  public getMiningInfo(): Promise<IMiningInfo> {
    return this.call('getmininginfo')
  }

  /**
   * Display lifetime payments for CPID as well as lifetime average magnitude.
   *
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public lifeTime(): Promise<Array<Object>> {
    return this.call('lifetime')
  }

  /**
   * Displays information for the magnitude of all cpids or the one specified.
   *
   * @param {string} cpid
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public magnitude(cpid: string): Promise<Array<Object>> {
    return this.call('magnitude', cpid)
  }

  /**
   * mymagnitude
   *
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public myMagnitude(): Promise<Array<Object>> {
    return this.call('mymagnitude')
  }

  /**
   * Displays neural report for the network.
   *
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public neuralReport(): Promise<Array<Object>> {
    return this.call('neuralreport')
  }

  /**
   * proveownership
   *
   * @returns {Promise<IOwnership>}
   * @memberof GridcoinRPC
   */
  public proveOwnership(): Promise<IOwnership> {
    return this.call('proveownership')
  }

  /**
   * Gridcoin will reload CPIDs from the local BOINC client.
   * @description
   * If any new projects are detected, they will then be looked up in the Netsoft XML.
   * This happens automatically after about 25 minutes, but this can speed up the process.
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public resetCpids(): Promise<Object> {
    return this.call('resetcpids')
  }

  /**
   * Displays RSA (Research Savings Account) report for your CPID
   * @todo
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public rsa(): Promise<Array<Object>> {
    return this.call('rsa')
  }

  /**
   * retrieve "RSA Weight", "Remote Magnitude", "RSA Owed"
   *
   * @returns {Promise<IRsaWeight>}
   * @memberof GridcoinRPC
   */
  public rsaWeight(): Promise<IRsaWeight> {
    return this.call('rsaweight')
  }

  /**
   * Display estimated time to stake.
   *
   * @returns {Promise<IStakeTime>}
   * @memberof GridcoinRPC
   */
  public stakeTime(): Promise<IStakeTime> {
    return this.call('staketime')
  }

  /**
   * Display time since last superblock.
   *
   * @returns {Promise<ISuperBlockAge>}
   * @memberof GridcoinRPC
   */
  public superBlockAge(): Promise<ISuperBlockAge> {
    return this.call('superblockage')
  }

  /**
   * Display data on recent superblocks. Optional: Shows magnitude for a cpid for recent superblocks.
   * @todo
   * @param {string} [cpid] - cpid
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public superBlocks(cpid?: string): Promise<Array<Object>> {
    return this.call('superblocks', cpid)
  }

  /**
   * Synchronize with the neural network
   *
   * @returns {Promise<Object>}
   * @memberof GridcoinRPC
   */
  public syncDpor2(): Promise<Object> {
    return this.call('syncdpor2')
  }

  /**
   * Display upgraded beacon report of the network.
   * @todo
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public upgradedBeaconReport(): Promise<Array<Object>> {
    return this.call('upgradedbeaconreport')
  }

  /**
   * Displays information about valid CPIDs (on team Gridcoin, same CPID) collected from BOINC.
   *
   * @returns {Promise<Array<Object>>}
   * @memberof GridcoinRPC
   */
  public validCpids(): Promise<Array<Object>> {
    return this.call('validcpids')
  }
}

export default GridcoinRPC
