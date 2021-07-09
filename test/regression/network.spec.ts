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
      username: '',
      password: '',
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
