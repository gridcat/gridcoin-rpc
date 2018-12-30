export default interface IBeaconStatus {
  CPID: string;
  'Beacon Exists': string;
  'Beacon Timestamp': string;
  'Public Key': string;
  'Private Key': string;
  'Local Configuration Public Key': string;
  'Magnitude (As of last superblock)': number;
  Warning: string;
  Errors: string;
  Help: string;
  'Configuration Status': string;
}
