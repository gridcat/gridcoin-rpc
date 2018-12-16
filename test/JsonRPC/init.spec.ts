import nock from 'nock';
import { expect } from 'chai';
import JsonRpc from '../../src/JsonRPC';

const HOST = 'i.am.grid.coin';
const RESPONSE = { ok: true };

nock(`http://${HOST}`)
  .persist()
  .post('/')
  .reply(200, RESPONSE);

describe('JsonRpc', () => {
  let jsonRPC: JsonRpc;
  beforeEach(() => {
    jsonRPC = new JsonRpc({
      host: HOST,
      port: 80,
    });
  });
  it('should return promise', () => {
    expect(jsonRPC.request('', [])).to.be.instanceof(Promise);
  });

  it('should send request just fine and return proper', done => {
    jsonRPC.request('', []).then(result => {
      expect(result).to.be.deep.equal(RESPONSE);
      done();
    });
  });
});
