import { Block, BlockWithTX } from './block';

export interface BlocksBatch<T = Block> {
  blocks: T[];
  numberOfBlocks: number;
}

export type BlocksBatchDetailed = BlocksBatch<BlockWithTX>;
