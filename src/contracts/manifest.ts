import { PublicKey } from '../types';

interface Manifest {
  'scraper (manifest)Address': string;
  manifestDatetime: string;
  manifestContentHash: string;
}

interface Project {
  project: string;
  ETag: string;
  LastModified: string;
  part1: number;
  partc: number;
  GridcoinTeamID: number;
  current: boolean;
  last: boolean;
}

interface ManifestDetailed {
  pubkey: PublicKey;
  sCManifestName: string;
  nTime: string;
  consensusBlock: string;
  nContentHash: string;
  beaconList: number;
  beaconListC: number;
  projects: Project[];
  parts: string[];
}

export interface Manifests {
  [key: string]: Manifest;
}

export interface ManifestsDetailed {
  [key: string]: ManifestDetailed;
}
