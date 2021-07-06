import { Block, BlockWithTX } from '../contracts/block';
import { BlockchainInfo } from '../contracts/blockchainInfo';
import { CurrentTime } from '../contracts/currentTime';
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
}
