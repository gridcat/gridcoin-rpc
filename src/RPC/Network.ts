import { Banned } from '../contracts/banned';
import { Block, BlockWithTX } from '../contracts/block';
import { BlockchainDifficulty, BlockchainInfo } from '../contracts/blockchainInfo';
import { BlocksBatch, BlocksBatchDetailed } from '../contracts/blocksBatch';
import { BurnReport } from '../contracts/burnReport';
import { Checkpoint } from '../contracts/checkpoint';
import { CurrentTime } from '../contracts/currentTime';
import { Info } from '../contracts/info';
import { NetTotals } from '../contracts/netTotals';
import { NetworkInfo } from '../contracts/networkInfo';
import { NodeAddress } from '../contracts/nodeAddress';
import { Peer } from '../contracts/peer';
import { ClockStats } from '../contracts/clockStats';
import { MempoolAcceptResult, MempoolEntry, MempoolInfo } from '../contracts/mempool';
import { RPCBase } from '../RPCBase';

type addNodeCommand = 'add' | 'remove' | 'onetry';

// Superblock magnitudes are keyed by CPID, projects by project name
const BLOCK_DATA_KEYS = ['superblock.magnitudes', 'superblock.projects'];

export abstract class Network extends RPCBase {
  /**
   * Attempts add or remove *node* from the addnode list or try a connection to *node* once
   *
   * RPC command will always return { result: 'ok' }
   *
   * @param {string} node
   * @param {addNodeCommand} command
   * @returns {Promise<{ result: 'ok' }>}
   * @memberof Network
   */
  public async addNode(
    node: string,
    command: addNodeCommand,
  ): Promise<{ result: 'ok' }> {
    return this.call<{ result: 'ok' }>('addnode', node, command);
  }

  /**
   * Requests network for outstanding blocks
   *
   * @returns {Promise<{ sent: boolean }>}
   * @memberof Network
   */
  public async askForOutstandingBlocks(): Promise<{ sent: boolean }> {
    return this.call<{ sent: boolean }>('askforoutstandingblocks');
  }

  /**
   * Clear all banned IPs.
   *
   * @returns {Promise<void>}
   * @memberof Network
   */
  public async clearBanned(): Promise<void> {
    return this.call<void>('clearbanned');
  }

  /**
   * Displays UTC Unix time as well as date and time in UTC
   *
   * @returns {Promise<CurrentTime>}
   * @memberof Network
   */
  public async currentTime(): Promise<CurrentTime> {
    return this.call<CurrentTime>('currenttime');
  }

  /**
   * Returns information about the given added node, or all added nodes
   * (note that onetry addnodes are not listed here)
   * If dns is false, only a list of added nodes will be provided,
   * otherwise connected information will also be available
   *
   * @param {boolean} dns
   * @param {string} node
   * @returns {Promise<{ addednode: string }>}
   * @memberof Network
   */
  public async getAddedNodeInfo(
    dns: boolean,
    node: string,
  ): Promise<{ addednode: string }> {
    return this.call<{ addednode: string }>('getaddednodeinfo', dns, node);
  }

  /**
   * Returns the hash of the best block in the longest block chain
   *
   * @returns {Promise<string>}
   * @memberof Network
   */
  public async getBestBlockhash(): Promise<string> {
    return this.call('getbestblockhash');
  }

  /**
   * Returns information about the block with the given hash.
   *
   * @template Type
   * @param {string} hash
   * @param {boolean} [txinfo] - optional to print more detailed tx info
   * @returns {Promise<Type extends true ? BlockWithTX : Block>}
   * @memberof Network
   */
  public async getBlock<Type extends boolean>(
    hash: string,
    txinfo: Type,
  ): Promise<Type extends true ? BlockWithTX : Block> {
    return this.callPreservingKeys(BLOCK_DATA_KEYS, 'getblock', hash, txinfo);
  }

  /**
   * Returns details of a block with given block-number
   *
   * @template Type
   * @param {number} number
   * @param {Type} txinfo - optional to print more detailed tx info
   * @returns {Promise<Type extends true ? BlockWithTX : Block>}
   * @memberof Network
   */
  public async getBlockByNumber<Type extends boolean>(
    number: number,
    txinfo: Type,
  ): Promise<Type extends true ? BlockWithTX : Block> {
    return this.callPreservingKeys(BLOCK_DATA_KEYS, 'getblockbynumber', number, txinfo);
  }

