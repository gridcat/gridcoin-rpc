import { RPCError } from './Errors/RpcError';
import { camelCaseKeys } from './lib/camelCase';
import JsonRPC, { IJsonRPC, IParameters } from './lib/JsonRPC';

export type callParameters =
  string
  | number
  | boolean
  | undefined
  | null
  | string[]
  | Record<string, unknown>
  | Record<string, unknown>[];
type filteredCallParameters =
  string
  | number
  | boolean
  | null
  | string[]
  | Record<string, unknown>
  | Record<string, unknown>[];

/**
 * Response keys that must survive camelCase conversion untouched
 */
const EXCLUDED_KEYS = ['p2sh'];

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
    return this.callPreservingKeys<T>([], command, ...parameters);
  }

  /**
   * Same as call(), for responses that use data (addresses, CPIDs, project names,
   * hashes) as object keys. Keys of the objects at `dataKeyPaths` are returned
   * verbatim; see camelCaseKeys for the path syntax.
   *
   * @protected
   * @template T
   * @param {ReadonlyArray<string>} dataKeyPaths
   * @param {string} command
   * @param {...Array<callParameters>} parameters
   * @returns {Promise<T> | never}
   * @throws
   * @memberof RPCBase
   */
  protected async callPreservingKeys<T>(
    dataKeyPaths: readonly string[],
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
    return camelCaseKeys<T>(result.result, EXCLUDED_KEYS, dataKeyPaths);
  }

  /**
   * Normalise undefined parameters for a positional JSON-RPC call
   *
   * Trailing undefined parameters are dropped. An undefined parameter followed
   * by a defined one is sent as null, so the parameters after it keep their
   * positions; the daemon treats null as "not provided" for optional arguments.
   *
   * @private
   * @param {Array<callParameters>} parameters
   * @returns {Array<filteredCallParameters>}
   * @memberof RPCBase
   */
  private filterParameters(parameters: callParameters[]): filteredCallParameters[] {
    let end = parameters.length;
    while (end > 0 && parameters[end - 1] === undefined) {
      end -= 1;
    }
    return parameters
      .slice(0, end)
      .map((element) => (element === undefined ? null : element));
  }
}
