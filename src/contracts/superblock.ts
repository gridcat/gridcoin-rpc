import { Block } from '../types';

export interface Superblock {
  height: string;
  block: Block;
  date: string;
  walletVersion: string;
  totalCpids: number;
  activeBeacons: number;
  inactiveBeacons: number;
  totalMagnitude: number;
  averageMagnitude: number;
  totalProjects: number;
  magnitude: number;
  /**
   * @todo: find out the content
   *
   * @type {*}
   * @memberof Superblock
   */
  contractContents: any;
}
