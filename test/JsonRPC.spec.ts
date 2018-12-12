import nock from 'nock'
import { expect } from 'chai'
import JsonRpc from '../src/JsonRPC'

nock('http://host1.com:80')
  .get('/')
  .reply(200, 'ok')

describe('JsonRpc', () => {
  it('should return promise', () => {
    const jsonRPC = new JsonRpc({
      host: 'host1.com',
      port: 80
    })
    expect(jsonRPC.request('', [])).to.be.instanceof(Promise)
  })
})
