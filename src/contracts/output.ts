export default interface IOutput {
  /**
   * The key is the gridcoin address, the numeric value (can be string) is the GRC amount
   *
   * @type {(number|string)}
   * @memberof IOutput
   */
  address: number | string
  /**
   * The key is "data", the value is hex encoded data
   *
   * @type {"hex"}
   * @memberof IOutput
   */
  data: string
}
