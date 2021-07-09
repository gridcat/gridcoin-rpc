import assert from 'assert';
import camelcaseKeys from 'camelcase-keys';
import { RPCError } from './Errors/RpcError';
import JsonRPC, { IJsonRPC, IParameters } from './lib/JsonRPC';

export type callParameters =
  string
  | number
  | boolean
  | undefined
  | string[]
  | Record<string, unknown>
  | Record<string, unknown>[];
type filteredCallParameters =
  string
  | number
  | boolean
  | string[]
  | Record<string, unknown>
  | Record<string, unknown>[];

interface RPCResponse {
  result: any;
  error?: {
    code: number;
    message: string;
  }
  id?: number;
}

export class RPCBase {
  public readonly client: IJsonRPC;

  /**
   * Creates an instance of GridcoinRPC
   * @param {IParameters} config -
   * @param {IJsonRPC} [rpc] - Dependency injection for the client class
   * @memberof GridcoinRPC
   */
  constructor(config: IParameters, rpc?: IJsonRPC) {
    if (rpc) {
      this.client = rpc;
    } else {
      this.client = new JsonRPC(config);
    }
  }

  /**
   * Send command to the rpc server, get response
   * Transform response field to the camelcase
   *
   * @protected
   * @template T
   * @param {string} command
   * @param {...Array<callParameters>} parameters
   * @returns {Promise<T> | never}
   * @throws
   * @memberof RPCBase
   */
  protected async call<T>(
    command: string,
    ...parameters: callParameters[]
  ): Promise<T> | never {
    const filteredParameters = this.filterParameters(parameters);
    const result: RPCResponse = await this.client.request(command, filteredParameters);
    if (result.error) {
      throw new RPCError(
        result.error.message,
        result.error.code,
      );
    }
    return camelcaseKeys(
      result.result,
      {
        exclude: ['p2sh'],
        deep: true,
      },
    );
  }

  /**
   * Filter out undefined parameters
   *
   * @private
   * @param {Array<callParameters>} parameters
   * @returns {Array<filteredCallParameters>}
   * @memberof RPCBase
   */
  private filterParameters(parameters: callParameters[]): filteredCallParameters[] {
    return parameters.filter((element) => element !== undefined);
  }
}
