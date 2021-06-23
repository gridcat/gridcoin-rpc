import assert from 'assert';
import camelcaseKeys from 'camelcase-keys';
import { RPCError } from './Errors/RpcError';
import JsonRPC, { IJsonRPC, IParameters } from './lib/JsonRPC';

type callParameters = string | number | boolean | undefined | Array<string>;
type filteredCallParameters = string | number | boolean | undefined | Array<string>;

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
  constructor(config: IParameters, rpc?: any) {
    // eslint-disable-next-line prefer-rest-params
    if (arguments[1]) {
      // eslint-disable-next-line prefer-rest-params
      this.client = new arguments[1](config);
    } else {
      this.client = new JsonRPC(config);
    }
  }

  /**
   * Send command to rpc server, get response
   * @param command
   * @param parameters
   */
  protected async call<T>(
    command: string,
    ...parameters: Array<callParameters>
  ): Promise<T> {
    const filteredParameters: Array<filteredCallParameters> = this.filterParameters(parameters);
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
      },
    );
  }

  /**
   * Filter out undefined parameters
   * @private
   * @param {Array<callParameters>} parameters
   * @returns {Array<filteredCallParameters>}
   * @memberof RPCBase
   */
  private filterParameters(parameters: Array<callParameters>): Array<filteredCallParameters> {
    return parameters.filter((element) => element !== undefined);
  }

  /**
   * Test connection
   *
   * @throws {Error}
   * @returns bool
   * @memberof GridcoinRPC
   */
  public async testConnection(): Promise<boolean> {
    assert.strictEqual(null, await this.call('nonExistsTestConnectionCommand'));
    return true;
  }
}