  /**
   * Returns details of the block at or just after the given timestamp.
   *
   * @template Type
   * @param {number} timestamp - Unix timestamp
   * @param {Type} [txinfo] - optional to print more detailed tx info
   * @returns {Promise<Type extends true ? BlockWithTX : Block>}
   * @memberof Network
   */
  public async getBlockByMinTime<Type extends boolean>(
    timestamp: number,
    txinfo?: Type,
  ): Promise<Type extends true ? BlockWithTX : Block> {
    return this.callPreservingKeys(BLOCK_DATA_KEYS, 'getblockbymintime', timestamp, txinfo);
  }

  /**
   * Returns a JSON array with details of the requested blocks starting
   * with the given block-number or hash. Limited to 1000 blocks.
   *
   * @template Type
   * @param {(number | string)} startingBlock - Block number or hash for the start of the batch
   * @param {number} numberOfBlocks - Number of blocks to return (max 1000)
   * @param {Type} [txinfo] - optional to print more detailed tx info
   * @returns {Promise<Type extends true ? BlocksBatchDetailed : BlocksBatch>}
   * @memberof Network
   */
  public async getBlocksBatch<Type extends boolean>(
    startingBlock: number | string,
    numberOfBlocks: number,
    txinfo?: Type,
  ): Promise<Type extends true ? BlocksBatchDetailed : BlocksBatch> {
    return this.callPreservingKeys(
      ['blocks.superblock.magnitudes', 'blocks.superblock.projects'],
      'getblocksbatch',
      startingBlock,
      numberOfBlocks,
      txinfo,
    );
  }

  /**
   * Displays data on current blockchain
   *
   * @returns {Promise<BlockchainInfo>}
   * @memberof Network
   */
  public async getBlockchainInfo(): Promise<BlockchainInfo> {
    return this.call('getblockchaininfo');
  }

  /**
   * Returns the number of blocks in the longest block chain
   *
   * @returns {Promise<number>}
   * @memberof Network
   */
  public async getBlockCount(): Promise<number> {
    return this.call('getblockcount');
  }

  /**
   * Returns hash of block in best-block-chain at *index*
   *
   * @param {index} block - Block number for requested hash
   * @returns {Promise<string>}
   * @memberof Network
   */
  public async getBlockHash(index: number): Promise<string> {
    return this.call('getblockhash', index);
  }

  /**
   * Scan for and aggregate network-wide amounts for provably-destroyed outputs.
   *
   * @returns {Promise<BurnReport>}
   * @memberof Network
   */
  public async getBurnReport(): Promise<BurnReport> {
    return this.call('getburnreport');
  }

  /**
   * Show info of synchronized checkpoint.
   *
   * @returns {Promise<Checkpoint>}
   * @memberof Network
   */
  public async getCheckpoint(): Promise<Checkpoint> {
    return this.call('getcheckpoint');
  }

  /**
   * Returns the number of connections to other node
   *
   * @returns {Promise<number>}
   * @memberof Network
   */
  public async getConnectionCount(): Promise<number> {
    return this.call('getconnectioncount');
  }

  /**
   * Returns the difficulty as a multiple of the minimum difficulty
   *
   * @returns {Promise<BlockchainDifficulty>}
   * @memberof Network
   */
  public async getDifficulty(): Promise<BlockchainDifficulty> {
    return this.call('getdifficulty');
  }

  /**
   * Returns an object containing various state info.
   *
   * @returns {Promise<Info>}
   * @memberof Network
   */
  public async getInfo(): Promise<Info> {
    return this.call('getinfo');
  }

  /**
   * Returns information about network traffic, including bytes in, bytes out and current time
   *
   * @returns {Promise<NetTotals>}
   * @memberof Network
   */
  public async getNetTotals(): Promise<NetTotals> {
    return this.call('getnettotals');
  }

  /**
   * Displays network related information
   *
   * @returns {Promise<NetworkInfo>}
   * @memberof Network
   */
  public async getNetworkInfo(): Promise<NetworkInfo> {
    return this.call('getnetworkinfo');
  }

  /**
   * Return known addresses which can potentially be used to find new nodes in the network.
   *
   * @param {number} [count=1] - How many addresses to return
   * @returns {Promise<NodeAddress[]>}
   * @memberof Network
   */
  public async getNodeAddresses(count?: number): Promise<NodeAddress[]> {
    return this.call<NodeAddress[]>('getnodeaddresses', count);
  }

  /**
   * Returns data about each connected network node.
   *
   * @returns {Promise<Peer[]>}
   * @memberof Network
   */
  public async getPeerInfo(): Promise<Peer[]> {
    return this.call('getpeerinfo');
  }

  /**
   * Returns all transaction ids in memory pool
   *
   * @returns {Promise<string[]>}
   * @memberof Network
   */
  public async getRawMemPool(): Promise<string[]> {
    return this.call('getrawmempool');
  }

  /**
   * List all banned IPs/subnets.
   *
   * @returns {Promise<Banned>}
   * @memberof Network
   */
  public async listBanned(): Promise<Banned> {
    return this.call('listbanned');
  }

