import { Banned } from '../contracts/banned';
import { Block, BlockWithTX } from '../contracts/block';
import { BlockchainDifficulty, BlockchainInfo } from '../contracts/blockchainInfo';
import { BurnReport } from '../contracts/burnReport';
import { Checkpoint } from '../contracts/checkpoint';
import { CurrentTime } from '../contracts/currentTime';
import { Info } from '../contracts/info';
import { MemoryPool } from '../contracts/memoryPool';
import { NetTotals } from '../contracts/netTotals';
import { NetworkInfo } from '../contracts/networkInfo';
import { Peer } from '../contracts/peer';
import { RPCBase } from '../RPCBase';

type addNodeCommand = 'add' | 'remove' | 'onetry';

export class Network extends RPCBase {
  /**
   * Attempts add or remove <node> from the addnode list or try a connection to <node> once
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
    hash: string, txinfo: Type,
  ): Promise<Type extends true ? BlockWithTX : Block> {
    return this.call('getblock', hash, txinfo);
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
    number: number, txinfo: Type,
  ): Promise<Type extends true ? BlockWithTX : Block> {
    return this.call('getblockbynumber', number, txinfo);
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
   * Returns hash of block in best-block-chain at <index>
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
   * Displays included and excluded memory pool txs
   *
   * @returns {Promise<MemoryPool>}
   * @memberof Network
   */
  public async memoryPool(): Promise<MemoryPool> {
    return this.call('memorypool');
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
   * @param {number} [banTime] - time in seconds how long (or until when if [absolute] is set) the IP is banned
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
}
