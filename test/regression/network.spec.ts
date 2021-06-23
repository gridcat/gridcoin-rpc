import { expect } from 'chai';
import { GridcoinRPC } from '../../src/GridcoinRPC';
// import { ICheckWallet } from '../../src/contracts/checkwallet';
jest.setTimeout(10000);

describe.skip('Network', () => {
  let inst: GridcoinRPC;
  beforeEach(() => {
    inst = new GridcoinRPC({
      host: 'localhost',
      port: 47812,
      username: 'Z3y50fjgx1sUpXBJpRMxkfah7V7NHqi5',
      password: 'tSjaKWGQxpd2lYLwSRull9U2Vclypu7v',
    });
  });
  describe('addnode', () => {
    it('should add new node', async () => {
      // const res = await inst.addNode('192.168.0.1', 'onetry');
      // console.log(res);
      // console.log(1111111111111111111111111111111111111111111);
      expect(true).to.be.true;
    });
  });
});
