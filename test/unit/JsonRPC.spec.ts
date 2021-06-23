import nock from 'nock';
import { expect } from 'chai';
import JsonRpc from '../../src/lib/JsonRPC';
import { AuthenticationError } from '../../src/Errors/Authentication';

const HOST = 'i.am.grid.coin';
const RESPONSE = { ok: true };

describe('JsonRpc', () => {
  describe('successfull scenario', () => {
    let jsonRPC: JsonRpc;
    beforeEach(() => {
      nock(`http://${HOST}`)
        .persist()
        .post('/')
        .reply(200, RESPONSE);
      jsonRPC = new JsonRpc({
        host: HOST,
        port: 80,
      });
    });
    afterAll(() => {
      nock.cleanAll();
    });
    it('should return promise', () => {
      expect(jsonRPC.request('', [])).to.be.instanceof(Promise);
    });
    it('should send request just fine and return proper', (done) => {
      jsonRPC.request('', []).then((result) => {
        expect(result).to.be.deep.equal(RESPONSE);
        done();
      });
    });
  });
  describe('Failure scenario', () => {
    afterEach(() => {
      nock.cleanAll();
    });
    it('should throw auth error if auth is failed', (done) => {
      nock(`http://${HOST}`)
        .persist()
        .post('/')
        .reply(401);
      const jsonRPC = new JsonRpc({
        host: HOST,
        port: 80,
      });
      jsonRPC.request('', []).catch((error) => {
        expect(error).to.be.instanceof(AuthenticationError);
        done();
      });
    });
    it('should throw an error if nov-valid JSON returned back', (done) => {
      nock(`http://${HOST}`)
        .persist()
        .post('/')
        .reply(200, 'Something weird');
      const jsonRPC = new JsonRpc({
        host: HOST,
        port: 80,
      });
      jsonRPC.request('', []).catch((error) => {
        expect(error).to.be.instanceof(Error);
        done();
      });
    });
  });
});
