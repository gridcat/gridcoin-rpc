import IPoll from './poll';

export interface IPollAnswer {
  answer: string;
  shares: number;
  participants: number;
}

export default interface IPollDetails extends IPoll {
  // title: string,
  // pollnumber: number,
  // question: string,
  // expiration: string,
  // url: string,
  // sharetype: string,
  bestAnswer: string;
  totalShares: number;
  totalParticipants: number;
  highestShare: number;
  answers: Array<IPollAnswer>;
}
