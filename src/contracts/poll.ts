export default interface IPoll {
  title: string;
  pollnumber: number;
  question: string;
  expiration: string;
  /**
   * Poll URL
   */
  url: string;
  sharetype: string;
}
