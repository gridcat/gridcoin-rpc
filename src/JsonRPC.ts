import http from 'http';
import https from 'https';
import AuthenticationError from './Errors/Authentication';

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

/**
 *
 *
 * @class JsonRPC
 */
class JsonRPC {
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
   * @param {*} parameters
   * @returns {Promise<Object>}
   * @memberof JsonRPC
   */
  request(command: string, parameters: Array<any>): Promise<Object> {
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
    return new Promise<Object>((resolve: any, reject: any) => {
      const request = this.provider(requestOptions);

      request.end(strigifyRequest);

      request.on('error', reject);

      request.on('response', (response: any) => {
        let buffer: string = '';
        if (response.statusCode === 401) {
          reject(new AuthenticationError());
          return;
        }
        // console.log(response.statusCode);
        response.on('data', (chunk: string) => {
          buffer += chunk;
        });
        response.on('end', () => {
          try {
            const decoded: Object = JSON.parse(buffer);
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
