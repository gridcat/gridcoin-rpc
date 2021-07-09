export interface BurnReport {
  total: number;
  voluntary: number;
  contracts: {
    beacon: number;
    message: number;
    poll: number;
    project: number;
    protocol: number;
    scraper: number;
    vote: number;
  }
}
