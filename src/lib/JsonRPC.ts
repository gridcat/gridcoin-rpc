import http from 'http';
import https from 'https';
import AuthenticationError from '../Errors/Authentication';

/**
 * Command interface
 *
 * @interface IRequestJSON
 */
interface IRequestJSON {
  id: number;
  method: string;
  params: any;
}

interface IProviders {
  http: any;
  https: any;
}

/**
 * Class constructor parameters
 *
 * @interface IParameters
 */
export interface IParameters {
  /**
   * Gridcoin RPC server (wallet) host
   *
   * @type {string}
   * @memberof IParameters
   */
  host: string;
  /**
   *  Gridcoin RPC server (wallet) port
   *
   * @type {number}
   * @memberof IParameters
   */
  port: number;
  path?: string;
  /**
   * Username (if specified)
   *
   * @type {string}
   * @memberof IParameters
   */
  username?: string;
  /**
   * Password (if specified)
   *
   * @type {string}
   * @memberof IParameters
   */
  password?: string;
  ca?: string | Buffer | Array<string | Buffer>;
  ssl?: boolean;
  sslStrict?: boolean;
  providers?: IProviders;
}

export interface IJsonRPC {
  request(command: string, parameters: Array<any>): Promise<any>;
}

/**
 *
 *
 * @class JsonRPC
 */
class JsonRPC implements IJsonRPC {
  private host: string;

  private port: number;

  private path: string;

  private auth?: string;

  private ssl: boolean;

  private sslStrict: boolean;

  private ca?: string | Buffer | Array<string | Buffer>;

  private provider: any;

  /**
   * Creates an instance of JsonRPC.
   * @param {IParameters} parameters
   * @memberof JsonRPC
   */
  constructor(parameters: IParameters) {
    this.host = parameters.host;
    this.path = parameters.path || '/';
    this.port = parameters.port;
    if (parameters.username && parameters.password) {
      this.auth = `${parameters.username}:${parameters.password}`;
    }
    this.ca = parameters.ca;
    this.ssl = !!parameters.ssl;
    this.sslStrict = !parameters.sslStrict;
    const providers: IProviders = parameters.providers || { http, https };
    if (this.ssl) {
      this.provider = providers.https.request;
    } else {
      this.provider = providers.http.request;
    }
  }

  /**
   * Make actual request
   *
   * @param {string} command
   * @param {Array<*>} parameters
   * @returns {Promise<Object>}
   * @memberof JsonRPC
   */
  request(command: string, parameters: Array<any>): Promise<any> {
    const request: IRequestJSON = {
      id: Date.now(),
      method: command,
      params: parameters,
    };
    const strigifyRequest: string = JSON.stringify(request);

    const requestOptions: http.ClientRequestArgs | https.RequestOptions = {
      host: this.host,
      port: this.port,
      method: 'POST',
      path: this.path,
      headers: {
        Host: this.host,
        'Content-Length': strigifyRequest.length,
      },
      agent: false,
      rejectUnauthorized: this.ssl && this.sslStrict !== false,
    };

    if (this.auth) {
      requestOptions.auth = this.auth;
    }

    if (this.ssl) {
      requestOptions.ca = this.ca;
    }

    // Send request
    return new Promise<any>((resolve: any, reject: any) => {
      const req = this.provider(requestOptions);
      req.end(strigifyRequest);
      req.on('error', reject);
      req.on('response', (response: any) => {
        let buffer = '';
        if (response.statusCode === 401) {
          reject(new AuthenticationError());
          return;
        }
        response.on('data', (chunk: string) => {
          buffer += chunk;
        });
        response.on('end', () => {
          try {
            const decoded = JSON.parse(buffer);
            resolve(decoded);
          } catch (e) {
            reject(e);
          }
        });
      });
    });
  }
}

export default JsonRPC;
