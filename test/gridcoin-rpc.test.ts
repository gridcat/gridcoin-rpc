import { GridcoinRPC } from '../src/GridcoinRPC';
import { IParameters, IJsonRPC } from '../src/JsonRPC';

const configMock: IParameters = {
  host: 'localhost',
  port: 1751,
};

class JsonRPCMock implements IJsonRPC {
  request(command: string, parameters: Array<any>): Promise<Object> {
    return Promise.resolve({});
  }
}

describe('GridcoinRPC', () => {
  it('GridcoinRPC is instantiable', () => {
    expect(new GridcoinRPC(configMock, JsonRPCMock)).toBeInstanceOf(GridcoinRPC);
  });
});
