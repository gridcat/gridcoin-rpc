interface Project {
  averageRac: number;
  rac: number;
  totalCredit: number;
}

export interface ContractAverage {
  contract: {
    version: number;
    magnitudes: {
      [key: string]: number;
    },
    projects: {
      [key: string]: Project;
    },
    beacons: string[];
  },
  beaconCount: number;
  avgMag: number;
  beaconParticipantCount: number;
  superblockValid: boolean;
  quorumHash: string;
  size: number;
}
