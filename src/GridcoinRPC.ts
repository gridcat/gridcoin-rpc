import { applyMixins } from './lib/mixin';
import { Developer } from './RPC/Developer';
import { Mining } from './RPC/Mining';
import { Network } from './RPC/Network';
import { Voting } from './RPC/Voting';
import { Wallet } from './RPC/Wallet';
import { RPCBase } from './RPCBase';

class GridcoinRPC extends RPCBase {}
interface GridcoinRPC extends Wallet, Mining, Developer, Network, Voting {}

applyMixins(GridcoinRPC, [Wallet, Mining, Developer, Network, Voting]);

export {
  GridcoinRPC,
};
