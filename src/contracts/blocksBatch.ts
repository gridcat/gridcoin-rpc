import { Block, BlockWithTX } from './block';

export interface BlocksBatch<T = Block> {
  blocks: T[];
  blockCount: number;
}

export type BlocksBatchDetailed = BlocksBatch<BlockWithTX>;