  /**
   * Displays current network time
   *
   * @returns {Promise<{ networkTime: number }>}
   * @memberof Network
   */
  public async networkTime(): Promise<{ networkTime: number }> {
    return this.call('networktime');
  }

  /**
   * Requests that a ping be sent to all other nodes, to measure ping time.
   * Results provided in getpeerinfo, pingtime and pingwait fields are decimal seconds.
   * Ping command is handled in queue with all other commands, so it measures processing backlog, not just network ping.
   *
   * @returns {Promise<null>}
   * @memberof Network
   */
  public async ping(): Promise<null> {
    return this.call('ping');
  }

  /**
   * add or remove an IP/Subnet from the banned list.
   *
   * @param {string} subnet - The IP/Subnet (see getpeerinfo for nodes IP) with an optional netmask (default is /32 = single IP)
   * @param {('add' | 'remove')} command - 'add' to add an IP/Subnet to the list, 'remove' to remove an IP/Subnet from the list
   * @param {number} [banTime] - time in seconds how long (or until when if *absolute* is set) the IP is banned
   * (0 or empty means using the default time of 24h which can also be overwritten by the -bantime startup argument)
   * @param {number | false} [absolute] - Defaults to false. If set, the bantime must be an absolute timestamp in seconds since epoch (Jan 1 1970 GMT).
   * @returns {Promise<null>}
   * @memberof Network
   */
  public async setBan(
    subnet: string,
    command: 'add' | 'remove',
    banTime?: number,
    absolute?: number | false,
  ): Promise<null> {
    return this.call('setban', subnet, command, banTime, absolute);
  }

  /**
   * Returns all information about the block at *index*
   *
   * @param {number} index - Block number
   * @returns {Promise<Block>}
   * @memberof Network
   */
  public async showBlock(index: number): Promise<Block> {
    return this.call('showblock', index);
  }

  /**
   * Stop Gridcoin server.
   *
   * @returns {Promise<string>}
   * @memberof Network
   */
  public async stop(): Promise<string> {
    return this.call('stop');
  }

  /**
   * Return transaction counts and memory usage for the active mempool.
   *
   * @returns {Promise<MempoolInfo>}
   * @memberof Network
   */
  public async getMempoolInfo(): Promise<MempoolInfo> {
    return this.call('getmempoolinfo');
  }

  /**
   * Return mempool data for a transaction currently in the pool.
   *
   * @param {string} txid - Transaction ID
   * @returns {Promise<MempoolEntry>}
   * @memberof Network
   */
  public async getMempoolEntry(txid: string): Promise<MempoolEntry> {
    return this.call('getmempoolentry', txid);
  }

  /**
   * Check whether raw transactions would be accepted, without submitting them.
   *
   * @param {string[]} rawtxs - Hex-encoded transactions
   * @returns {Promise<MempoolAcceptResult[]>}
   * @memberof Network
   */
  public async testMempoolAccept(rawtxs: string[]): Promise<MempoolAcceptResult[]> {
    return this.call('testmempoolaccept', rawtxs);
  }

  /**
   * Return a proof that the supplied transactions occur in a main-chain block.
   *
   * @param {string[]} txids - Transaction IDs in the same block
   * @param {string} [blockhash] - Specific containing block; otherwise resolved from the first transaction
   * @returns {Promise<string>} - Hex-encoded proof
   * @memberof Network
   */
  public async getTxOutProof(txids: string[], blockhash?: string): Promise<string> {
    return this.call('gettxoutproof', txids, blockhash);
  }

  /**
   * Verify an inclusion proof and return its committed transaction IDs.
   *
   * @param {string} proof - Hex-encoded proof from gettxoutproof
   * @returns {Promise<string[]>} - Empty when invalid; errors if the block is outside the best chain
   * @memberof Network
   */
  public async verifyTxOutProof(proof: string): Promise<string[]> {
    return this.call('verifytxoutproof', proof);
  }

  /**
   * Immediately disconnect a peer identified by address or node ID.
   *
   * @param {string} [address] - Peer address; use an empty string to select by node ID
   * @param {number} [nodeid] - Peer ID, mutually exclusive with a nonempty address
   * @returns {Promise<null>}
   * @memberof Network
   */
  public async disconnectNode(address?: string | null, nodeid?: number): Promise<null> {
    return this.call('disconnectnode', address, nodeid);
  }

  /**
   * Return network clock state and cumulative received-block timestamp lead counts.
   *
   * @returns {Promise<ClockStats>}
   * @memberof Network
   */
  public async getClockStats(): Promise<ClockStats> {
    return this.call('getclockstats');
  }
}
