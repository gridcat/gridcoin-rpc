export interface IPoll {
  title: string;
  id: string;
  question: string;
  url: string;
  // @todo: could be one of many
  sharetype: string;
  weightType: number;
  responseType: number;
  durationDays: number;
  expiration: string;
  timestamp: string;
  votes: number;
}
