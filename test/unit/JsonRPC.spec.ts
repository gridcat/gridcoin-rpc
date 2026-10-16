import nock from 'nock';
import http from 'http';
import { AddressInfo } from 'net';
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

describe('JsonRpc request encoding', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  it('should send a Content-Length matching the UTF-8 byte length, not the string length', async () => {
    let contentLength = 0;
    let bodyBytes = 0;
    nock(`http://${HOST}`)
      .post('/', (body) => {
        bodyBytes = Buffer.byteLength(JSON.stringify(body));
        return true;
      })
      .reply(function reply() {
        contentLength = Number(this.req.headers['content-length']);
        return [200, RESPONSE];
      });
    const jsonRPC = new JsonRpc({ host: HOST, port: 80 });
    const result = await jsonRPC.request('addpoll', ['Ünïcödé — тест']);
    expect(result).to.be.deep.equal(RESPONSE);
    expect(contentLength).to.equal(bodyBytes);
    expect(contentLength).to.be.greaterThan('Ünïcödé — тест'.length);
  });
});

describe('JsonRpc response decoding', () => {
  let server: http.Server;
  let port: number;
  const TITLE = 'Ünïcödé — тест';

  beforeAll((done) => {
    const payload = Buffer.from(JSON.stringify({ result: { title: TITLE }, error: null, id: 1 }));
    // Split the body inside the 3-byte em dash so each chunk holds a partial character
    const cut = payload.indexOf(Buffer.from('—')) + 1;
    server = http.createServer((_req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(payload.subarray(0, cut));
      setTimeout(() => res.end(payload.subarray(cut)), 20);
    });
    server.listen(0, () => {
      port = (server.address() as AddressInfo).port;
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should decode a multi-byte character split across response chunks', async () => {
    const jsonRPC = new JsonRpc({ host: '127.0.0.1', port });
    const result = await jsonRPC.request('x', []);
    expect(result.result.title).to.equal(TITLE);
  });
});
