import { expect } from 'chai';
import { GridcoinRPC } from '../../src/GridcoinRPC';
import { IParameters, IJsonRPC } from '../../src/lib/JsonRPC';

const configMock: IParameters = {
  host: 'localhost',
  port: 1751,
};

class JsonRPCMock implements IJsonRPC {
  public response: any = {};

  request(command: string, parameters: Array<any>): Promise<any> {
    return Promise.resolve(this.response);
  }
}

describe('GridcoinRPC', () => {
  it('GridcoinRPC is instantiable', () => {
    expect(new GridcoinRPC(configMock, JsonRPCMock)).to.be.instanceof(GridcoinRPC);
  });
  // I can not see any value of tests coverage of this class
  // Functional tests against the real wallet instance might be more valuable
  // describe('methods', () => {
  //   let rpc: GridcoinRPC;
  //   beforeEach(() => {
  //     rpc = new GridcoinRPC(configMock, JsonRPCMock);
  //   });
  // });
});
